import React, { useRef } from 'react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
  LuChevronDown,
  LuExternalLink,
} from 'react-icons/lu';
import { siteConfig } from '../config';
import { useMixedContent } from '../hooks/useMixedContent';
import { BookCard } from './BookCard';
import { LinkCard } from './LinkCard';
import { PostCard } from './PostCard';
import { ProfileCard } from './ProfileCard';
import { RecordCard } from './RecordCard';
import { GitHubSection } from './GitHubSection';

const getHost = (value?: string) => {
  if (!value) {
    return '';
  }

  try {
    return new URL(value).hostname.replace(/^www\./, '');
  } catch {
    return value;
  }
};

export const BentoGrid: React.FC = () => {
  const { loading, links, books, records, posts } = useMixedContent();
  const insightsRef = useRef<HTMLDivElement>(null);
  const recordsRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

  const blogLink = links.find((link) => link.type === 'blog') ?? links[0];
  const featuredPosts = posts.slice(0, 8);
  const featuredRecords = records.slice(0, 18);
  const featuredBooks = [...books].reverse();
  const subtitleHosts = [getHost(blogLink?.href), getHost(siteConfig.recordWall.linkBaseUrl)]
    .filter(Boolean)
    .join(' / ');

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--dashboard-bg)] px-6">
        <div className="glass-card rounded-xl px-8 py-6 text-sm uppercase tracking-[0.24em] text-zinc-400">
          Loading dashboard
        </div>
      </div>
    );
  }

  const scrollInsights = (direction: 'left' | 'right') => {
    const container = insightsRef.current;

    if (!container) {
      return;
    }

    const amount = Math.min(420, Math.round(container.clientWidth * 0.82));
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const scrollWorks = (direction: 'up' | 'down') => {
    const container = worksRef.current;

    if (!container) {
      return;
    }

    const amount = Math.min(280, Math.round(container.clientHeight * 0.78));
    container.scrollBy({
      top: direction === 'up' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const scrollRecords = (direction: 'up' | 'down') => {
    const container = recordsRef.current;

    if (!container) {
      return;
    }

    const amount = Math.min(280, Math.round(container.clientHeight * 0.78));
    container.scrollBy({
      top: direction === 'up' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--dashboard-bg)] text-[var(--dashboard-fg)]">
      <main className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <aside className="space-y-4 lg:col-span-3">
            <ProfileCard subtitle={subtitleHosts || 'russ.cloud / russ.fm'} />

            <div className="glass-card overflow-hidden rounded-xl border border-[var(--dashboard-border)]">
              <div className="border-b border-[var(--dashboard-border)] bg-[var(--dashboard-frame)]">
                <div className="relative flex items-center gap-3 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-frame-strong)] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-1/2 w-[56%] min-w-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex min-w-0 items-center justify-center px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--dashboard-subtle)]">
                      <span className="truncate">Social Links</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[var(--dashboard-border)] md:grid-cols-3 lg:grid-cols-1">
                {links.map((link) => (
                  <LinkCard key={link.type} link={link} />
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-4 lg:col-span-9 lg:space-y-6">
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-semibold">
                  Latest Blog Posts
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollInsights('left')}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                    aria-label="Scroll latest insights left"
                  >
                    <LuChevronLeft className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollInsights('right')}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                    aria-label="Scroll latest insights right"
                  >
                    <LuChevronRight className="text-sm" />
                  </button>
                  <a
                    href={siteConfig.blogFeed.linkBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--dashboard-subtle)] transition-colors hover:text-[var(--dashboard-primary)]"
                    aria-label="Open all blog posts"
                  >
                    <LuExternalLink />
                  </a>
                </div>
              </div>

              <div
                ref={insightsRef}
                className="latest-insights-scroll flex gap-4 overflow-x-auto pb-3 pr-2 snap-x snap-mandatory"
              >
                {featuredPosts.map((post) => (
                  <div
                    key={post.link}
                    className="min-w-[320px] snap-start sm:min-w-[360px] lg:min-w-[382px]"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-semibold">
                    Recently Added
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollRecords('up')}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                      aria-label="Scroll recently added up"
                    >
                      <LuChevronUp className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollRecords('down')}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                      aria-label="Scroll recently added down"
                    >
                      <LuChevronDown className="text-sm" />
                    </button>
                    <a
                      href={siteConfig.author.links.find((link) => link.type === 'records')?.href ?? siteConfig.recordWall.linkBaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--dashboard-subtle)] transition-colors hover:text-[var(--dashboard-primary)]"
                      aria-label="Open record collection"
                    >
                      <LuExternalLink />
                    </a>
                  </div>
                </div>

                <div
                  ref={recordsRef}
                  className="published-works-scroll glass-card grid max-h-[520px] grid-cols-2 content-start gap-4 overflow-y-auto rounded-xl p-4 sm:grid-cols-3"
                >
                  {featuredRecords.map((record) => (
                    <RecordCard key={record.uri_release} record={record} />
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-semibold">
                    Published Works
                  </h2>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollWorks('up')}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                      aria-label="Scroll published works up"
                    >
                      <LuChevronUp className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollWorks('down')}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] text-[var(--dashboard-subtle)] hover:border-[var(--dashboard-border-strong)] hover:text-[var(--dashboard-primary)]"
                      aria-label="Scroll published works down"
                    >
                      <LuChevronDown className="text-sm" />
                    </button>
                    <a
                      href={siteConfig.author.links.find((link) => link.type === 'packt')?.href ?? siteConfig.author.links.find((link) => link.type === 'amazon')?.href ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--dashboard-subtle)] transition-colors hover:text-[var(--dashboard-primary)]"
                      aria-label="Open published works links"
                    >
                      <LuExternalLink />
                    </a>
                  </div>
                </div>

                <div
                  ref={worksRef}
                  className="published-works-scroll glass-card grid max-h-[520px] grid-cols-2 content-start gap-4 overflow-y-auto rounded-xl p-4"
                >
                  {featuredBooks.map((book) => (
                    <BookCard key={book.title} book={book} variant="grid" />
                  ))}
                </div>
              </section>
            </div>

            <GitHubSection />
          </div>
        </div>
      </main>

      <footer className="mt-8 border-t border-[var(--dashboard-border)] py-8 opacity-80">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--dashboard-subtle)]">
            {siteConfig.footer.text}
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-tighter text-[var(--dashboard-subtle)]">
            <a
              className="transition-colors hover:text-[var(--dashboard-primary)]"
              href={siteConfig.blogFeed.feedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              RSS Feed
            </a>
            {siteConfig.footer.showSource && siteConfig.footer.sourceUrl && (
              <a
                className="transition-colors hover:text-[var(--dashboard-primary)]"
                href={siteConfig.footer.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            )}
            <a
              className="transition-colors hover:text-[var(--dashboard-primary)]"
              href={siteConfig.recordWall.linkBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Collection
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
