import React from 'react';
import { siteConfig } from '../config';
import type { BlogPost } from '../types/collection';
import { formatShortDate, getHost } from '../utils/format';
import { TileHeader } from './TileHeader';

interface PostsTileProps {
  posts: BlogPost[];
  loading: boolean;
}

export const PostsTile: React.FC<PostsTileProps> = ({ posts, loading }) => (
  <section aria-labelledby="posts-heading" className="tile flex flex-col gap-2 px-7 py-6 sm:col-span-2">
    <TileHeader
      id="posts-heading"
      title="More from the blog"
      href={siteConfig.blogFeed.linkBaseUrl}
      linkLabel={getHost(siteConfig.blogFeed.linkBaseUrl)}
    />
    <ul className="mt-1 flex flex-col">
      {loading
        ? Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="flex items-center gap-3.5 py-1.5">
              <div className="h-12 w-[72px] shrink-0 animate-pulse rounded-[10px] bg-[var(--tile-sunken)]" />
              <div className="h-4 flex-1 animate-pulse rounded bg-[var(--tile-sunken)]" />
            </li>
          ))
        : posts.map((post) => (
            <li key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 py-1.5"
              >
                <span className="h-12 w-[72px] shrink-0 overflow-hidden rounded-[10px] bg-[var(--tile-sunken)]">
                  {post.coverImage && (
                    <img src={post.coverImage} alt="" className="h-full w-full object-cover" loading="lazy" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <span className="line-clamp-2 text-[15px] font-medium leading-snug group-hover:text-[var(--link-hover)]">
                    {post.title}
                  </span>
                  <span className="text-[13px] text-[var(--muted)]">{formatShortDate(post.pubDate)}</span>
                </span>
              </a>
            </li>
          ))}
    </ul>
  </section>
);
