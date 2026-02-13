from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json

from app.services.github import (
    extract_username_from_url,
    get_user_profile,
    get_user_repos
)

from app.services.scoring import (
    calculate_repo_quality_score,
    calculate_activity_score,
    calculate_github_score
)

from app.services.model import generate_feedback

# --------------------------------------------------
# APP SETUP
# --------------------------------------------------

app = FastAPI(title="Student GitHub Portfolio Analyzer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# REQUEST MODEL (LOCAL)
# --------------------------------------------------

class GitHubProfileRequest(BaseModel):
    github_url: str

# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():
    return {"status": "Student GitHub Analyzer Running"}

# --------------------------------------------------
# ANALYZE ENDPOINT
# --------------------------------------------------

@app.post("/analyze")
def analyze_github_profile(request: GitHubProfileRequest):

    # -----------------------------
    # Extract Username
    # -----------------------------
    try:
        username = extract_username_from_url(request.github_url)
    except:
        raise HTTPException(status_code=400, detail="Invalid GitHub URL")

    # -----------------------------
    # Fetch GitHub Data
    # -----------------------------
    user_data = get_user_profile(username)

    if "message" in user_data:
        raise HTTPException(status_code=404, detail="GitHub user not found")

    repos = get_user_repos(username)

    if not isinstance(repos, list):
        raise HTTPException(status_code=500, detail="Error fetching repositories")

    # -----------------------------
    # Manual Scoring
    # -----------------------------
    repo_metrics = calculate_repo_quality_score(repos)

    activity_score = calculate_activity_score(repos)
    quality_score = repo_metrics["readme_score"]
    diversity_score = repo_metrics["diversity_score"]

    github_score = calculate_github_score(
        quality_score,
        activity_score,
        diversity_score
    )

    # -----------------------------
    # Prepare Summary for Gemini
    # -----------------------------
    repo_summary = f"""
Total repositories: {len(repos)}
Total stars: {repo_metrics['stars']}
Total forks: {repo_metrics['forks']}
Languages used: {repo_metrics['languages']}
Activity score: {activity_score}
Quality score: {quality_score}
Diversity score: {diversity_score}
"""

    # -----------------------------
    # Gemini AI Analysis
    # -----------------------------
    raw_ai = generate_feedback(username, repo_summary)

    try:
        ai_data = json.loads(raw_ai)
    except:
        ai_data = {
            "strengths": [],
            "weaknesses": [],
            "risk_flags": [],
            "final_verdict": raw_ai,
            "hire_recommendation": "Unknown"
        }

    # -----------------------------
    # Safety Defaults
    # -----------------------------
    strengths = ai_data.get("strengths", [])
    weaknesses = ai_data.get("weaknesses", [])
    risk_flags = ai_data.get("risk_flags", [])
    final_verdict = ai_data.get("final_verdict", "")
    hire_recommendation = ai_data.get("hire_recommendation", "Unknown")

    if not isinstance(strengths, list): strengths = []
    if not isinstance(weaknesses, list): weaknesses = []
    if not isinstance(risk_flags, list): risk_flags = []

    # -----------------------------
    # Final Response
    # -----------------------------
    return {
        "username": username,
        "avatar_url": user_data.get("avatar_url"),
        "github_score": round(github_score, 2),
        "activity_score": round(activity_score, 2),
        "quality_score": round(quality_score, 2),
        "diversity_score": round(diversity_score, 2),
        "hire_recommendation": hire_recommendation,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "risk_flags": risk_flags,
        "final_verdict": final_verdict,
        "skill_match": []
    }
