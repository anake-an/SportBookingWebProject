// js/navigation.js
// Handles all site-wide navigation (hamburger menus, sidebars)

export function initNavigation() {
    // --- 9. MOBILE HAMBURGER MENU (Site-wide) ---
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileNavMenu = document.getElementById("mobile-nav-menu");
    const organizerSidebar = document.getElementById("organizer-sidebar");
    const adminSidebar = document.getElementById("admin-sidebar");
    const closeSidebarBtn = document.getElementById("close-sidebar-btn");

    if (hamburgerBtn) {
        // CASE 1: This is a user/landing page with the mobile dropdown menu
        if (mobileNavMenu) {
            hamburgerBtn.addEventListener("click", () => {
                mobileNavMenu.classList.toggle("active");
            });
        }
        // CASE 2: This is an organizer or admin page with the slide-in sidebar
        else if (organizerSidebar || adminSidebar) {
            const activeSidebar = organizerSidebar ? organizerSidebar : adminSidebar;
            
            // Hamburger button OPENS the sidebar
            if (activeSidebar) {
                hamburgerBtn.addEventListener("click", () => {
                    activeSidebar.classList.add("active");
                });
            }

            // Close button CLOSES the sidebar
            if (closeSidebarBtn && activeSidebar) {
                closeSidebarBtn.addEventListener("click", () => {
                    activeSidebar.classList.remove("active");
                });
            }
        }
    }
}