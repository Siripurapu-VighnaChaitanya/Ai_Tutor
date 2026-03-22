# 🌌 AI Education Tutor: Midnight Aurora Edition

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind--CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Ollama](https://img.shields.io/badge/AI--Engine-Ollama-white?style=for-the-badge&logo=ollama)](https://ollama.com/)

A high-performance, visually stunning AI tutoring platform designed for the modern learner. Built with a "Midnight Aurora" aesthetic, this tool provides real-time, personalized education across multiple subjects with advanced AI vision and voice capabilities.

---

## ✨ Key Features

### 🎨 Premium Design System
- **Midnight Aurora Theme**: A deep, vibrant dark mode with animated mesh gradients.
- **Glassmorphism UI**: High-end frosted glass headers, message bubbles, and settings panels.
- **Fluid Animations**: Sophisticated transitions and skeleton loaders powered by **Framer Motion**.

### 🧠 Smart AI Tutoring
- **Multi-Subject Mastery**: Specialized tutor personas for Math, Science, English, and General knowledge.
- **AI Vision (OCR/Analysis)**: Upload textbook photos or handwritten notes for instant step-by-step solutions (powered by `moondream`).
- **Voice Interaction**: Hands-free learning with built-in Speech-to-Text and Text-to-Speech support.
- **Mathematical Precision**: **Centered LaTeX rendering** for complex formulas and scientific notation.

### 🛠️ Advanced Infrastructure
- **Offline-First Persistence**: Local storage caching for instant access to recent learning history.

---

## 🚀 Quick Setup

### 1. Prerequisites
- **Ollama**: Download from [ollama.com](https://ollama.com).
- **Models**: Pull the education and vision models:
  ```bash
  ollama pull tinyllama # For reasoning
  ollama pull moondream # For image analysis
  ```
- **Node.js** (v18+) & **Python** (v3.10+)

### 2. Backend Installation
```bash
cd backend
pip install -r requirements.txt
python main.py
```
> [!IMPORTANT]
> The backend now runs on **Port 8001** to prevent system conflicts.

### 3. Frontend Installation
```bash
cd frontend
npm install
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

---

## 📂 Project Structure

```text
├── backend/
│   ├── models/       # Database schemas (SQLite/SQLAlchemy)
│   ├── routers/      # API endpoints (Chat & Logic)
│   ├── services/     # AI integration & Context pruning
│   └── main.py       # FastAPI Entry Point (Port 8001)
├── frontend/
│   ├── src/
│   │   ├── components/ # Chat Interface & Message Bubbles
│   │   ├── context/    # Global State (ChatContext)
│   │   ├── pages/      # Home & Settings (Aura Themed)
│   │   └── App.jsx     # Navigation & Routing
└── README.md
```

---

## 💡 Usage Tips
- **Switch Tutors**: Use the dropdown in the chat header to change tutors instantly without leaving the conversation.
- **New Chat**: Tap the **"+" button** in the header to start a fresh learning session.
- **Vision Mode**: Use the Paperclip icon to upload problems. The AI will switch to "Analysis Mode" automatically.

---
*Created with ❤️ for Educational Transformation.*
