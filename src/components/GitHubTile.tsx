import React, { useEffect, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { LuStar } from 'react-icons/lu';
import { siteConfig } from '../config';
import { useColorScheme } from '../hooks/useColorScheme';
import { useGitHub } from '../hooks/useGitHub';
import { formatCount } from '../utils/format';
import { TileHeader } from './TileHeader';

const BLOCK_SIZE = 11;
const BLOCK_MARGIN = 4;

const calendarTheme = {
  light: ['#ecedf0', '#c9d0fb', '#8e9cf4', '#5468ec', '#2e46e6'],
  dark: ['#24262c', '#26337a', '#3446b8', '#5468ec', '#a3aef7'],
};

// Show as many recent weeks as fit the tile, rather than a fixed year that
// has to scroll sideways on smaller screens.
const useWeeksThatFit = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [weeks, setWeeks] = useState(26);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const fit = Math.floor((entry.contentRect.width + BLOCK_MARGIN) / (BLOCK_SIZE + BLOCK_MARGIN));
      setWeeks(Math.max(8, Math.min(52, fit)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, weeks };
};

export const GitHubTile: React.FC = () => {
  const { repos, profile, loading } = useGitHub();
  const colorScheme = useColorScheme();
  const { ref, weeks } = useWeeksThatFit();
  const profileUrl = `https://github.com/${siteConfig.github.username}`;

  return (
    <section aria-labelledby="github-heading" className="tile flex flex-col gap-4 px-7 py-6 sm:col-span-2">
      <TileHeader id="github-heading" title="Building" href={profileUrl} linkLabel="GitHub" />

      <div ref={ref} className="min-w-0">
        <GitHubCalendar
          username={siteConfig.github.username}
          transformData={(data) => data.slice(-(weeks * 7 - 6))}
          blockSize={BLOCK_SIZE}
          blockMargin={BLOCK_MARGIN}
          blockRadius={3}
          colorScheme={colorScheme}
          theme={calendarTheme}
          showColorLegend={false}
          showMonthLabels={false}
          showTotalCount={false}
          errorMessage="Contribution graph unavailable right now."
        />
      </div>

      {profile && (
        <p className="text-sm text-[var(--muted)]">
          {formatCount(profile.public_repos)} public repos · on GitHub since{' '}
          {new Date(profile.created_at).getFullYear()}
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <li key={i} className="h-12 animate-pulse rounded-[14px] bg-[var(--tile-sunken)]" />
            ))
          : repos.map((repo) => (
              <li key={repo.url}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-[14px] bg-[var(--tile-sunken)] px-3.5 py-3 hover:bg-[var(--tile-hover)]"
                >
                  <span className="min-w-0 truncate">
                    <span className="font-semibold">{repo.name}</span>{' '}
                    <span className="text-sm text-[var(--muted)]">— {repo.description}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-[13px] text-[var(--muted)]">
                    {repo.language && <span>{repo.language} ·</span>}
                    <LuStar className="h-3 w-3" aria-label="stars" />
                    {repo.stars}
                  </span>
                </a>
              </li>
            ))}
      </ul>
    </section>
  );
};
