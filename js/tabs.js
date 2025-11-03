// js/tabs.js
// Handles all tabbed interfaces (e.g., user_profile, organizer_settings)

export function initTabs() {
    // --- 4. TAB SWITCHING ---
    const tabContainers = document.querySelectorAll(".tabs");
    tabContainers.forEach(tabContainer => {
        const tabLinks = tabContainer.querySelectorAll(".tab-link");
        let tabContentWrapper = tabContainer.nextElementSibling;
        
        // Find the correct tab content wrapper, skipping other elements
        while (tabContentWrapper && !tabContentWrapper.querySelector(".tab-content")) {
            tabContentWrapper = tabContentWrapper.nextElementSibling;
        }
        if (!tabContentWrapper) return;
        
        const tabContents = tabContentWrapper.querySelectorAll(".tab-content");

        // Set initial active tab
        const activeTab = tabContainer.querySelector(".tab-link.active");
        if (activeTab) {
            const activeTabId = activeTab.dataset.tab;
            const activeContent = tabContentWrapper.querySelector(`#${activeTabId}`);
            if (activeContent) activeContent.classList.add("active");
        } else {
            // Default to first tab if none are active
            if (tabLinks[0]) tabLinks[0].classList.add("active");
            if (tabContents[0]) tabContents[0].classList.add("active");
        }

        // Add click listener
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
}