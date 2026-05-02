import React from 'react';
import { LuStar, LuGitFork } from 'react-icons/lu';
import type { Repo } from '../hooks/useGitHub';

interface RepoCardProps {
  repo: Repo;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col justify-between rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-panel)] p-4 transition-all hover:border-[var(--dashboard-border-strong)] hover:bg-[var(--dashboard-panel-strong)]"
    >
      <div>
        <h4 className="truncate font-display text-sm font-bold text-[var(--dashboard-primary)] group-hover:text-[var(--dashboard-primary-strong)]">
          {repo.name}
        </h4>
        <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[var(--dashboard-subtle)]">
          {repo.description}
        </p>
      </div>
      
      <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-[var(--dashboard-subtle)]">
        <div className="flex items-center gap-3">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--dashboard-primary)] opacity-60" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <LuStar className="text-[8px]" />
            {repo.stars}
          </span>
          <span className="flex items-center gap-1">
            <LuGitFork className="text-[8px]" />
            {repo.forks}
          </span>
        </div>
      </div>
    </a>
  );
};
