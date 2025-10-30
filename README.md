# ⚽ SportLink: Sports Facility Booking Platform

A web-based platform, built with **HTML, CSS, and vanilla JavaScript**, designed to connect sports players with facility owners. This project was developed as a group assignment for the **Technopreneurship course**.

Users (players) can search for and book sports facilities, or find teammates for a game. Facility Owners can log in to a separate dashboard to manage their court availability, set dynamic pricing, and promote their business through a paid, self-service ad system.

---

## 💡 Project Overview
This application was created as a group project for the Technopreneurship course for the current semester.  
It serves as a comprehensive **UI/UX prototype** for a two-sided marketplace, demonstrating a complete front-end user flow for all major features, including a live AI chatbot (powered by the Gemini API).

The next phase of this project is to develop the backend, connecting this front-end to **Firebase** (Authentication and Firestore) to create a fully functional web application.

---

## 🚀 Features

### 👤 For Normal Users (Players)
- 🔐 **Authentication**: Full login and registration flow.  
- 🏸 **Real-time Court Booking**: Search & filter by sport, date, location, and price.  
- 📅 **Interactive Calendar**: Hour-by-hour grid (Green = available, Yellow = limited, Red = full).  
- 🤝 **Player Matchmaking**: Post a match (set players needed, venue, time) or join existing matches.  
- 💬 **Group Chat**: Dedicated chat page for each match to finalize details and track payments.  
- 💳 **User Profile & Wallet**: Manage profile, see match history, wallet balance, membership tiers.  

### 🏟️ For Organizers (Facility Owners)
- 📈 **Admin Dashboard**: Revenue, booking stats, AI-powered suggestions.  
- ⚙️ **Facility & Court Management**: Update info, rules, add/edit/delete courts.  
- 🗓️ **Availability Editor**: Clickable calendar to set prices and mark slots as "Available" or "Closed."  
- 💸 **Paid Ad System**: Self-service ads with auto-calculated prices by duration.  
- 📊 **Bookings & Wallet**: Track bookings, revenue, and payouts.  

### 🤖 AI-Powered Features
- **Site-Wide AI Chatbot**: Floating chatbot (Gemini API + Google Search) for booking FAQs.  
- **AI Suggestions**: Dynamic pricing for owners and match recommendations for players.  

---

## 🛠️ Built With
- **Front-End**: HTML5, CSS3 (Flexbox, Grid), Vanilla JavaScript (ES6+)  
- **AI (Live)**: Google Gemini API (`gemini-2.5-flash-preview-09-2025`)  
- **Design**: Figma  
- **Version Control**: Git & GitHub  
- **Hosting**: GitHub Pages  

---

## 📁 Project Structure
```
sportlink-project/
├── assets/
│ └── img/ # All images (logo, slides, features)
├── css/
│ └── style.css # Stylesheet
├── js/
│ ├── main.js # Core site JS
│ └── firebase-init.js # Firebase config (keys ignored)
│
├── index.html # Landing page
├── login.html
├── register.html
│
├── user_dashboard.html # Player dashboard
├── booking.html
├── facility_detail.html
├── matchmaking.html
├── post_match.html
├── group_chat.html
├── user_profile.html
│
├── organizer_dashboard.html
├── organizer_calendar.html
├── organizer_bookings.html
├── organizer_ads.html
├── organizer_wallet.html
├── organizer_settings.html
│
├── .gitignore
├── LICENSE
└── README.md
```
---

## ▶️ How to Run
### Live Demo  
You can view a demo hosted on **GitHub Pages**:  
👉 [https://anake-an.github.io//SportBookingWebProject/](https://anake-an.github.io//SportBookingWebProject/)  

### Run Locally
```bash
git clone https://github.com/YOUR_USERNAME/sportlink-project.git
cd sportlink-project
```
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
