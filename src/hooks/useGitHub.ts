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
      try {
        setLoading(true);
        
        // Fetch Profile Stats
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
        }

        // 1. Try to fetch pinned repos
        const pinnedResponse = await fetch(siteConfig.github.pinnedReposApi);
        let pinnedRepos: Repo[] = [];
        
        if (pinnedResponse.ok) {
          const pinnedData = await pinnedResponse.json() as GitHubPinnedRepo[];
          pinnedRepos = pinnedData.map((repo) => ({
            name: repo.repo,
            description: repo.description,
            url: `https://github.com/${repo.owner}/${repo.repo}`,
            language: repo.language,
            stars: parseInt(repo.stars) || 0,
            forks: parseInt(repo.forks) || 0,
          }));
        }

        // 2. Fetch recent repos from public API as fallback or addition
        const recentResponse = await fetch(`https://api.github.com/users/${siteConfig.github.username}/repos?sort=updated&per_page=8`);
        let recentRepos: Repo[] = [];
        
        if (recentResponse.ok) {
          const recentData = await recentResponse.json() as GitHubRestRepo[];
          recentRepos = recentData
            .filter((repo) => !pinnedRepos.some(p => p.name === repo.name)) // Don't duplicate
            .map((repo) => ({
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              language: repo.language,
              stars: repo.stargazers_count,
              forks: repo.forks_count,
            }));
        }

        setRepos([...pinnedRepos, ...recentRepos].slice(0, 8));
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError('Could not load GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { repos, profile, loading, error };
};
