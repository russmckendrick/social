import { useState, useEffect } from 'react';
import { siteConfig } from '../config';

export type Repo = {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
};

export type GitHubProfile = {
  followers: number;
  public_repos: number;
  public_gists: number;
  following: number;
  created_at: string;
};

interface GitHubPinnedRepo {
  owner: string;
  repo: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
}

interface GitHubRestRepo {
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export const useGitHub = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let anySuccess = false;

      try {
        const profileResponse = await fetch(`https://api.github.com/users/${siteConfig.github.username}`);
        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setProfile({
            followers: profileData.followers,
            public_repos: profileData.public_repos,
            public_gists: profileData.public_gists,
            following: profileData.following,
            created_at: profileData.created_at,
          });
          anySuccess = true;
        }
      } catch (err) {
        console.warn('GitHub profile fetch failed:', err);
      }

      let pinnedRepos: Repo[] = [];
      try {
        const pinnedResponse = await fetch(siteConfig.github.pinnedReposApi);
        if (pinnedResponse.ok) {
          const pinnedData = await pinnedResponse.json();
          if (Array.isArray(pinnedData)) {
            pinnedRepos = (pinnedData as GitHubPinnedRepo[]).map((repo) => ({
              name: repo.repo,
              description: repo.description,
              url: `https://github.com/${repo.owner}/${repo.repo}`,
              language: repo.language,
              stars: parseInt(repo.stars) || 0,
              forks: parseInt(repo.forks) || 0,
            }));
            anySuccess = true;
          }
        }
      } catch (err) {
        console.warn('GitHub pinned repos fetch failed:', err);
      }

      let recentRepos: Repo[] = [];
      try {
        const recentResponse = await fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=8`);
        if (recentResponse.ok) {
          const recentData = await recentResponse.json();
          if (Array.isArray(recentData)) {
            recentRepos = (recentData as GitHubRestRepo[])
              .filter((repo) => !pinnedRepos.some((p) => p.name === repo.name))
              .map((repo) => ({
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
              }));
            anySuccess = true;
          }
        }
      } catch (err) {
        console.warn('GitHub recent repos fetch failed:', err);
      }

      setRepos([...pinnedRepos, ...recentRepos].slice(0, 8));
      if (!anySuccess) {
        setError('Could not load GitHub data');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { repos, profile, loading, error };
};
