// js/admin.js
// Handles all Super Admin dashboard logic

export function initAdminLogic() {

    // --- 17 & 18. GENERIC TABLE FILTERING ---
    function initSearchableTable(tableId, searchInputId) {
        const searchInput = document.getElementById(searchInputId);
        const table = document.getElementById(tableId);
        if (!searchInput || !table) return;

        const rows = table.querySelectorAll('tbody tr');

        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            rows.forEach(row => {
                let textContent = row.textContent.toLowerCase();
                if (textContent.includes(filter)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
    // Initialize all admin/organizer tables
    initSearchableTable('facility-table', 'search-facility');
    initSearchableTable('users-table', 'search-user');
    initSearchableTable('bookings-table', 'search-bookings');

    // --- 19. ADMIN PLATFORM SETTINGS LOGIC ---
    const maintenanceSelect = document.getElementById('maintenance-mode-select');
    const systemStatusDisplay = document.querySelector('#system .card h3 + p');
    if (maintenanceSelect && systemStatusDisplay) {
        maintenanceSelect.addEventListener('change', function () {
            const status = this.value;
            let statusText = 'Operational';
            let statusColor = 'var(--success-color)';
            if (status === 'maintenance') {
                statusText = 'MAINTENANCE MODE';
                statusColor = 'var(--warning-color)';
            } else if (status === 'emergency') {
                statusText = 'EMERGENCY SHUTDOWN';
                statusColor = 'var(--danger-color)';
            }
            systemStatusDisplay.textContent = statusText;
            systemStatusDisplay.style.color = statusColor;
            console.log(`[ADMIN ACTION] Site status set to: ${statusText}`);
        });
    }

    // --- 20. ADMIN FINANCIAL AUDIT LOGIC ---
    const payoutQueueTable = document.getElementById('payout-queue-table');
    if (payoutQueueTable) {
        payoutQueueTable.addEventListener('click', function (e) {
            const targetButton = e.target.closest('button');
            if (!targetButton) return;
            const row = targetButton.closest('tr');
            if (!row) return;
            const organizerName = row.querySelector('td strong').textContent;

            if (targetButton.textContent.includes('Approve')) {
                alert(`SUCCESS: Payout for ${organizerName} approved and processed.`);
                row.style.display = 'none';
            } else if (targetButton.textContent.includes('Reject')) {
                if (confirm(`Are you sure you want to reject the payout for ${organizerName}?`)) {
                    alert(`Payout for ${organizerName} rejected.`);
                    row.classList.remove('status-pending');
                    row.classList.add('status-cancelled');
                    row.querySelector('td:nth-child(3)').textContent = 'Rejected';
                }
            }
        });
    }

    // --- 22. ADMIN ANNOUNCEMENT PUBLISH ---
    const publishBtn = document.querySelector('body.organizer-layout main.organizer-content form.login-form button.btn-primary');
    if (publishBtn && window.location.pathname.includes('admin_announcements.html')) {
        const form = publishBtn.closest('form');
        const activeListContainer = document.querySelector('section .card .ad-list-item')?.parentElement;

        publishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const headline = document.getElementById('slide-headline').value;
            const subtext = document.getElementById('slide-text').value;
            const endDate = document.getElementById('slide-end-date').value;

            if (!headline || !subtext) {
                alert("Please fill in at least the Headline and Sub-text.");
                return;
            }
            alert("Announcement published successfully!");

            const newItem = document.createElement('div');
            newItem.className = 'ad-list-item';
            newItem.innerHTML = `
                <div>
                    <strong>${headline}</strong>
                    <p>Status: ${endDate ? 'Scheduled' : 'Active (No End Date)'}</p>
                </div>
                <span class="status-pill ${endDate ? 'paid' : 'pending'}">${endDate ? 'Scheduled' : 'Active'}</span>
            `;
            if (activeListContainer) {
                activeListContainer.prepend(newItem);
            }
            form.reset();
        });
    }
}