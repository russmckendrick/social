import { useState, useEffect } from 'react';
import { siteConfig } from '../config';

export type Repo = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

export type GitHubProfile = {
  followers: number;
  public_repos: number;
  created_at: string;
};

interface GitHubRestRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

const API = 'https://api.github.com';

// From the most recently pushed repos, feature the most-starred one plus the
// latest one that isn't it, so the tile shows both "popular" and "active".
const pickFeatured = (repos: Repo[]): Repo[] => {
  const recent = repos.slice(0, 10);
  if (recent.length === 0) {
    return [];
  }

  const popular = [...recent].sort((a, b) => b.stars - a.stars)[0];
  const latest = recent.find((repo) => repo.name !== popular.name);

  return latest ? [popular, latest] : [popular];
};

export const useGitHub = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const { username, excludeRepos } = siteConfig.github;

    const fetchData = async () => {
      const [profileResult, reposResult] = await Promise.allSettled([
        fetch(`${API}/users/${username}`).then((res) => (res.ok ? res.json() : null)),
        fetch(`${API}/users/${username}/repos?sort=pushed&per_page=30`).then((res) =>
          res.ok ? res.json() : null,
        ),
      ]);

      if (!isActive) {
        return;
      }

      const profileData = profileResult.status === 'fulfilled' ? profileResult.value : null;
      if (profileData) {
        setProfile({
          followers: profileData.followers,
          public_repos: profileData.public_repos,
          created_at: profileData.created_at,
        });
      }

      const repoData = reposResult.status === 'fulfilled' ? reposResult.value : null;
      if (Array.isArray(repoData)) {
        const candidates = (repoData as GitHubRestRepo[])
          .filter(
            (repo) =>
              !repo.fork &&
              !repo.archived &&
              repo.description &&
              !excludeRepos.includes(repo.name),
          )
          .map((repo) => ({
            name: repo.name,
            description: repo.description ?? '',
            url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count,
            pushedAt: repo.pushed_at,
          }));
        setRepos(pickFeatured(candidates));
      }

      if (!profileData && !Array.isArray(repoData)) {
        setError('Could not load GitHub data');
      }
      setLoading(false);
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, []);

  return { repos, profile, loading, error };
};
