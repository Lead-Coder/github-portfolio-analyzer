import requests
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}"
}

def extract_username_from_url(url: str):
    return url.rstrip("/").split("/")[-1]

def get_user_profile(username: str):
    url = f"https://api.github.com/users/{username}"
    return requests.get(url, headers=headers).json()

def get_user_repos(username: str):
    url = f"https://api.github.com/users/{username}/repos?per_page=100"
    response = requests.get(url, headers=headers)

    data = response.json()

    if isinstance(data, dict) and "message" in data:
        raise Exception(f"GitHub API Error: {data['message']}")

    return data


def get_repo_commits(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/commits?per_page=100"
    return requests.get(url, headers=headers).json()

def get_pull_requests(owner: str, repo: str):
    url = f"https://api.github.com/repos/{owner}/{repo}/pulls?state=all"
    return requests.get(url, headers=headers).json()
