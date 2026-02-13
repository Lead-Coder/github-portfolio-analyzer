from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_with_gemini(profile, repos, role, experience, skills):

    prompt = f"""
You are a senior technical recruiter.

Job Role: {role}
Experience: {experience}
Required Skills: {skills}

Analyze candidate GitHub profile.

Return strengths, red flags, and final verdict.

Profile:
{profile}

Repositories:
{repos}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    return response.text

def generate_feedback(username, repo_summary):
    prompt = f"""
You are analyzing a student's GitHub profile.

Return ONLY valid JSON in this format:

{{
 "strengths": ["..."],
 "weaknesses": ["..."],
 "risk_flags": ["..."],
 "final_verdict": "string",
 "hire_recommendation": "Recommended / Consider / Not Recommended"
}}

GitHub Username: {username}
Repo Summary:
{repo_summary}
"""

    response = model.generate_content(prompt)
    return response.text
