from .github import *
from .scoring import *
from .model import analyze_with_gemini


def analyze_github_profile(url, role=None, experience=None, skills=None):

    username = extract_username_from_url(url)

    profile = get_user_profile(username)
    repos = get_user_repos(username)

    activity_score = calculate_activity_score(repos)
    quality_score = calculate_repo_quality_score(repos)
    diversity_score = calculate_diversity_score(repos)

    overall_score = calculate_overall_score(
        activity_score,
        quality_score,
        diversity_score
    )

    # Extract languages
    repo_languages = set()
    for repo in repos:
        lang = repo.get("language")
        if lang:
            repo_languages.add(lang)

    recruiter_skills = skills.split(",") if skills else []

    skill_match = []
    for skill in recruiter_skills:
        skill = skill.strip()
        score = 85 if skill in repo_languages else 40
        skill_match.append({
            "skill": skill,
            "score": score
        })

    ai_text = analyze_with_gemini(profile, repos[:5], role, experience, skills)

    strengths = []
    weaknesses = []
    risk_flags = []

    for line in ai_text.split("\n"):
        line = line.strip()
        if not line:
            continue

        if "strength" in line.lower():
            strengths.append(line)

        if "red flag" in line.lower():
            weaknesses.append(line)
            risk_flags.append(line)

    # GUARANTEED FALLBACKS
    if len(strengths) == 0:
        strengths = ["Active GitHub profile", "Multiple projects available"]

    if len(weaknesses) == 0:
        weaknesses = ["No critical issues detected"]

    if len(risk_flags) == 0:
        risk_flags = ["Low open-source collaboration"]

    if overall_score >= 7:
        recommendation = "Strong Fit"
    elif overall_score >= 5:
        recommendation = "Moderate Fit"
    else:
        recommendation = "Not Recommended"

    return {
        "username": username,
        "avatar_url": profile.get("avatar_url"),
        "github_score": overall_score,
        "activity_score": activity_score,
        "quality_score": quality_score,
        "diversity_score": diversity_score,
        "hire_recommendation": recommendation,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "risk_flags": risk_flags,
        "final_verdict": ai_text[:700],
        "skill_match": skill_match
    }
