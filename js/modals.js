// js/modals.js
// Handles all modal popups

export function initModals() {

    // --- 8. POST A MATCH MODAL (for matchmaking.html) ---
    const postMatchModal = document.getElementById("post-match-modal");
    if (postMatchModal) {
        const openModalBtn = document.getElementById("open-post-modal-btn");
        const navOpenModalBtn = document.getElementById("nav-post-match-btn");
        const navOpenModalBtnMobile = document.getElementById("nav-post-match-btn-mobile");
        const closeModalBtn = document.getElementById("close-post-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-post-modal-btn");

        const openModal = (e) => {
            if (e) e.preventDefault();
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

    // --- 10. BOOKING DETAIL MODAL (for organizer_bookings.html) ---
    const bookingsTable = document.getElementById("bookings-table");
    const bookingModal = document.getElementById("booking-detail-modal");
    if (bookingsTable && bookingModal) {
        // ... (Paste all code from Section 10) ...
        const closeModalBtn = document.getElementById("close-booking-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-booking-modal-btn");
        const modalUser = document.getElementById("modal-booking-user");
        const modalContact = document.getElementById("modal-booking-contact");
        const modalStatus = document.getElementById("modal-booking-status");
        const modalDateTime = document.getElementById("modal-booking-datetime");
        const modalCourt = document.getElementById("modal-booking-court");
        const modalAmount = document.getElementById("modal-booking-amount");

        const openBookingModal = (e) => {
            const btn = e.target.closest(".btn-details");
            if (!btn) return;
            const data = btn.dataset;
            modalUser.textContent = data.user;
            modalContact.textContent = data.contact;
            modalDateTime.textContent = data.datetime;
            modalCourt.textContent = data.court;
            modalAmount.textContent = data.amount;
            const statusPill = modalStatus.querySelector("span");
            statusPill.textContent = data.status;
            statusPill.className = "status-pill";
            if (data.status === "Paid") statusPill.classList.add("paid");
            else if (data.status === "Pending") statusPill.classList.add("pending");
            else if (data.status === "Cancelled") statusPill.classList.add("cancelled");
            bookingModal.classList.add("active");
        };
        const closeBookingModal = () => bookingModal.classList.remove("active");
        bookingsTable.addEventListener("click", openBookingModal);
        closeModalBtn.addEventListener("click", closeBookingModal);
        cancelModalBtn.addEventListener("click", closeBookingModal);
    }

    // --- 12. TRANSACTION DETAIL MODAL (for organizer_wallet.html) ---
    const transactionTable = document.getElementById("transaction-table");
    const transactionModal = document.getElementById("transaction-detail-modal");
    if (transactionTable && transactionModal) {
        // ... (Paste all code from Section 12) ...
        const closeModalBtn = document.getElementById("close-txn-modal-btn");
        const cancelModalBtn = document.getElementById("cancel-txn-modal-btn");
        const modalDesc = document.getElementById("modal-txn-desc");
        const modalDate = document.getElementById("modal-txn-date");
        const modalType = document.getElementById("modal-txn-type");
        const modalAmount = document.getElementById("modal-txn-amount");

        const openTransactionModal = (e) => {
            const btn = e.target.closest(".btn-details");
            if (!btn) return;
            const data = btn.dataset;
            modalDesc.textContent = data.desc;
            modalDate.textContent = data.date;
            modalType.textContent = data.type;
            modalAmount.textContent = data.amount;
            modalAmount.style.color = data.amount.startsWith("-") ? "var(--danger-color)" : "var(--success-color)";
            transactionModal.classList.add("active");
        };
        const closeTransactionModal = () => transactionModal.classList.remove("active");
        transactionTable.addEventListener("click", openTransactionModal);
        closeModalBtn.addEventListener("click", closeTransactionModal);
        cancelModalBtn.addEventListener("click", closeTransactionModal);
    }

    // --- 16. USER MATCH HISTORY MODAL (for user_profile.html) ---
    const matchHistoryTable = document.getElementById("match-history-table");
    const matchDetailModal = document.getElementById("match-detail-modal");
    if (matchHistoryTable && matchDetailModal) {
        // ... (Paste all code from Section 16) ...
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
            modalGame.textContent = data.game;
            modalDate.textContent = `Date: ${data.date}`;
            modalLocation.textContent = data.location;
            modalStatus.textContent = data.role === 'Cancelled' ? 'Cancelled' : 'Completed';
            modalRolePill.textContent = data.role;
            modalRolePill.className = "status-pill";
            if (data.role === 'Joined') modalRolePill.classList.add('paid');
            else if (data.role === 'Hosted') modalRolePill.classList.add('hosted');
            else if (data.role === 'Cancelled') modalRolePill.classList.add('cancelled');
            matchDetailModal.classList.add("active");
        };
        const closeMatchModal = () => matchDetailModal.classList.remove("active");
        matchHistoryTable.addEventListener("click", openMatchModal);
        closeModalBtn.addEventListener("click", closeMatchModal);
        cancelModalBtn.addEventListener("click", closeMatchModal);
    }
}