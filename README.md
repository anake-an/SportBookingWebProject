# ⚽ SportLink: Sports Facility Booking Platform

A web-based platform, built with **HTML, CSS, and vanilla JavaScript**, designed to connect sports players with facility owners. This project was developed as a group assignment for the **Technopreneurship course**.

Users (players) can search for and book sports facilities, or find teammates for a game. Facility Owners can log in to a separate dashboard to manage their court availability, set dynamic pricing, and promote their business. A Super Admin dashboard provides complete platform oversight.

---

## 💡 Project Overview
This application was created as a group project for the Technopreneurship course for the current semester.
It serves as a comprehensive **UI/UX prototype** for a two-sided marketplace, demonstrating a complete front-end user flow for all major features, including a live AI chatbot (powered by the Gemini API).

The next phase of this project is to develop the backend, connecting this front-end to **Firebase** (Authentication and Firestore) to create a fully functional web application.

---

## 🚀 Features

The platform is split into three distinct user roles:

### 👤 For Normal Users (Players)
- 🔐 **Authentication**: Full login and registration flow for players.
- 🏸 **Real-time Court Booking**: Search & filter by sport, date, location, and price.
- 📅 **Interactive Calendar**: Hour-by-hour grid to select available time slots.
- 🤝 **Player Matchmaking**: Post a match (set players needed, venue, time) or join existing matches.
- 💬 **Group Chat**: Dedicated chat page for each match to finalize details and track payments.
- 💳 **User Profile & Wallet**: Manage profile, see match history, wallet balance, and membership tiers.

### 🏟️ For Organizers (Facility Owners)
- 🔐 **Authentication**: Separate registration and login flow for facility owners.
- 📈 **Admin Dashboard**: Revenue, booking stats, and AI-powered suggestions.
- ⚙️ **Facility & Court Management**: Update info, rules, and add/edit/delete courts.
- 🗓️ **Availability Editor**: Clickable calendar to set prices and mark slots as "Available" or "Closed".
- 💸 **Paid Ad System**: Self-service ads with auto-calculated prices by duration.
- 📊 **Bookings & Wallet**: Track all bookings, revenue, and request payouts.

### 👑 For Super Admins (Site Owner)
- 🔑 **Secret Key Login**: Hidden login for platform administrators.
- ⚙️ **Platform Management**: A central dashboard to manage users, facilities, announcements, and platform-wide settings.
- 👥 **User Control**: Search, audit, ban, or verify all players and organizers.
- 🏟️ **Facility Control**: Approve new facilities, set commission rates, and override organizer settings.
- 💵 **Financial Audit**: Review all platform revenue and approve/reject organizer payout requests.
- 📣 **Global Announcements**: Post global announcements directly to the landing page slideshow.

### 🤖 AI-Powered Features
- **Site-Wide AI Chatbot**: Floating chatbot (Gemini API + Google Search) for booking FAQs.
- **AI Suggestions**: Dynamic pricing for owners and match recommendations for players.

---

## 🛠️ Built With
- **Front-End**: HTML5, CSS3 (Flexbox, Grid)
- **JavaScript**: Vanilla JavaScript (ES Modules)
- **AI (Live)**: Google Gemini API (`gemini-2.5-flash-preview-09-2025`)
- **Version Control**: Git & GitHub

---

## 📁 Project Structure
```
sportlink-project/
├── assets/
│ └── img/ # All images (logo, slides, features)
├── css/
│ └── style.css # Single stylesheet for the entire application
├── js/
│ ├── main.js # Main module loader
│ ├── admin.js # Logic for Super Admin pages
│ ├── auth.js # Login, logout, and registration logic
│ ├── chat.js # Site-wide AI chatbot logic
│ ├── modals.js # All modal popup logic
│ ├── navigation.js # Mobile menu & sidebar logic
│ ├── organizer.js # Logic for Organizer pages
│ ├── player.js # Logic for Player pages
│ ├── slideshows.js # All slideshow logic
│ └── tabs.js # All tab-switching logic
├── index.html # Landing page
├── login.html
├── register.html # Main registration portal
├── register_player.html # Player registration form
├── register_organizer.html # Organizer registration form
├── about.html
├── legal.html
├── support.html
├── user_dashboard.html
├── booking.html
├── facility_detail.html
├── matchmaking.html
├── group_chat.html
├── user_profile.html
├── organizer_dashboard.html
├── organizer_calendar.html
├── organizer_bookings.html
├── organizer_ads.html
├── organizer_wallet.html
├── organizer_settings.html
├── admin_super.html
├── admin_users.html
├── admin_facilities.html
├── admin_announcements.html
├── admin_finance.html
├── admin_platform.html
├── .gitignore
└── README.md
```
---

## ▶️ How to Run

### Live Demo
You can view a demo hosted on **GitHub Pages**:
👉 [https://anake-an.github.io//SportBookingWebProject/](https://anake-an.github.io//SportBookingWebProject/)

### Run Locally (Required)
Because this project uses JavaScript **ES Modules** (`type="module"`), it **will not run if you open the `index.html` file directly** from your computer (`file:///...`).

You must run it from a local server. The easiest way is with the **Live Server** extension in VS Code.

1.  In VS Code, install the "Live Server" extension (by Ritwick Dey).
2.  Right-click on `index.html` in the file explorer.
3.  Select **"Open with Live Server"**.
4.  The project will open in your browser at `http://127.0.0.1:5500`.

### 🔑 Access Credentials

Use the following to test all user roles:
* **Player:** Use any email/password and click "Login as Player".
* **Organizer:** Use any email/password and click "Login as Organizer".
* **Super Admin:** Use the secret key credentials below and click *either* login button:
    * **Email:** `admin@sportlink.com`
    * **Password:** `SUPERADMIN2025`

---

## 👥 Contributors  

This project is being developed as a **group assignment** for the Technopreneurship course:

| Name                               | Student ID   |
|------------------------------------|--------------|
| Aniq Najmuddin bin Sharifuddin     | BI23110059   |
| Muhammad Shahrul Bin Subri         | BI23160428   |
| Muhammad Saifullah Bin Rosman      | BI23160424   |
| Clement Tan Kai Hsueh              | BI23110244   |
| Muhammad Isyraf Ahnaf bin Mohd Zamri | BI23160423 |
| Muhammad Faris bin Huzaimi         | BI23160430   |
