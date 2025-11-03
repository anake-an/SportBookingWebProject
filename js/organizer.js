// js/organizer.js
// Handles all Organizer-specific dashboard logic

export function initOrganizerLogic() {

    // --- 5. ORGANIZER CALENDAR MODAL (for organizer_calendar.html) ---
    const organizerCalendarBody = document.getElementById("organizer-calendar-body");
    const organizerCalendarMobile = document.getElementById("organizer-calendar-mobile");
    const editModal = document.getElementById("edit-slot-modal");

    if (editModal && (organizerCalendarBody || organizerCalendarMobile)) {
        // ... (Paste all code from Section 5) ...
        const closeModalBtn = document.getElementById("close-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-modal-btn");
        const saveSlotBtn = document.getElementById("save-slot-btn");
        const modalTitle = document.getElementById("modal-title");
        const modalSubtitle = document.getElementById("modal-subtitle");
        const slotStatusInput = document.getElementById("slot-status");
        const slotPriceInput = document.getElementById("slot-price");
        let currentEditingSlot = null;

        const openEditModal = (targetSlot) => {
            if (!targetSlot || targetSlot.classList.contains("full")) return;
            currentEditingSlot = targetSlot;
            const day = targetSlot.dataset.day;
            const time = targetSlot.dataset.time;
            const price = targetSlot.dataset.price;
            const isClosed = targetSlot.classList.contains("closed");
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
            editModal.classList.add("active");
        };
        const closeEditModal = () => {
            editModal.classList.remove("active");
            currentEditingSlot = null;
        };
        if (organizerCalendarBody) {
            organizerCalendarBody.addEventListener("click", (e) => openEditModal(e.target.closest(".time-slot")));
        }
        if (organizerCalendarMobile) {
            organizerCalendarMobile.addEventListener("click", (e) => {
                const targetRow = e.target.closest(".time-slot-row");
                if (targetRow) openEditModal(targetRow);
                const toggleBtn = e.target.closest(".day-accordion-toggle");
                if (toggleBtn) toggleBtn.nextElementSibling.classList.toggle("active");
            });
        }
        slotStatusInput.addEventListener("change", function () {
            slotPriceInput.disabled = (this.value === "closed");
            if (this.value === "closed") slotPriceInput.value = 0;
        });
        closeModalBtn.addEventListener("click", closeEditModal);
        if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeEditModal);
        saveSlotBtn.addEventListener("click", function () {
            if (!currentEditingSlot) return;
            const newStatus = slotStatusInput.value;
            const newPrice = slotPriceInput.value;
            currentEditingSlot.dataset.price = newPrice;
            currentEditingSlot.classList.remove("available", "closed", "limited");
            if (currentEditingSlot.classList.contains("time-slot")) {
                const slotP = currentEditingSlot.querySelector("p");
                if (newStatus === "closed") {
                    currentEditingSlot.classList.add("closed");
                    slotP.textContent = "Closed";
                } else {
                    currentEditingSlot.classList.add("available");
                    slotP.textContent = `$${newPrice}`;
                }
            } else if (currentEditingSlot.classList.contains("time-slot-row")) {
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
        // ... (Paste all code from Section 6) ...
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

    // --- 11. CALENDAR TEMPLATE LOGIC (for organizer_settings.html) ---
    const saveTemplatesBtn = document.getElementById("save-templates-btn");
    if (saveTemplatesBtn) {
        // ... (Paste all code from Section 11, Part 1) ...
        const weekdayMornInput = document.getElementById("weekday-morning-price");
        const weekdayEveInput = document.getElementById("weekday-evening-price");
        const weekendMornInput = document.getElementById("weekend-morning-price");
        const weekendEveInput = document.getElementById("weekend-evening-price");
        weekdayMornInput.value = localStorage.getItem('weekdayMorningPrice') || "40";
        weekdayEveInput.value = localStorage.getItem('weekdayEveningPrice') || "50";
        weekendMornInput.value = localStorage.getItem('weekendMorningPrice') || "60";
        weekendEveInput.value = localStorage.getItem('weekendEveningPrice') || "70";
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

    // --- 11 & 15. CALENDAR TEMPLATE & COURT SELECTOR (for organizer_calendar.html) ---
    const applyWeekdayBtn = document.getElementById("apply-weekday-template");
    const applyWeekendBtn = document.getElementById("apply-weekend-template");
    const orgCourtSelect = document.getElementById("court-select");
    const organizerSlots = document.querySelectorAll("#organizer-calendar-body .time-slot, #organizer-calendar-mobile .time-slot-row");

    const updateSlotUI = (slot, price) => {
        if (slot.classList.contains("full")) return;
        slot.dataset.price = price;
        slot.classList.remove("closed", "available", "limited");
        slot.classList.add("available");
        if (slot.classList.contains("time-slot")) {
            slot.querySelector("p").textContent = `$${price}`;
        } else if (slot.classList.contains("time-slot-row")) {
            slot.querySelector("strong").textContent = `$${price}`;
        }
    };
    const getHour = (timeString) => {
        const parts = timeString.match(/(\d+):(\d+) (AM|PM)/);
        let hour = parseInt(parts[1], 10);
        if (parts[3] === "PM" && hour !== 12) hour += 12;
        if (parts[3] === "AM" && hour === 12) hour = 0;
        return hour;
    };
    if (applyWeekdayBtn) {
        applyWeekdayBtn.addEventListener("click", () => {
            // ... (Paste all code from Section 11, Part 2) ...
            const mornPrice = localStorage.getItem('weekdayMorningPrice');
            const evePrice = localStorage.getItem('weekdayEveningPrice');
            if (!mornPrice || !evePrice) { alert("Please set weekday template prices in Settings > Templates first."); return; }
            document.querySelectorAll("#organizer-calendar-body .time-slot, #organizer-calendar-mobile .time-slot-row").forEach(slot => {
                const day = slot.dataset.day;
                if (day.includes("Mon") || day.includes("Thu") || day.includes("Fri")) {
                    const hour = getHour(slot.dataset.time);
                    if (hour < 17) updateSlotUI(slot, mornPrice);
                    else updateSlotUI(slot, evePrice);
                }
            });
        });
    }
    if (applyWeekendBtn) {
        applyWeekendBtn.addEventListener("click", () => {
            // ... (Paste all code from Section 11, Part 3) ...
            const mornPrice = localStorage.getItem('weekendMorningPrice');
            const evePrice = localStorage.getItem('weekendEveningPrice');
            if (!mornPrice || !evePrice) { alert("Please set weekend template prices in Settings > Templates first."); return; }
            document.querySelectorAll("#organizer-calendar-body .time-slot, #organizer-calendar-mobile .time-slot-row").forEach(slot => {
                const day = slot.dataset.day;
                if (day.includes("Sat") || day.includes("Sun")) {
                    const hour = getHour(slot.dataset.time);
                    if (hour < 17) updateSlotUI(slot, mornPrice);
                    else updateSlotUI(slot, evePrice);
                }
            });
        });
    }
    if (orgCourtSelect && organizerCalendarBody) {
        // ... (Paste all code from Section 15) ...
        const orgCourtData = { /* ... (simulated data) ... */ };
        const orgDays = ["Thu 31/10", "Fri 01/11", "Sat 02/11", "Sun 03/11", "Mon 04/11"];
        const orgTimes = ["5:00 PM", "6:00 PM", "7:00 PM"];
        const generateOrgCalendar = (courtKey) => { /* ... (paste function) ... */ };
        orgCourtSelect.addEventListener("change", (e) => generateOrgCalendar(e.target.value));
    }
}