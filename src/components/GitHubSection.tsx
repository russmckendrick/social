import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { LuUsers, LuBook, LuCode, LuCalendar, LuExternalLink } from 'react-icons/lu';
import { siteConfig } from '../config';
import { useGitHub } from '../hooks/useGitHub';
import { RepoCard } from './RepoCard';
import { useTheme } from '../context/useTheme';

export const GitHubSection: React.FC = () => {
  const { repos, profile, loading, error } = useGitHub();
  const { theme } = useTheme();

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          GitHub Activity
        </h2>
        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${siteConfig.github.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--dashboard-subtle)] transition-colors hover:text-[var(--dashboard-primary)]"
            aria-label="Open GitHub profile"
          >
            <LuExternalLink />
          </a>
        </div>
      </div>

      <div className="glass-card flex flex-col gap-6 rounded-xl border border-[var(--dashboard-border)] p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="flex justify-center overflow-hidden rounded-lg bg-[var(--dashboard-panel)] p-4 sm:justify-start">
              <div className="min-w-0 flex-1 overflow-x-auto">
                <GitHubCalendar 
                  username={siteConfig.github.username}
                  fontSize={12}
                  blockSize={10}
                  blockMargin={4}
                  colorScheme={theme === 'dark' ? 'dark' : 'light'}
                  theme={{
                    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                  }}
                />
              </div>
            </div>
          </div>

          {profile && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:flex-col lg:gap-3 lg:border-l lg:border-[var(--dashboard-border)] lg:pl-6 lg:min-w-[180px]">
              {[
                { label: 'Public Repos', value: profile.public_repos, icon: LuBook },
                { label: 'Followers', value: profile.followers, icon: LuUsers },
                { label: 'Public Gists', value: profile.public_gists, icon: LuCode },
                { label: 'Member Since', value: new Date(profile.created_at).getFullYear(), icon: LuCalendar },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-panel)] px-4 py-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-primary)]">
                    <stat.icon className="text-sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--dashboard-subtle)]">
                      {stat.label}
                    </span>
                    <span className="font-display text-sm font-bold text-[var(--dashboard-fg)] leading-tight">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-[var(--dashboard-panel)]" />
            ))
          ) : error ? (
            <div className="col-span-full py-4 text-center">
               <p className="text-xs text-[var(--dashboard-subtle)]">{error}</p>
            </div>
          ) : (
            repos.map((repo) => <RepoCard key={repo.url} repo={repo} />)
          )}
        </div>
      </div>
    </section>
  );
};
