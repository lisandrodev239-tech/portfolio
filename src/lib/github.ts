import { getProjects } from "./projects";

export const githubConfig = {
  username: "lisandrodev239-tech",
  selectedRepos: [
    "dashboard-restaurant",
    "landing-clinica",
  ],
};

export async function getGithubRepos() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return [];
  }

  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    return [];
  }

  const repos = await response.json();

  return repos.map((repo: any) => ({
    name: repo.name,
    description: repo.description || "",
    url: repo.html_url,
    stars: repo.stargazers_count,
    language: repo.language,
    updated: repo.updated_at,
    homepage: repo.homepage,
  }));
}