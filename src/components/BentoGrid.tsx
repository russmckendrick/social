import React from 'react';
import { siteConfig } from '../config';
import { useMixedContent } from '../hooks/useMixedContent';
import { formatCount } from '../utils/format';
import { BooksTile } from './BooksTile';
import { ErrorBoundary } from './ErrorBoundary';
import { FeaturedPostTile } from './FeaturedPostTile';
import { GitHubTile } from './GitHubTile';
import { LinksTile } from './LinksTile';
import { PostsTile } from './PostsTile';
import { ProfileTile } from './ProfileTile';
import { RecordsTile } from './RecordsTile';
import { StatTile } from './StatTile';
import { TunesTile } from './TunesTile';

const linkFor = (type: string) => siteConfig.author.links.find((link) => link.type === type)?.href;

export const BentoGrid: React.FC = () => {
  const { loading, links, books, records, posts, contactHref } = useMixedContent();

  const recordsHref = linkFor('records') ?? siteConfig.recordWall.linkBaseUrl;
  const newestFirstBooks = [...books].reverse();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <main className="mx-auto max-w-[1280px] px-4 pb-12 pt-4 sm:px-8 sm:pt-8">
        <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ProfileTile />

          <ErrorBoundary label="featured-post">
            <FeaturedPostTile post={posts[0]} loading={loading} />
          </ErrorBoundary>

          <StatTile
            href={recordsHref}
            tone="invert"
            label="Record collection"
            value={loading ? '…' : formatCount(records.length)}
            caption="records and counting"
          />
          <StatTile
            href={siteConfig.bookShelf.allBooksUrl}
            tone="accent"
            label="Published"
            value={String(books.length)}
            caption="books on Docker, Kubernetes & Ansible"
          />

          <ErrorBoundary label="records">
            <RecordsTile records={records} loading={loading} />
          </ErrorBoundary>

          <ErrorBoundary label="tunes">
            <TunesTile />
          </ErrorBoundary>

          <LinksTile links={links} contactHref={contactHref} />

          <ErrorBoundary label="blog-posts">
            <PostsTile posts={posts.slice(1, 4)} loading={loading} />
          </ErrorBoundary>

          <ErrorBoundary label="github">
            <GitHubTile />
          </ErrorBoundary>

          <BooksTile books={newestFirstBooks} allBooksHref={siteConfig.bookShelf.allBooksUrl} />
        </div>

        <footer className="flex flex-wrap justify-between gap-4 px-2 pt-7 text-sm text-[var(--muted)]">
          <p>{siteConfig.footer.text}</p>
          <div className="flex gap-5">
            <a className="tile-link" href={siteConfig.blogFeed.feedUrl} target="_blank" rel="noopener noreferrer">
              RSS
            </a>
            {siteConfig.footer.showSource && siteConfig.footer.sourceUrl && (
              <a className="tile-link" href={siteConfig.footer.sourceUrl} target="_blank" rel="noopener noreferrer">
                Source
              </a>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};
