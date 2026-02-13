from collections import Counter
from datetime import datetime

def calculate_activity_score(repos):
    total_commits = 0
    for repo in repos:
        total_commits += repo.get("stargazers_count", 0)

    return min(total_commits / 50, 10)

def calculate_repo_quality_score(repos):
    score = 0

    for repo in repos:
        if repo.get("description"):
            score += 1
        if repo.get("language"):
            score += 1
        if repo.get("stargazers_count", 0) > 0:
            score += 1
        if repo.get("forks_count", 0) > 0:
            score += 1

    return min(score / len(repos) if repos else 0, 10)

def calculate_diversity_score(repos):
    languages = [repo.get("language") for repo in repos if repo.get("language")]
    unique_languages = len(set(languages))
    return min(unique_languages * 1.5, 10)

def calculate_overall_score(activity, quality, diversity):
    return round((activity + quality + diversity) / 3, 2)
