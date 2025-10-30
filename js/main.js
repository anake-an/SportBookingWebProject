// Wait for the entire page to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. SLIDESHOW CODE (for index.html) ---
    const slideshow = document.querySelector(".hero-slideshow");

    // Only run this code if the slideshow element exists on the page
    if (slideshow) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        let slideIndex = 0;
        let slideTimer; // To hold the timer

        function showSlide(n) {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            // Remove active from all dots
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }

            // Handle index looping
            if (n > slides.length) { slideIndex = 1; }
            else if (n < 1) { slideIndex = slides.length; }
            else { slideIndex = n; }

            // Display the correct slide and dot
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.opacity = "1";
            }
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].className += " active";
            }
        }

        // Auto-advance function
        function autoShowSlides() {
            slideIndex++;
            showSlide(slideIndex);
            slideTimer = setTimeout(autoShowSlides, 5000); // Change slide every 5 seconds
        }

        // Add click events to dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function () {
                clearTimeout(slideTimer); // Stop the auto-timer
                showSlide(i + 1); // Show the clicked slide
            });
        }

        // Show the first slide and start the timer
        showSlide(1);
        slideTimer = setTimeout(autoShowSlides, 5000);
    }


    // --- 2. FACILITY CALENDAR (for facility_detail.html) ---
    const calendar = document.querySelector(".calendar-body");

    // Only run this code if the calendar element exists on the page
    if (calendar) {
        const summarySlot = document.getElementById("slot-details");
        const priceDetails = document.getElementById("price-details");
        const totalPriceEl = document.getElementById("total-price");
        const bookNowBtn = document.getElementById("book-now-btn");
        let selectedSlot = null;

        calendar.addEventListener("click", function (e) {
            const targetSlot = e.target.closest(".time-slot");
            if (!targetSlot || targetSlot.classList.contains("full")) {
                return;
            }
            if (selectedSlot) {
                selectedSlot.classList.remove("selected");
            }
            if (selectedSlot === targetSlot) {
                selectedSlot = null;
                resetSummary();
            } else {
                targetSlot.classList.add("selected");
                selectedSlot = targetSlot;
                updateSummary(selectedSlot);
            }
        });

        function updateSummary(slot) {
            const day = slot.dataset.day;
            const time = slot.dataset.time;
            const price = slot.dataset.price;
            summarySlot.textContent = `Time: ${day}, ${time}`;
            summarySlot.classList.remove("placeholder-text");
            totalPriceEl.textContent = `$${price}`;
            priceDetails.style.display = "flex";
            bookNowBtn.disabled = false;
        }

        function resetSummary() {
            summarySlot.textContent = "Please select an available time slot from the calendar.";
            summarySlot.classList.add("placeholder-text");
            priceDetails.style.display = "none";
            bookNowBtn.disabled = true;
        }
    }


    // --- 3. TAB SWITCHING (for facility_detail.html) ---
    const tabContainer = document.querySelector(".tabs");

    // Only run this code if the tabs element exists on the page
    if (tabContainer) {
        const tabLinks = tabContainer.querySelectorAll(".tab-link");
        const tabContents = document.querySelectorAll(".tab-content");

        tabContainer.addEventListener("click", function (e) {
            const clickedTab = e.target.closest(".tab-link");
            if (!clickedTab) return;

            tabLinks.forEach(link => link.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            clickedTab.classList.add("active");

            const tabId = clickedTab.dataset.tab;
            const correspondingContent = document.getElementById(tabId);
            if (correspondingContent) {
                correspondingContent.classList.add("active");
            }
        });
    }

    // ---
    // NEW CODE FOR ORGANIZER CALENDAR
    // Add this inside the DOMContentLoaded listener in js/main.js
    // ---

    const organizerCalendar = document.getElementById("organizer-calendar-body");
    const editModal = document.getElementById("edit-slot-modal");

    // Check if we are on the organizer calendar page
    if (organizerCalendar && editModal) {
        const closeModalBtn = document.getElementById("close-modal-btn");
        const saveSlotBtn = document.getElementById("save-slot-btn");
        const modalTitle = document.getElementById("modal-title");
        const modalSubtitle = document.getElementById("modal-subtitle");
        const slotStatusInput = document.getElementById("slot-status");
        const slotPriceInput = document.getElementById("slot-price");

        let currentEditingSlot = null;

        // Listen for clicks on the calendar grid
        organizerCalendar.addEventListener("click", function (e) {
            const targetSlot = e.target.closest(".time-slot");

            // Ignore clicks on "Booked" slots
            if (!targetSlot || targetSlot.classList.contains("full")) {
                return;
            }

            currentEditingSlot = targetSlot; // Store the slot being edited

            // Get data from the clicked slot
            const day = targetSlot.dataset.day;
            const time = targetSlot.dataset.time;
            const price = targetSlot.dataset.price;
            const isClosed = targetSlot.classList.contains("closed");

            // Populate the modal
            modalTitle.textContent = `Edit Slot`;
            modalSubtitle.textContent = `${day}, ${time}`;
            slotPriceInput.value = price;

            if (isClosed) {
                slotStatusInput.value = "closed";
                slotPriceInput.disabled = true;
            } else {
                slotStatusInput.value = "available";
                slotPriceInput.disabled = false;
            }

            // Show the modal
            editModal.classList.add("active");
        });

        // Toggle price input based on status
        slotStatusInput.addEventListener("change", function () {
            if (slotStatusInput.value === "closed") {
                slotPriceInput.disabled = true;
                slotPriceInput.value = 0;
            } else {
                slotPriceInput.disabled = false;
            }
        });

        // Close modal button
        closeModalBtn.addEventListener("click", function () {
            editModal.classList.remove("active");
            currentEditingSlot = null;
        });

        // Save changes button
        saveSlotBtn.addEventListener("click", function () {
            if (!currentEditingSlot) return;

            const newStatus = slotStatusInput.value;
            const newPrice = slotPriceInput.value;
            const slotP = currentEditingSlot.querySelector("p");

            // Update the slot's data attributes (for next time)
            currentEditingSlot.dataset.price = newPrice;

            // Update the slot's appearance
            currentEditingSlot.classList.remove("available", "closed");

            if (newStatus === "closed") {
                currentEditingSlot.classList.add("closed");
                slotP.textContent = "Closed";
            } else {
                currentEditingSlot.classList.add("available");
                slotP.textContent = `$${newPrice}`;
            }

            // Close the modal
            editModal.classList.remove("active");
            currentEditingSlot = null;
        });
    }

    // ---
    // NEW CODE FOR AD PRICE CALCULATOR
    // Add this inside the DOMContentLoaded listener in js/main.js
    // ---

    // Find all the elements for the ad calculator
    const adTypeInput = document.getElementById("ad-type");
    const adDurationInput = document.getElementById("ad-duration");
    const summaryBasePrice = document.getElementById("summary-base-price");
    const summaryDuration = document.getElementById("summary-duration");
    const summaryTotalCost = document.getElementById("summary-total-cost");
    const submitAdBtn = document.getElementById("submit-ad-btn");

    // Check if we are on the ads page
    if (adTypeInput && adDurationInput) {

        // Define our prices (in dollars)
        const adPrices = {
            "ad": 10,     // $10 / day for a Homepage Ad
            "event": 5    // $5 / day for an Event Promotion
        };

        function calculateAdPrice() {
            const adType = adTypeInput.value;
            const duration = parseInt(adDurationInput.value, 10);
            const basePrice = adPrices[adType];

            let totalCost = 0;

            if (duration > 0) {
                totalCost = basePrice * duration;
            }

            // Update the summary box
            summaryBasePrice.textContent = `$${basePrice.toFixed(2)} / day`;
            summaryDuration.textContent = `${duration} days`;
            summaryTotalCost.textContent = `$${totalCost.toFixed(2)}`;

            // Enable or disable the button
            if (totalCost > 0) {
                submitAdBtn.disabled = false;
                submitAdBtn.textContent = `Pay & Submit ($${totalCost.toFixed(2)})`;
            } else {
                submitAdBtn.disabled = true;
                submitAdBtn.textContent = "Please select a duration";
            }
        }

        // Add event listeners to update on change
        adTypeInput.addEventListener("change", calculateAdPrice);
        adDurationInput.addEventListener("change", calculateAdPrice);

        // Run once on page load to set the initial state
        calculateAdPrice();
    }

 // --- 7. AI CHATBOT LOGIC (NEW!) ---
    const chatWindow = document.getElementById("ai-chat-window");
    const chatToggle = document.getElementById("ai-chat-toggle");
    
    if (chatToggle && chatWindow) {
        const chatBody = chatWindow.querySelector(".ai-chat-body");
        const chatInput = chatWindow.querySelector(".chat-input-area input");
        const chatSendBtn = chatWindow.querySelector(".chat-input-area button");
        
        // --- Toggle Chat Window ---
        chatToggle.addEventListener("click", function() {
            chatWindow.classList.toggle("active");
            if (chatWindow.classList.contains("active")) {
                chatToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
            } else {
                chatToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M13.6 10.6a2 2 0 1 0-2-2"></path><path d="M10 14a2 2 0 1 0 2 2"></path></svg>`;
            }
        });

        // --- Send Message on Button Click ---
        chatSendBtn.addEventListener("click", sendMessage);
        
        // --- Send Message on "Enter" key ---
        chatInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });

        async function sendMessage() {
            const userQuery = chatInput.value.trim();
            if (userQuery === "") return;

            // 1. Display user's message
            addMessage(userQuery, "user");
            chatInput.value = "";

            // 2. Show loading indicator
            addMessage("...", "ai", true); // 'true' for loading

            // 3. Call Gemini API
            try {
                const aiResponse = await callGeminiApi(userQuery);
                
                // 4. Remove loading indicator
                removeLoadingMessage();
                
                // 5. Display AI's response
                addMessage(aiResponse, "ai");
            } catch (error) {
                // Handle errors
                removeLoadingMessage();
                addMessage("Sorry, I'm having trouble connecting. Please try again.", "ai");
                console.error("Gemini API Error:", error);
            }
        }

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
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function removeLoadingMessage() {
            const loading = document.getElementById("loading-indicator");
            if (loading) {
                loading.remove();
            }
        }

        // --- Gemini API Call Function ---
        async function callGeminiApi(userQuery) {
            // This is the persona for your bot
            const systemPrompt = `
                You are SportLink AI, a friendly and helpful assistant for a sports facility booking website.
                Your job is to help users find facilities, find teammates, or get suggestions.
                - If a user asks to book a court (e.g., "book futsal"), guide them to the "Book a Court" page.
                - If a user asks to find a game (e.g., "find a basketball game"), guide them to the "Find a Match" page.
                - Use Google Search to answer real-time questions (e.g., "weather in Kota Kinabalu", "nearby badminton courts").
                - Be concise and friendly.
            `;
            
            const apiKey = ""; // API key is handled by the platform
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ "google_search": {} }], // Enable Google Search
                systemInstruction: {
                    parts: [{ text: systemPrompt }]
                },
            };

            // Simple retry logic
            let response;
            try {
                 response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (e) {
                // Initial fetch failed, wait 1s and retry once
                await new Promise(resolve => setTimeout(resolve, 1000));
                 response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const candidate = result.candidates?.[0];
            
            if (candidate && candidate.content?.parts?.[0]?.text) {
                // We're not showing citations for this simple bot
                return candidate.content.parts[0].text;
            } else if (result.promptFeedback) {
                console.warn("Prompt was blocked:", result.promptFeedback);
                return "I'm sorry, I can't respond to that. Can I help with something else?";
            } else {
                return "I'm sorry, I couldn't find an answer for that.";
            }
        }
    }

}); // End of DOMContentLoaded