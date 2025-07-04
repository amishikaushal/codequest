# 🧠 CodeQuest – DSA Learning Platform

**CodeQuest** is a full-stack educational platform designed to help learners master **Data Structures & Algorithms (DSA)** through a structured, interactive, and gamified experience.

With **500+ curated coding problems**, performance tracking, flashcards, and mentorship features, CodeQuest keeps learners consistent, confident, and job-ready.

---

## ✨ Features

- ✅ **500+ Structured DSA Questions** categorized by difficulty  
- 📌 **Manual Progress Tracker** with checkbox UI  
- 📅 **Daily Coding Challenge Calendar** (rotates every day)  
- ⚡ **Live Performance Tracking** with animated pie charts  
- 🧠 **100+ One-Line FAQ Flashcards** for rapid DSA revision  
- 🧾 **Practice Cards** covering edge cases & tricky concepts  
- 🔐 **Supabase Auth** with email verification support  
- 👥 **Mentorship Portal** for career guidance & mock interviews  

---

## 🛠️ Tech Stack

| Layer     | Technology                            |
|-----------|----------------------------------------|
| Frontend  | React, JavaScript, HTML, CSS           |
| Backend   | Node.js, Express                       |
| Database  | MongoDB                                |
| Auth      | Supabase Authentication                |
| Tooling   | Vite, CSS Animations, Supabase         |

---

## 📁 Project Structure

codequest/
├── amishi/ # Frontend (React + Vite)
│ ├── public/
│ └── src/
│ ├── assets/ # Images, icons, logos
│ ├── components/ # Reusable UI elements
│ ├── pages/ # Flashcards, Challenges, Auth pages
│ ├── styles/ # CSS files
│ ├── utils/ # Helper functions
│ ├── App.jsx
│ └── main.jsx
├── backend/ # Backend (Node.js + Express + MongoDB)
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ └── server.js # Backend entry point
├── .env
├── .gitignore
├── README.md # Project overview
└── vite.config.js



---

## 🚀 Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/amishikaushal/codequest.git
cd codequest

2. Set Up the Frontend

```bash
cd amishi
npm install
npm run dev

```bash

Frontend runs on: http://localhost:5173 (or your default Vite port)

3. Set Up the Backend

```bash

cd ../backend
npm install
node server.js

```bash


Backend runs on: http://localhost:5000



🚧 Deployment
Note: This project is not yet deployed.
For a demonstration or walkthrough, please refer to the GitHub repository or contact me.

📬 Contact
Made with ❤️ by Amishi Kaushal
📧 Reach me via LinkedIn or GitHub Discussions.