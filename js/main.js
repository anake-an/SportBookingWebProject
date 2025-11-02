/* ---
   SportLink main.js (FINAL v15 - Complete Responsive JS)
   Handles all site-wide JavaScript.
--- */

// Main function to run when the page is loaded
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. AUTHENTICATION LOGIC (Placeholder) ---
    const signOutBtns = document.querySelectorAll('#sign-out-btn, #sign-out-btn-mobile, #sign-out-btn-organizer');
    const handleSignOut = (e) => {
        e.preventDefault();
        console.log("Signing out...");
        window.location.href = 'login.html';
    };
    signOutBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', handleSignOut);
    });
    

    // --- 2. SLIDESHOW CODE (for index.html) ---
    const slideshow = document.querySelector(".hero-slideshow");
    if (slideshow) {
        const slides = document.getElementsByClassName("slide");
        const dots = document.getElementsByClassName("dot");
        let slideIndex = 0;
        let slideTimer; 

        function showSlide(n) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.opacity = "0";
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            if (n > slides.length) { slideIndex = 1; }
            else if (n < 1) { slideIndex = slides.length; }
            else { slideIndex = n; }
            if (slides[slideIndex - 1]) {
                slides[slideIndex - 1].style.opacity = "1";
            }
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].className += " active";
            }
        }
        function autoShowSlides() {
            slideIndex++;
            showSlide(slideIndex);
            slideTimer = setTimeout(autoShowSlides, 5000); 
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", function () {
                clearTimeout(slideTimer); 
                showSlide(i + 1); 
            });
        }
        showSlide(1);
        slideTimer = setTimeout(autoShowSlides, 5000);
    }


    // --- 3. FACILITY CALENDAR (for facility_detail.html) ---
    // This section is now MODIFIED to work with the new court selector
    const userCalendarBody = document.getElementById("user-calendar-body");
    if (userCalendarBody) {
        const summarySlot = document.getElementById("slot-details");
        const priceDetails = document.getElementById("price-details");
        const totalPriceEl = document.getElementById("total-price");
        const bookNowBtn = document.getElementById("book-now-btn");
        let selectedSlot = null;

        // Event delegation for dynamically added slots
        userCalendarBody.addEventListener("click", function (e) {
            const targetSlot = e.target.closest(".time-slot");
            if (!targetSlot || targetSlot.classList.contains("full") || targetSlot.classList.contains("closed")) return;
            
            if (selectedSlot) selectedSlot.classList.remove("selected");
            
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
        
        // This function is now also called by the new court selector
        function resetSummary() {
            if (selectedSlot) selectedSlot.classList.remove("selected");
            selectedSlot = null;
            summarySlot.textContent = "Please select an available time slot from the calendar.";
            summarySlot.classList.add("placeholder-text");
            priceDetails.style.display = "none";
            bookNowBtn.disabled = true;
        }

        // --- SECTION 14: FACILITY COURT SELECTOR (User Side) ---
        const courtSelect = document.getElementById("facility-court-select");
        if (courtSelect) {
            // Simulated data for different courts
            const courtData = {
                "court1": [ // Default: 5pm-Full, 6pm-Full, 7pm-Available
                    { time: "5:00 PM", status: "full", price: 50 },
                    { time: "6:00 PM", status: "full", price: 50 },
                    { time: "7:00 PM", status: "available", price: 50 }
                ],
                "court2": [ // All available
                    { time: "5:00 PM", status: "available", price: 50 },
                    { time: "6:00 PM", status: "available", price: 50 },
                    { time: "7:00 PM", status: "available", price: 50 }
                ],
                "badminton": [ // All closed
                    { time: "5:00 PM", status: "closed", price: 0 },
                    { time: "6:00 PM", status: "closed", price: 0 },
                    { time: "7:00 PM", status: "closed", price: 0 }
                ]
            };
            const days = ["Thu 31/10", "Fri 01/11", "Sat 02/11", "Sun 03/11", "Mon 04/11"];
            const prices = { "Thu 31/10": 50, "Fri 01/11": 50, "Sat 02/11": 70, "Sun 03/11": 70, "Mon 04/11": 50 };

            const generateCalendarHTML = (courtKey) => {
                let html = "";
                const data = courtData[courtKey] || courtData["court1"];

                data.forEach(slot => {
                    html += `<div class="time-label">${slot.time}</div>`;
                    days.forEach(day => {
                        // Use court-specific status, but day-specific price
                        const price = prices[day];
                        html += `
                            <div class="time-slot ${slot.status}" data-day="${day}" data-time="${slot.time}" data-price="${price}">
                                <p>${slot.status === 'closed' ? 'Closed' : '$' + price}</p>
                            </div>
                        `;
                    });
                });
                userCalendarBody.innerHTML = html;
                resetSummary(); // Reset selection when calendar changes
            };

            // Add listener to the dropdown
            courtSelect.addEventListener("change", (e) => {
                generateCalendarHTML(e.target.value);
            });

            // Initial load (to match the hardcoded HTML)
            generateCalendarHTML('court1');
        }
    }


    // --- 4. TAB SWITCHING (for facility_detail.html, user_profile.html, etc.) ---
    const tabContainers = document.querySelectorAll(".tabs");
    tabContainers.forEach(tabContainer => {
        const tabLinks = tabContainer.querySelectorAll(".tab-link");
        let tabContentWrapper = tabContainer.nextElementSibling;
        while (tabContentWrapper && !tabContentWrapper.querySelector(".tab-content")) {
            tabContentWrapper = tabContentWrapper.nextElementSibling;
        }
        if (!tabContentWrapper) return; 
        const tabContents = tabContentWrapper.querySelectorAll(".tab-content");
        
        const activeTab = tabContainer.querySelector(".tab-link.active");
        if (activeTab) {
            const activeTabId = activeTab.dataset.tab;
            const activeContent = tabContentWrapper.querySelector(`#${activeTabId}`);
            if (activeContent) activeContent.classList.add("active");
        } else {
            if(tabLinks[0]) tabLinks[0].classList.add("active");
            if(tabContents[0]) tabContents[0].classList.add("active");
        }

        tabContainer.addEventListener("click", function (e) {
            const clickedTab = e.target.closest(".tab-link");
            if (!clickedTab) return;

            tabLinks.forEach(link => link.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            clickedTab.classList.add("active");
            const tabId = clickedTab.dataset.tab;
            const correspondingContent = tabContentWrapper.querySelector(`#${tabId}`);
            if (correspondingContent) {
                correspondingContent.classList.add("active");
            }
        });
    });


    // --- 5. ORGANIZER CALENDAR MODAL (for organizer_calendar.html) ---
    const organizerCalendarBody = document.getElementById("organizer-calendar-body");
    const organizerCalendarMobile = document.getElementById("organizer-calendar-mobile");
    const editModal = document.getElementById("edit-slot-modal");

    if (editModal && (organizerCalendarBody || organizerCalendarMobile)) {
        
        // Modal elements
        const closeModalBtn = document.getElementById("close-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-modal-btn"); // Added this
        const saveSlotBtn = document.getElementById("save-slot-btn");
        const modalTitle = document.getElementById("modal-title");
        const modalSubtitle = document.getElementById("modal-subtitle");
        const slotStatusInput = document.getElementById("slot-status");
        const slotPriceInput = document.getElementById("slot-price");
        let currentEditingSlot = null;

        // Function to OPEN the modal
        const openEditModal = (targetSlot) => {
            // Check if the slot is valid (not booked/full)
            if (!targetSlot || targetSlot.classList.contains("full")) return;
            
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
        };

        // Function to CLOSE the modal
        const closeEditModal = () => {
            editModal.classList.remove("active");
            currentEditingSlot = null;
        };

        // --- Listen for clicks on the DESKTOP grid ---
        if (organizerCalendarBody) {
            organizerCalendarBody.addEventListener("click", (e) => {
                const targetSlot = e.target.closest(".time-slot");
                openEditModal(targetSlot);
            });
        }

        // --- Listen for clicks on the NEW MOBILE list ---
        if (organizerCalendarMobile) {
            organizerCalendarMobile.addEventListener("click", (e) => {
                // Check if we clicked a slot to edit
                const targetRow = e.target.closest(".time-slot-row");
                if (targetRow) {
                    openEditModal(targetRow);
                }

                // Handle accordion toggle
                const toggleBtn = e.target.closest(".day-accordion-toggle");
                if (toggleBtn) {
                    toggleBtn.nextElementSibling.classList.toggle("active");
                }
            });
        }

        // Status change logic
        slotStatusInput.addEventListener("change", function () {
            slotPriceInput.disabled = (this.value === "closed");
            if (this.value === "closed") slotPriceInput.value = 0;
        });

        // Button listeners for closing the modal
        closeModalBtn.addEventListener("click", closeEditModal);
        if(cancelModalBtn) cancelModalBtn.addEventListener("click", closeEditModal); 

        // Save button listener
        saveSlotBtn.addEventListener("click", function () {
            if (!currentEditingSlot) return;
            
            const newStatus = slotStatusInput.value;
            const newPrice = slotPriceInput.value;

            // Update data attributes
            currentEditingSlot.dataset.price = newPrice;
            currentEditingSlot.classList.remove("available", "closed", "limited");

            // --- Update UI ---
            // Check if it's the desktop grid or mobile list
            if (currentEditingSlot.classList.contains("time-slot")) {
                // 1. Update Desktop Grid
                const slotP = currentEditingSlot.querySelector("p");
                if (newStatus === "closed") {
                    currentEditingSlot.classList.add("closed");
                    slotP.textContent = "Closed";
                } else {
                    currentEditingSlot.classList.add("available");
                    slotP.textContent = `$${newPrice}`;
                }
            } else if (currentEditingSlot.classList.contains("time-slot-row")) {
                // 2. Update Mobile List
                const slotStrong = currentEditingSlot.querySelector("strong");
                 if (newStatus === "closed") {
                    currentEditingSlot.classList.add("closed");
                    slotStrong.textContent = "Closed";
                } else {
                    currentEditingSlot.classList.add("available");
                    slotStrong.textContent = `$${newPrice}`;
                }
            }
            
            closeEditModal();
        });
    }


    // --- 6. AD PRICE CALCULATOR (for organizer_ads.html) ---
    const adTypeInput = document.getElementById("ad-type");
    const adDurationInput = document.getElementById("ad-duration");
    
    if (adTypeInput && adDurationInput) {
        const summaryBasePrice = document.getElementById("summary-base-price");
        const summaryDuration = document.getElementById("summary-duration");
        const summaryTotalCost = document.getElementById("summary-total-cost");
        const submitAdBtn = document.getElementById("submit-ad-btn");
        const adPrices = { "ad": 10, "event": 5 };

        function calculateAdPrice() {
            const adType = adTypeInput.value;
            const duration = parseInt(adDurationInput.value, 10);
            const basePrice = adPrices[adType];
            let totalCost = (duration > 0) ? (basePrice * duration) : 0;

            summaryBasePrice.textContent = `$${basePrice.toFixed(2)} / day`;
            summaryDuration.textContent = `${duration} days`;
            summaryTotalCost.textContent = `$${totalCost.toFixed(2)}`;
            submitAdBtn.disabled = (totalCost <= 0);
            submitAdBtn.textContent = (totalCost > 0) ? `Pay & Submit ($${totalCost.toFixed(2)})` : "Please select a duration";
        }
        adTypeInput.addEventListener("change", calculateAdPrice);
        adDurationInput.addEventListener("change", calculateAdPrice);
        calculateAdPrice();
    }


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
            if (chatWindow.classList.contains("active")) {
                closeChat();
            } else {
                openChat();
            }
        });

        if (chatCloseBtn) {
            chatCloseBtn.addEventListener("click", closeChat);
        }

        chatSendBtn.addEventListener("click", sendMessage);
        chatInput.addEventListener("keyup", function(event) {
            if (event.key === "Enter") { sendMessage(); }
        });

        async function sendMessage() {
            const userQuery = chatInput.value.trim();
            if (userQuery === "") return;
            addMessage(userQuery, "user");
            chatInput.value = "";
            addMessage("...", "ai", true); 

            try {
                const aiResponse = await callGeminiApi(userQuery);
                removeLoadingMessage();
                addMessage(aiResponse, "ai");
            } catch (error) {
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
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function removeLoadingMessage() {
            const loading = document.getElementById("loading-indicator");
            if (loading) { loading.remove(); }
        }

        async function callGeminiApi(userQuery) {
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
                tools: [{ "google_search": {} }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
            };

            let response;
            try {
                 response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch (e) {
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
                return candidate.content.parts[0].text;
            } else if (result.promptFeedback) {
                console.warn("Prompt was blocked:", result.promptFeedback);
                return "I'm sorry, I can't respond to that. Can I help with something else?";
            } else {
                return "I'm sorry, I couldn't find an answer for that.";
            }
        }
    }

    // --- 8. POST A MATCH MODAL (for matchmaking.html) ---
    const postMatchModal = document.getElementById("post-match-modal");
    
    if (postMatchModal) {
        const openModalBtn = document.getElementById("open-post-modal-btn");
        const navOpenModalBtn = document.getElementById("nav-post-match-btn"); 
        const navOpenModalBtnMobile = document.getElementById("nav-post-match-btn-mobile"); 
        const closeModalBtn = document.getElementById("close-post-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-post-modal-btn");

        const openModal = (e) => {
            if(e) e.preventDefault(); 
            postMatchModal.classList.add("active");
        };
        const closeModal = () => postMatchModal.classList.remove("active");

        if (openModalBtn) openModalBtn.addEventListener("click", openModal);
        if (navOpenModalBtn) navOpenModalBtn.addEventListener("click", openModal);
        if (navOpenModalBtnMobile) navOpenModalBtnMobile.addEventListener("click", openModal);
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
        if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

        if (window.location.hash === "#post") {
            openModal();
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    }
    
    // --- 9. MOBILE HAMBURGER MENU (Site-wide) ---
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileNavMenu = document.getElementById("mobile-nav-menu");
    const organizerSidebar = document.getElementById("organizer-sidebar"); 
    const closeSidebarBtn = document.getElementById("close-sidebar-btn"); 

    if (hamburgerBtn && mobileNavMenu) { // For user pages and landing page
        hamburgerBtn.addEventListener("click", () => {
            mobileNavMenu.classList.toggle("active");
        });
    }
    
    // THIS IS THE NEW, FIXED LOGIC FOR THE ORGANIZER SIDEBAR
    if (hamburgerBtn && organizerSidebar) { // For organizer pages
        // Open sidebar
        hamburgerBtn.addEventListener("click", () => {
            organizerSidebar.classList.add("active"); 
        });
    }
    
    if (closeSidebarBtn && organizerSidebar) { // For organizer close button
        // Close sidebar
        closeSidebarBtn.addEventListener("click", () => {
            organizerSidebar.classList.remove("active");
        });
    }

    // --- 10. BOOKING DETAIL MODAL (for organizer_bookings.html) ---
    const bookingsTable = document.getElementById("bookings-table");
    const bookingModal = document.getElementById("booking-detail-modal");

    if (bookingsTable && bookingModal) {
        const closeModalBtn = document.getElementById("close-booking-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-booking-modal-btn");

        // Modal fields
        const modalUser = document.getElementById("modal-booking-user");
        const modalContact = document.getElementById("modal-booking-contact");
        const modalStatus = document.getElementById("modal-booking-status");
        const modalDateTime = document.getElementById("modal-booking-datetime");
        const modalCourt = document.getElementById("modal-booking-court");
        const modalAmount = document.getElementById("modal-booking-amount");

        const openBookingModal = (e) => {
            const btn = e.target.closest(".btn-details");
            if (!btn) return; // Didn't click a details button

            // 1. Get data from the button's data- attributes
            const data = btn.dataset;

            // 2. Populate the modal
            modalUser.textContent = data.user;
            modalContact.textContent = data.contact;
            modalDateTime.textContent = data.datetime;
            modalCourt.textContent = data.court;
            modalAmount.textContent = data.amount;

            // 3. Populate the status pill
            const statusPill = modalStatus.querySelector("span");
            statusPill.textContent = data.status;
            statusPill.className = "status-pill"; // Reset classes
            if (data.status === "Paid") {
                statusPill.classList.add("paid");
            } else if (data.status === "Pending") {
                statusPill.classList.add("pending");
            } else if (data.status === "Cancelled") {
                statusPill.classList.add("cancelled");
            }

            // 4. Show the modal
            bookingModal.classList.add("active");
        };

        const closeBookingModal = () => {
            bookingModal.classList.remove("active");
        };

        // Add listeners
        bookingsTable.addEventListener("click", openBookingModal);
        closeModalBtn.addEventListener("click", closeBookingModal);
        cancelModalBtn.addEventListener("click", closeBookingModal);
    }

    // --- 11. CALENDAR TEMPLATE LOGIC (MODIFIED) ---

    // --- On organizer_settings.html ---
    const saveTemplatesBtn = document.getElementById("save-templates-btn");
    if (saveTemplatesBtn) {
        // Find all the new input fields
        const weekdayMornInput = document.getElementById("weekday-morning-price");
        const weekdayEveInput = document.getElementById("weekday-evening-price");
        const weekendMornInput = document.getElementById("weekend-morning-price");
        const weekendEveInput = document.getElementById("weekend-evening-price");

        // Load saved values on page load
        weekdayMornInput.value = localStorage.getItem('weekdayMorningPrice') || "40";
        weekdayEveInput.value = localStorage.getItem('weekdayEveningPrice') || "50";
        weekendMornInput.value = localStorage.getItem('weekendMorningPrice') || "60";
        weekendEveInput.value = localStorage.getItem('weekendEveningPrice') || "70";

        // Save all four values to localStorage
        saveTemplatesBtn.addEventListener("click", () => {
            localStorage.setItem('weekdayMorningPrice', weekdayMornInput.value);
            localStorage.setItem('weekdayEveningPrice', weekdayEveInput.value);
            localStorage.setItem('weekendMorningPrice', weekendMornInput.value);
            localStorage.setItem('weekendEveningPrice', weekendEveInput.value);

            saveTemplatesBtn.textContent = "Saved!";
            saveTemplatesBtn.classList.remove("btn-primary");
            saveTemplatesBtn.classList.add("btn-secondary");

            setTimeout(() => {
                saveTemplatesBtn.textContent = "Save Templates";
                saveTemplatesBtn.classList.add("btn-primary");
                saveTemplatesBtn.classList.remove("btn-secondary");
            }, 2000);
        });
    }

    // --- On organizer_calendar.html ---
    const applyWeekdayBtn = document.getElementById("apply-weekday-template");
    const applyWeekendBtn = document.getElementById("apply-weekend-template");
    // MODIFIED: Selector is now specific to the organizer page
    const organizerSlots = document.querySelectorAll("#organizer-calendar-body .time-slot, #organizer-calendar-mobile .time-slot-row");

    // Helper function to update a single slot's UI
    const updateSlotUI = (slot, price) => {
        // Don't update slots that are already booked
        if (slot.classList.contains("full")) return;

        slot.dataset.price = price;
        slot.classList.remove("closed", "available", "limited");
        slot.classList.add("available");

        if (slot.classList.contains("time-slot")) { // Desktop view
            slot.querySelector("p").textContent = `$${price}`;
        } else if (slot.classList.contains("time-slot-row")) { // Mobile view
            slot.querySelector("strong").textContent = `$${price}`;
        }
    };

    // Helper function to get the hour from a time string (e.g., "5:00 PM" -> 17)
    const getHour = (timeString) => {
        const parts = timeString.match(/(\d+):(\d+) (AM|PM)/);
        let hour = parseInt(parts[1], 10);
        if (parts[3] === "PM" && hour !== 12) hour += 12;
        if (parts[3] === "AM" && hour === 12) hour = 0;
        return hour;
    };

    // Apply Weekday Template
    if (applyWeekdayBtn) {
        applyWeekdayBtn.addEventListener("click", () => {
            const mornPrice = localStorage.getItem('weekdayMorningPrice');
            const evePrice = localStorage.getItem('weekdayEveningPrice');
            if (!mornPrice || !evePrice) {
                alert("Please set weekday template prices in Settings > Templates first.");
                return;
            }
            
            organizerSlots.forEach(slot => { // Use organizerSlots
                const day = slot.dataset.day;
                if (day.includes("Mon") || day.includes("Thu") || day.includes("Fri")) {
                    const hour = getHour(slot.dataset.time);
                    if (hour < 17) { // 17 is 5:00 PM
                        updateSlotUI(slot, mornPrice); // Apply morning price
                    } else {
                        updateSlotUI(slot, evePrice); // Apply evening price
                    }
                }
            });
        });
    }

    // Apply Weekend Template
    if (applyWeekendBtn) {
        applyWeekendBtn.addEventListener("click", () => {
            const mornPrice = localStorage.getItem('weekendMorningPrice');
            const evePrice = localStorage.getItem('weekendEveningPrice');
            if (!mornPrice || !evePrice) {
                alert("Please set weekend template prices in Settings > Templates first.");
                return;
            }

            organizerSlots.forEach(slot => { // Use organizerSlots
                const day = slot.dataset.day;
                if (day.includes("Sat") || day.includes("Sun")) {
                    const hour = getHour(slot.dataset.time);
                    if (hour < 17) { // 17 is 5:00 PM
                        updateSlotUI(slot, mornPrice); // Apply morning price
                    } else {
                        updateSlotUI(slot, evePrice); // Apply evening price
                    }
                }
            });
        });
    }


    // --- 12. TRANSACTION DETAIL MODAL (NEW) ---
    const transactionTable = document.getElementById("transaction-table");
    const transactionModal = document.getElementById("transaction-detail-modal");

    if (transactionTable && transactionModal) {
        const closeModalBtn = document.getElementById("close-txn-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-txn-modal-btn");

        // Modal fields
        const modalDesc = document.getElementById("modal-txn-desc");
        const modalDate = document.getElementById("modal-txn-date");
        const modalType = document.getElementById("modal-txn-type");
        const modalAmount = document.getElementById("modal-txn-amount");

        const openTransactionModal = (e) => {
            const btn = e.target.closest(".btn-details");
            if (!btn) return; // Didn't click a details button

            const data = btn.dataset;

            // Populate the modal
            modalDesc.textContent = data.desc;
            modalDate.textContent = data.date;
            modalType.textContent = data.type;
            modalAmount.textContent = data.amount;

            // Style the amount
            if (data.amount.startsWith("-")) {
                modalAmount.style.color = "var(--danger-color)";
            } else {
                modalAmount.style.color = "var(--success-color)";
            }
            
            // Show the modal
            transactionModal.classList.add("active");
        };

        const closeTransactionModal = () => {
            transactionModal.classList.remove("active");
        };

        // Add listeners
        transactionTable.addEventListener("click", openTransactionModal);
        closeModalBtn.addEventListener("click", closeTransactionModal);
        cancelModalBtn.addEventListener("click", closeTransactionModal);
    }
    
    
    // --- 13. AI SUGGESTION SLIDESHOW (NEW for user_dashboard.html) ---
    const aiSlideshow = document.querySelector(".ai-slideshow");
    if (aiSlideshow) {
        const aiSlides = aiSlideshow.getElementsByClassName("ai-slide");
        const aiDots = aiSlideshow.getElementsByClassName("ai-dot");
        let aiSlideIndex = 0;
        let aiSlideTimer; 

        function showAiSlide(n) {
            // Hide all slides
            for (let i = 0; i < aiSlides.length; i++) {
                aiSlides[i].style.opacity = "0";
            }
            // Deactivate all dots
            for (let i = 0; i < aiDots.length; i++) {
                aiDots[i].className = aiDots[i].className.replace(" active", "");
            }
            
            // Handle looping
            if (n > aiSlides.length) { aiSlideIndex = 1; }
            else if (n < 1) { aiSlideIndex = aiSlides.length; }
            else { aiSlideIndex = n; }
            
            // Show the correct slide
            if (aiSlides[aiSlideIndex - 1]) {
                aiSlides[aiSlideIndex - 1].style.opacity = "1";
            }
            // Activate the correct dot
            if (aiDots[aiSlideIndex - 1]) {
                aiDots[aiSlideIndex - 1].className += " active";
            }
        }

        // Auto-play function
        function autoShowAiSlides() {
            aiSlideIndex++;
            showAiSlide(aiSlideIndex);
            aiSlideTimer = setTimeout(autoShowAiSlides, 5000); // Change slide every 5 seconds
        }

        // Add click event to dots
        for (let i = 0; i < aiDots.length; i++) {
            aiDots[i].addEventListener("click", function () {
                clearTimeout(aiSlideTimer); // Stop auto-play
                showAiSlide(i + 1); // Show the clicked slide
            });
        }

        // Start the slideshow
        showAiSlide(1);
        aiSlideTimer = setTimeout(autoShowAiSlides, 5000);
    }

    // --- 14. FACILITY COURT SELECTOR (User Side) is within Section 3 ---
    
    // --- 15. ORGANIZER COURT SELECTOR (NEW) ---
    const orgCourtSelect = document.getElementById("court-select");
    if (orgCourtSelect && organizerCalendarBody) { // Check for organizer calendar
        
        // Simulated data for the ORGANIZER'S calendar
        const orgCourtData = {
            "Court 1 (Futsal)": { // This is the default view in the HTML
                "Thu 31/10": [ {time: "5:00 PM", status: "full", price: 0}, {time: "6:00 PM", status: "full", price: 0}, {time: "7:00 PM", status: "available", price: 50} ],
                "Fri 01/11": [ {time: "5:00 PM", status: "available", price: 50}, {time: "6:00 PM", status: "available", price: 50}, {time: "7:00 PM", status: "limited", price: 50} ],
                "Sat 02/11": [ {time: "5:00 PM", status: "available", price: 70}, {time: "6:00 PM", status: "full", price: 0}, {time: "7:00 PM", status: "full", price: 0} ],
                "Sun 03/11": [ {time: "5:00 PM", status: "available", price: 70}, {time: "6:00 PM", status: "limited", price: 70}, {time: "7:00 PM", status: "full", price: 0} ],
                "Mon 04/11": [ {time: "5:00 PM", status: "closed", price: 0}, {time: "6:00 PM", status: "available", price: 50}, {time: "7:00 PM", status: "available", price: 50} ]
            },
            "Court 2 (Futsal)": { // All available at different prices
                "Thu 31/10": [ {time: "5:00 PM", status: "available", price: 45}, {time: "6:00 PM", status: "available", price: 45}, {time: "7:00 PM", status: "available", price: 45} ],
                "Fri 01/11": [ {time: "5:00 PM", status: "available", price: 45}, {time: "6:00 PM", status: "available", price: 45}, {time: "7:00 PM", status: "available", price: 45} ],
                "Sat 02/11": [ {time: "5:00 PM", status: "available", price: 65}, {time: "6:00 PM", status: "available", price: 65}, {time: "7:00 PM", status: "available", price: 65} ],
                "Sun 03/11": [ {time: "5:00 PM", status: "available", price: 65}, {time: "6:00 PM", status: "available", price: 65}, {time: "7:00 PM", status: "available", price: 65} ],
                "Mon 04/11": [ {time: "5:00 PM", status: "available", price: 45}, {time: "6:00 PM", status: "available", price: 45}, {time: "7:00 PM", status: "available", price: 45} ]
            },
            "Badminton Court A": { // Cheaper and mostly closed
                "Thu 31/10": [ {time: "5:00 PM", status: "closed", price: 0}, {time: "6:00 PM", status: "closed", price: 0}, {time: "7:00 PM", status: "available", price: 15} ],
                "Fri 01/11": [ {time: "5:00 PM", status: "closed", price: 0}, {time: "6:00 PM", status: "available", price: 15}, {time: "7:00 PM", status: "available", price: 15} ],
                "Sat 02/11": [ {time: "5:00 PM", status: "available", price: 20}, {time: "6:00 PM", status: "available", price: 20}, {time: "7:00 PM", status: "full", price: 0} ],
                "Sun 03/11": [ {time: "5:00 PM", status: "available", price: 20}, {time: "6:00 PM", status: "limited", price: 20}, {time: "7:00 PM", status: "full", price: 0} ],
                "Mon 04/11": [ {time: "5:00 PM", status: "closed", price: 0}, {time: "6:00 PM", status: "closed", price: 0}, {time: "7:00 PM", status: "closed", price: 0} ]
            }
        };
        const orgDays = ["Thu 31/10", "Fri 01/11", "Sat 02/11", "Sun 03/11", "Mon 04/11"];
        const orgTimes = ["5:00 PM", "6:00 PM", "7:00 PM"];

        const generateOrgCalendar = (courtKey) => {
            const data = orgCourtData[courtKey];
            if (!data) return; // No data for this court

            // 1. Update Desktop Calendar
            let desktopHTML = "";
            orgTimes.forEach(time => {
                desktopHTML += `<div class="time-label">${time}</div>`;
                orgDays.forEach(day => {
                    const slot = data[day].find(s => s.time === time);
                    let text = slot.status === 'closed' ? 'Closed' : (slot.status === 'full' ? 'Booked' : `$${slot.price}`);
                    desktopHTML += `
                        <div class="time-slot ${slot.status}" data-day="${day}" data-time="${slot.time}" data-price="${slot.price}">
                            <p>${text}</p>
                        </div>
                    `;
                });
            });
            organizerCalendarBody.innerHTML = desktopHTML;

            // 2. Update Mobile Accordion
            let mobileHTML = "";
            orgDays.forEach(day => {
                const daySlots = data[day];
                let booked = 0, available = 0, closed = 0;
                let dayContentHTML = "";

                daySlots.forEach(slot => {
                    let text = "";
                    if (slot.status === 'full') {
                        booked++;
                        text = "<strong>Booked</strong>";
                    } else if (slot.status === 'closed') {
                        closed++;
                        text = "<strong>Closed</strong>";
                    } else {
                        available++;
                        text = `<strong>$${slot.price}</strong>${slot.status === 'limited' ? ' (Limited)' : ''}`;
                    }
                    
                    dayContentHTML += `
                        <div class="time-slot-row ${slot.status}" data-day="${day}" data-time="${slot.time}" data-price="${slot.price}">
                            <span>${slot.time}</span> ${text}
                        </div>
                    `;
                });

                // Create summary text
                let summary = [];
                if (available > 0) summary.push(`${available} Available`);
                if (booked > 0) summary.push(`${booked} Booked`);
                if (closed > 0) summary.push(`${closed} Closed`);

                mobileHTML += `
                    <div class="day-accordion">
                        <button class="day-accordion-toggle">
                            <strong>${day.replace(" ", ", ")}</strong>
                            <span>(${summary.join(', ')})</span>
                        </button>
                        <div class="day-accordion-content">
                            ${dayContentHTML}
                        </div>
                    </div>
                `;
            });
            organizerCalendarMobile.innerHTML = mobileHTML;
        };

        // Add listener to the dropdown
        orgCourtSelect.addEventListener("change", (e) => {
            generateOrgCalendar(e.target.value);
        });
        
        // No initial call, so the default HTML is used first
    }
    
    // --- 16. USER MATCH HISTORY MODAL (NEW) ---
    const matchHistoryTable = document.getElementById("match-history-table");
    const matchDetailModal = document.getElementById("match-detail-modal");

    if (matchHistoryTable && matchDetailModal) {
        const closeModalBtn = document.getElementById("close-match-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-match-modal-btn");

        const modalGame = document.getElementById("modal-match-game");
        const modalDate = document.getElementById("modal-match-date");
        const modalLocation = document.getElementById("modal-match-location");
        const modalRolePill = matchDetailModal.querySelector('#modal-match-role .status-pill');
        const modalStatus = document.getElementById("modal-match-status");

        const openMatchModal = (e) => {
            const btn = e.target.closest(".btn-match-details");
            if (!btn) return;

            const data = btn.dataset;

            // 1. Populate details
            modalGame.textContent = data.game;
            modalDate.textContent = `Date: ${data.date}`;
            modalLocation.textContent = data.location;
            modalStatus.textContent = data.role === 'Cancelled' ? 'Cancelled' : 'Completed';
            
            // 2. Populate and style role pill
            modalRolePill.textContent = data.role;
            modalRolePill.className = "status-pill"; 
            if (data.role === 'Joined') {
                 modalRolePill.classList.add('paid');
            } else if (data.role === 'Hosted') {
                 modalRolePill.classList.add('hosted');
            } else if (data.role === 'Cancelled') {
                 modalRolePill.classList.add('cancelled');
            }

            // 3. Show the modal
            matchDetailModal.classList.add("active");
        };

        const closeMatchModal = () => {
            matchDetailModal.classList.remove("active");
        };

        matchHistoryTable.addEventListener("click", openMatchModal);
        closeModalBtn.addEventListener("click", closeMatchModal);
        cancelModalBtn.addEventListener("click", closeMatchModal);
    }
    
}); // --- End of DOMContentLoaded ---