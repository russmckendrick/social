import React from 'react';
import type { BlogPost } from '../types/collection';
import { formatShortDate, stripHtml } from '../utils/format';

interface FeaturedPostTileProps {
  post?: BlogPost;
  loading: boolean;
}

export const FeaturedPostTile: React.FC<FeaturedPostTileProps> = ({ post, loading }) => {
  if (loading || !post) {
    return (
      <div className="tile flex flex-col sm:col-span-2 lg:row-span-2" aria-busy={loading}>
        <div className="aspect-[2/1] animate-pulse bg-[var(--tile-sunken)]" />
        <div className="flex flex-col gap-3 p-7">
          <div className="h-6 w-32 animate-pulse rounded-full bg-[var(--tile-sunken)]" />
          <div className="h-8 w-4/5 animate-pulse rounded-lg bg-[var(--tile-sunken)]" />
          <div className="h-4 w-full animate-pulse rounded bg-[var(--tile-sunken)]" />
        </div>
      </div>
    );
  }

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="tile group flex flex-col sm:col-span-2 lg:row-span-2"
    >
      <div className="aspect-[2/1] overflow-hidden bg-[var(--tile-sunken)]">
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-7 pb-7 pt-6">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[var(--accent-fg)]">
            New post
          </span>
          <span className="text-[var(--muted)]">
            {formatShortDate(post.pubDate)} · {post.readTimeMinutes ?? 1} min read
          </span>
        </span>
        <h2 className="font-display text-[28px] font-bold leading-[1.08] tracking-[-0.02em] group-hover:text-[var(--link-hover)] sm:text-[32px]">
          {post.title}
        </h2>
        <p className="line-clamp-3 text-base leading-relaxed text-[var(--muted)]">
          {stripHtml(post.description)}
        </p>
      </div>
    </a>
  );
};
