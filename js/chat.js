// js/chat.js
// Handles the site-wide AI Chatbot

export function initChatbot() {
    
    // --- 7. AI CHATBOT LOGIC (Site-wide) ---
    const chatWindow = document.getElementById("ai-chat-window");
    const chatToggle = document.getElementById("ai-chat-toggle");
    const chatCloseBtn = document.getElementById("ai-chat-close-btn");

    if (chatToggle && chatWindow) {
        const chatBody = chatWindow.querySelector(".ai-chat-body");
        const chatInput = chatWindow.querySelector(".chat-input-area input");
        const chatSendBtn = chatWindow.querySelector(".chat-input-area button");

        const openChat = () => {
            chatWindow.classList.add("active");
            chatToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        };
        const closeChat = () => {
            chatWindow.classList.remove("active");
            chatToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13.6 10.6a2 2 0 1 0-2-2"></path><path d="M10 14a2 2 0 1 0 2 2"></path></svg>`;
        };

        chatToggle.addEventListener("click", () => {
            chatWindow.classList.contains("active") ? closeChat() : openChat();
        });
        if (chatCloseBtn) {
            chatCloseBtn.addEventListener("click", closeChat);
        }

        const sendMessage = async () => {
            const userQuery = chatInput.value.trim();
            if (userQuery === "") return;
            addMessage(userQuery, "user");
            chatInput.value = "";
            addMessage("...", "ai", true);
            try {
                // Simulating an API call for the prototype
                const aiResponse = await callGeminiApi(userQuery);
                removeLoadingMessage();
                addMessage(aiResponse, "ai");
            } catch (error) {
                removeLoadingMessage();
                addMessage("Sorry, I'm having trouble connecting. Please try again.", "ai");
                console.error("Chat API Error:", error);
            }
        };

        chatSendBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") sendMessage();
        });

        function addMessage(text, type, isLoading = false) {
            const messageDiv = document.createElement("div");
            messageDiv.className = `ai-chat-message ${type}`;
            const p = document.createElement("p");
            p.textContent = text;
            if (isLoading) {
                messageDiv.id = "loading-indicator";
                p.classList.add("loading-dots");
            }
            messageDiv.appendChild(p);
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function removeLoadingMessage() {
            const loading = document.getElementById("loading-indicator");
            if (loading) loading.remove();
        }

        // This is a placeholder. In a real app, this logic would be on your server.
        async function callGeminiApi(userQuery) {
            console.log("Simulating API call for:", userQuery);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Fake 1-sec delay
            
            if (userQuery.toLowerCase().includes("book")) {
                return "You can book a court by visiting the 'Book a Court' page!";
            } else if (userQuery.toLowerCase().includes("match")) {
                return "You can find a match by visiting the 'Find a Match' page.";
            } else {
                return "I'm sorry, I'm just a prototype. I can only help with 'booking' or 'matches' right now.";
            }
        }
    }
}