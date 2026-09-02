# Mohamed Umar F - Full-Stack Portfolio

A state-of-the-art, high-performance full-stack portfolio web application for **Mohamed Umar F** (Software Developer & B.Tech CSBS Graduate), featuring AI integration, an interactive ATS resume compatibility engine, and clean separation between **Frontend** and **Backend**.

---

## 📁 Project Architecture

```
portfolio/
├── backend/                        # Node.js & Express REST API Server
│   ├── data/
│   │   ├── profile.json            # Resume data & portfolio profile details
│   │   └── messages.json           # Contact submissions storage
│   ├── routes/
│   │   ├── profile.js              # GET /api/profile
│   │   ├── contact.js              # POST /api/contact
│   │   ├── ats.js                  # POST /api/ats-match/match & GET /api/ats-match/samples
│   │   └── chat.js                 # POST /api/chat (Interactive AI Portfolio Assistant)
│   ├── server.js                   # Express server entry point (Port 5000)
│   ├── .env                        # PORT=5000, CLIENT_ORIGIN=http://localhost:5173
│   ├── .env.example
│   └── package.json
│
└── frontend/                       # Vite + React + Vanilla CSS Modern UI
    ├── public/
    │   └── mohamed-umar.jpg        # Profile photo of Mohamed Umar
    ├── src/
    │   ├── assets/
    │   │   └── mohamed-umar.jpg    # Asset image
    │   ├── components/
    │   │   ├── Navbar.jsx          # Glassmorphic navbar with smooth scroll spy
    │   │   ├── Hero.jsx            # Profile photo, glowing badge, dynamic typing text
    │   │   ├── About.jsx           # B.Tech CSBS (CGPA: 7.4), summary & metrics
    │   │   ├── Skills.jsx          # Interactive categorized technical skill bars
    │   │   ├── Projects.jsx        # Smart Apply India flagship & cloud projects
    │   │   ├── AtsMatcher.jsx      # Live ATS keyword & compatibility simulator
    │   │   ├── Timeline.jsx        # Sunteck internship & education timeline
    │   │   ├── Certifications.jsx  # AWS Cloud, Data Engineering, Google AI-ML
    │   │   ├── Contact.jsx         # Contact form connected to /api/contact + direct links
    │   │   ├── ChatBot.jsx         # Interactive "Ask Mohamed's AI" assistant
    │   │   └── Footer.jsx          # Modern footer with quick links
    │   ├── services/
    │   │   └── api.js              # Centralized API service using VITE_API_BASE_URL
    │   ├── styles/
    │   │   └── index.css           # Premium cyber-luxe dark design system
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                        # VITE_API_BASE_URL=http://localhost:5000/api
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚡ Quick Start Guide

### 1. Start the Backend API Server
```bash
cd backend
npm install
npm start
```
- API server runs at: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

### 2. Start the Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
- Frontend application runs at: `http://localhost:5173`

---

## 🌐 Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

# Admin Security Credentials
ADMIN_USER_ID=admin
ADMIN_PASSWORD=mohamed@umar2026
ADMIN_SECRET_TOKEN=portfolio_umar_admin_secure_token_2026
```

---

## 🔐 Admin Portal & Dashboard

An interactive and secure Administrator Portal is included to manage incoming inquiries and customize portfolio profile content in real time.

- **How to Access:** Click the **Admin** button in the top navigation bar or the **Admin Login** link in the footer.
- **Default Credentials:**
  - **User ID:** `admin`
  - **Password:** `mohamed@umar2026`
- **Admin Dashboard Features:**
  - **📬 Messages Inbox:** View, search, filter, delete, and reply to contact form inquiries received from visitors/recruiters.
  - **✏️ Live Profile Editor:** Edit headline, summary, contact details, and certifications on the fly with live saving to backend JSON.
  - **📊 System Analytics:** Live backend server uptime, message counters, and operational health metrics.

---

## 🚀 Key Features

- 📸 **High-Resolution Photo Integration**: Embedded directly in the Hero section with dynamic backlighting.
- ⚡ **Flagship Project (Smart Apply India)**: Highlights Flutter, Supabase, Firebase, Groq API, and Syncfusion PDF.
- 🎯 **Live ATS Resume Compatibility Matcher**: Recruiters can test any job description against Mohamed Umar's resume in real time.
- 🤖 **Interactive AI Portfolio Assistant**: Floating assistant that answers questions about Mohamed's education (CGPA 7.4), technical skills, certifications, and projects.
- 📬 **Live Contact System**: Connects to the Express backend to persist messages and trigger interactive toast / confetti feedback.
- 📜 **Complete Credentials**: AWS Academy Cloud Architecting, AWS Data Engineering, Python, and Google AI-ML Workshop.
