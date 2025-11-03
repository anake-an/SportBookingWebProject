// js/auth.js
// Handles all authentication logic (login/logout)

export function initAuth() {

    // --- 1. SIGN-OUT LOGIC ---
    const signOutBtns = document.querySelectorAll('#sign-out-btn, #sign-out-btn-mobile, #sign-out-btn-organizer, #sign-out-btn-admin');
    const handleSignOut = (e) => {
        e.preventDefault();
        console.log("Signing out...");
        window.location.href = 'login.html';
    };
    signOutBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', handleSignOut);
    });

    // --- 21. LOGIN LOGIC ---
    const loginForm = document.querySelector('.login-form');
    // Only run login logic on the login page
    if (loginForm && window.location.pathname.includes('login.html')) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('click', (e) => {
            if (!e.target.classList.contains('login-action-btn')) return;
            e.preventDefault();
            
            if (!emailInput || !passwordInput) {
                console.error("Login form inputs (email/password) not found.");
                return;
            }

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const clickedBtnId = e.target.id;

            // 1. Secret Key Check (Super Admin)
            if (email === 'admin@sportlink.com' && password === 'SUPERADMIN2025') {
                window.location.href = 'admin_super.html';
                return;
            }

            // 2. Standard Redirection
            if (clickedBtnId === 'login-player-btn') {
                window.location.href = 'user_dashboard.html';
            } else if (clickedBtnId === 'login-organizer-btn') {
                window.location.href = 'organizer_dashboard.html';
            }
        });
    }
}