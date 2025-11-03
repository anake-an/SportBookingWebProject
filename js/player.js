// js/player.js
// Handles all Player-specific dashboard logic

export function initPlayerLogic() {
    
    // --- 3. FACILITY CALENDAR (for facility_detail.html) ---
    const userCalendarBody = document.getElementById("user-calendar-body");
    if (userCalendarBody) {
        const summarySlot = document.getElementById("slot-details");
        const priceDetails = document.getElementById("price-details");
        const totalPriceEl = document.getElementById("total-price");
        const bookNowBtn = document.getElementById("book-now-btn");
        let selectedSlot = null;

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
            if (selectedSlot) selectedSlot.classList.remove("selected");
            selectedSlot = null;
            summarySlot.textContent = "Please select an available time slot from the calendar.";
            summarySlot.classList.add("placeholder-text");
            priceDetails.style.display = "none";
            bookNowBtn.disabled = true;
        }

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

        // --- 14. FACILITY COURT SELECTOR (User Side) ---
        const courtSelect = document.getElementById("facility-court-select");
        if (courtSelect) {
            // ... (Paste all code from Section 14) ...
            const courtData = { /* ... (simulated data) ... */ };
            const days = ["Thu 31/10", "Fri 01/11", "Sat 02/11", "Sun 03/11", "Mon 04/11"];
            const prices = { "Thu 31/10": 50, "Fri 01/11": 50, "Sat 02/11": 70, "Sun 03/11": 70, "Mon 04/11": 50 };

            const generateCalendarHTML = (courtKey) => {
                let html = "";
                const data = courtData[courtKey] || courtData["court1"];
                data.forEach(slot => {
                    html += `<div class="time-label">${slot.time}</div>`;
                    days.forEach(day => {
                        const price = prices[day];
                        const statusClass = slot.status;
                        let text = statusClass === 'closed' ? 'Closed' : (statusClass === 'full' ? 'Booked' : `$${price}`);
                        html += `
                            <div class="time-slot ${statusClass}" data-day="${day}" data-time="${slot.time}" data-price="${price}">
                                <p>${text}</p>
                            </div>
                        `;
                    });
                });
                userCalendarBody.innerHTML = html;
                resetSummary();
            };
            courtSelect.addEventListener("change", (e) => generateCalendarHTML(e.target.value));
            generateCalendarHTML('court1'); // Initial load
        }
    }
}