# 🚀 GitHub Portfolio Analyzer & Enhancer

An AI-powered full-stack web application that analyzes a developer’s GitHub profile from a **recruiter’s perspective** and provides deep insights into code quality, activity, technical depth, skill match, strengths, weaknesses, and hiring recommendation.

This platform helps recruiters make faster, data-driven screening decisions and helps developers understand how their GitHub portfolio appears to hiring teams.

---

## 📌 Features

### 🔍 GitHub Profile Analysis
- Fetches public GitHub profile and repositories using GitHub API  
- Calculates:
  - Activity Score  
  - Code Quality Score  
  - Diversity Score  
  - Overall GitHub Score  

### 🤖 AI Recruiter Insights (Gemini)
- Strengths of the candidate  
- Weaknesses / Red Flags  
- Final verdict and hiring recommendation  

### 🧠 Skill Matching
- Recruiter provides required skills  
- Backend matches them with repository languages  
- Visualized as percentage-based bar chart  

### 📊 Recruiter Dashboard
- Clean and modern UI  
- Interactive charts  
- Profile overview  
- Structured evaluation sections  

### 🔐 Secure Architecture
- API keys stored using environment variables  
- Backend handles all external API calls  

---

## 🖥️ Tech Stack

### Frontend
- React (TypeScript)  
- Tailwind CSS  
- Recharts  
- Lucide Icons  

### Backend
- FastAPI (Python)  
- GitHub REST API  
- Google Gemini API (`google-genai`)  


## 🏗️ System Architecture


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/github-portfolio-analyzer.git
cd github-portfolio-analyzer

cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt

## Frontend Setup:

cd frontend
npm install
npm run dev


---

## 🎥 Demo Video

👉 Add your demo video link here:  
**Video Link:** https://drive.google.com/file/d/1b1g2osQ7lWGtvmZU_613SyfVy5wdS3SJ/view?usp=sharing 

---
