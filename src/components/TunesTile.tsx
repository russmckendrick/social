import React from 'react';
import { siteConfig } from '../config';
import { useTunes } from '../hooks/useTunes';
import { formatShortDate } from '../utils/format';
import { TileHeader } from './TileHeader';

export const TunesTile: React.FC = () => {
  const { weeks, cover, albums, loading } = useTunes();
  const [latest, ...previous] = weeks;

  if (!loading && !latest) {
    return null;
  }

  return (
    <section
      aria-labelledby="tunes-heading"
      className="tile flex flex-col gap-5 px-7 pb-7 pt-6 sm:col-span-2 lg:col-span-4"
    >
      <TileHeader
        id="tunes-heading"
        title={siteConfig.tunes.title}
        href={siteConfig.tunes.pageUrl}
        linkLabel="All weeks"
      />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-9">
        {loading || !latest ? (
          <div className="flex flex-col gap-4" aria-busy="true">
            <div className="aspect-[21/9] animate-pulse rounded-[18px] bg-[var(--tile-sunken)]" />
            <div className="h-7 w-3/4 animate-pulse rounded-lg bg-[var(--tile-sunken)]" />
            <div className="h-4 w-full animate-pulse rounded bg-[var(--tile-sunken)]" />
          </div>
        ) : (
          <a
            href={latest.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4"
          >
            <span className="block aspect-[21/9] overflow-hidden rounded-[18px] bg-[var(--tile-sunken)]">
              {cover && (
                <img
                  src={cover}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              )}
            </span>
            <span className="flex items-center gap-2 text-[13px] font-medium">
              {latest.week !== undefined && (
                <span className="shrink-0 whitespace-nowrap rounded-full bg-[var(--accent)] px-2.5 py-1 text-[var(--accent-fg)]">
                  Week {latest.week}
                </span>
              )}
              <span className="text-[var(--muted)]">
                {formatShortDate(latest.pubDate)} · written up by AI from my records
              </span>
            </span>
            <span className="font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em] group-hover:text-[var(--link-hover)] sm:text-[30px]">
              {latest.title}
            </span>
            <span className="line-clamp-2 text-base leading-relaxed text-[var(--muted)]">
              {latest.description}
            </span>
          </a>
        )}

        <div className="flex flex-col gap-6">
          {(loading || albums.length > 0) && (
            <div>
              <h3 className="mb-2.5 text-[13px] font-medium text-[var(--muted)]">On the turntable</h3>
              <ul className="grid grid-cols-4 gap-2.5">
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <li key={i} className="aspect-square animate-pulse rounded-xl bg-[var(--tile-sunken)]" />
                    ))
                  : albums.slice(0, 8).map((album) => (
                      <li key={album.src}>
                        <a
                          href={latest?.link ?? siteConfig.tunes.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={album.artist ? `${album.title} — ${album.artist}` : album.title}
                          className="group block overflow-hidden rounded-xl"
                        >
                          <img
                            src={album.src}
                            alt={album.artist ? `${album.title} by ${album.artist}` : album.title}
                            className="aspect-square w-full bg-[var(--tile-sunken)] object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        </a>
                      </li>
                    ))}
              </ul>
            </div>
          )}

          {previous.length > 0 && (
            <div>
              <h3 className="mb-1 text-[13px] font-medium text-[var(--muted)]">Previous weeks</h3>
              <ul>
                {previous.slice(0, 3).map((week) => (
                  <li key={week.link}>
                    <a
                      href={week.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group -mx-2 flex min-h-11 items-center justify-between gap-4 rounded-xl px-2 py-1.5 hover:bg-[var(--tile-sunken)]"
                    >
                      <span className="truncate text-[15px] font-medium group-hover:text-[var(--link-hover)]">
                        {week.title}
                      </span>
                      <span className="shrink-0 text-[13px] text-[var(--muted)]">
                        {formatShortDate(week.pubDate)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
