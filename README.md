# AI Education Tutor for Remote India

A fast, scalable, mobile-first AI tutoring platform designed for low-bandwidth and offline-first environments.

## Features
- **Modern Chat Interface**: Adaptive, mobile-friendly design.
- **Context Pruning**: Automatically summarizes long conversations to save tokens and bandwidth.
- **Offline-First**: Caches recent conversations in `localStorage`.
- **Multilingual Support**: English and Hindi toggle with subject-aware prompt engineering.
- **Low-Bandwidth Optimized**: Gzip compression and efficient JSON payloads.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion.
- **Backend**: FastAPI (Python), SQLAlchemy, SQLite.
- **AI Engine**: Local LLM via Ollama (Mistral/LLaMA 3).

## Prerequisites
1. **Ollama**: Install from [ollama.com](https://ollama.com).
2. **Model**: Pull the model you want to use:
   ```bash
   ollama pull mistral
   ```
3. **Python 3.10+**
4. **Node.js 18+**

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The app will be available at `http://localhost:5173`.

## Deployment
- **Frontend**: Deploy to Netlify or Vercel (Free tier).
- **Backend**: Deploy to Render or Fly.io (Free tier). Configure SQLite volume or use a free PostgreSQL tier.
- **Local**: Use Docker or run both services locally as shown above.

## AI integration (Ollama)
The system connects to `http://localhost:11434` by default. Ensure Ollama is running before starting the chat.
