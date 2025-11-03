/* ---
   SportLink main.js (v22 - Modular Loader)
   Imports and initializes all app modules.
--- */

// Import all initialization functions from their modules
import { initAuth } from './auth.js';
import { initNavigation } from './navigation.js';
import { initTabs } from './tabs.js';
import { initSlideshows } from './slideshows.js';
import { initModals } from './modals.js';
import { initChatbot } from './chat.js';
import { initAdminLogic } from './admin.js';
import { initOrganizerLogic } from './organizer.js';
import { initPlayerLogic } from './player.js';

// This is the only DOMContentLoaded listener in your entire project
document.addEventListener("DOMContentLoaded", function () {
    
    // Run all your init functions
    initAuth();
    initNavigation();
    initTabs();
    initSlideshows();
    initModals();
    initChatbot();
    initAdminLogic();
    initOrganizerLogic();
    initPlayerLogic();
    
    console.log("All SportLink modules loaded successfully!");
});