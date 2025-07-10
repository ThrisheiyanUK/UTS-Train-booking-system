# 🚆 Train Booking System (UTS Clone)

A complete **Train Ticket Booking System** inspired by the Indian Railway's UTS portal. Built using **Node.js**, **Express**, and **MongoDB** for the backend, and **HTML/CSS/JavaScript** for the frontend. This system supports user registration, login, train and platform ticket booking, cancellation, and viewing booking history.

---

## 🌟 Features

- 🧑‍💼 **User Registration and Login**
- 🎟️ **Train Ticket Booking**
- 🧾 **Platform Ticket Booking**
- 📜 **Booking History Display**
- ❌ **Ticket Cancellation**
- 🕓 **Live Clock and Real-Time UI**
- 🔐 **Session-based Login Handling**
- 📁 **MongoDB database with Mongoose**
- 💡 Lightweight frontend using vanilla JS, jQuery, and CSS

---

## 🛠️ Tech Stack

| Layer        | Tech                         |
|--------------|------------------------------|
| Backend      | Node.js, Express.js, Mongoose |
| Database     | MongoDB                      |
| Frontend     | HTML, CSS, JavaScript, jQuery, AngularJS (light usage) |
| Others       | Body-parser, Cookie-parser, File system (x.txt/y.txt/z.txt caching) |

---

## 📁 Project Structure

project/
│
├── project1.js         # Express.js backend server
├── project.js          # Frontend JS (validation, AJAX calls, booking UI)
├── project.css         # Stylesheet
├── *.html              # HTML views (login, register, home, ticket pages)
├── x.txt, y.txt, z.txt # Session and ticket cache files
├── n.txt               # Simple login/session flag
├── .gitignore          # Git ignore file (optional)
└── README.md           # Project description

## 🚀 How to Run the Project Locally

### 🔧 Prerequisites

Make sure you have the following installed:

- ✅ [Node.js](https://nodejs.org/) (v16+ recommended)
- ✅ [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local server)
- ✅ A modern browser (Chrome, Edge, etc.)

---

### 🛠️ Setup Instructions

# 1. Clone the repository or navigate to your project folder
git clone https://github.com/<your-username>/train-booking-system.git
cd train-booking-system

# 2. Install Node.js dependencies
npm install

# 3. Start MongoDB server (if not already running)
mongod

# 4. Run the Express server
node project1.js
