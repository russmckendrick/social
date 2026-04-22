import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import type { BlogPost } from '../types/collection';

interface PostCardProps {
  post: BlogPost;
}

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'RECENT';
  }

  return date
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    .toUpperCase();
};

const stripHtml = (value: string) => {
  if (!value) {
    return '';
  }

  const parsed = new DOMParser().parseFromString(value, 'text/html');
  return parsed.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
};

const formatTag = (post: BlogPost) => {
  const raw = post.categories?.[0] ?? 'blog';
  return raw.replace(/[-_]/g, ' ').toUpperCase();
};

const getHost = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return 'russ.cloud';
  }
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const summary = stripHtml(post.description);
  const readTime = `${post.readTimeMinutes ?? 1} MIN READ`;
  const host = getHost(post.link);
  const tag = formatTag(post);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      aria-label={`Open blog post: ${post.title}`}
    >
      <article className="glass-card flex h-full flex-col overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(31,35,40,0.1)]">
        <div className="overflow-hidden border-b border-[var(--dashboard-border)] bg-[var(--dashboard-frame)]">
          <div className="relative flex items-center gap-3 border-b border-[var(--dashboard-border)] bg-[var(--dashboard-frame-strong)] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 w-[48%] min-w-0 -translate-x-1/2 -translate-y-1/2">
              <div className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[var(--dashboard-subtle)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                <span className="truncate">{host}</span>
                <LuArrowUpRight className="shrink-0 text-[11px]" />
              </div>
            </div>

            <div className="ml-auto rounded-full border border-[rgba(9,105,218,0.18)] bg-[var(--dashboard-primary-soft)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">
              {tag}
            </div>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden">
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover opacity-88 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(200,221,247,0.95),_rgba(232,238,245,0.98))]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(246,248,250,0.08)] via-transparent to-[rgba(255,255,255,0.12)]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[1.05rem] font-semibold leading-tight text-[var(--dashboard-fg)]">
            {post.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--dashboard-muted)]">
            {summary}
          </p>
          <div className="mt-auto flex items-center justify-between pt-5 text-[10px] font-bold uppercase tracking-tighter text-[var(--dashboard-subtle)]">
            <span>{formatDate(post.pubDate)}</span>
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </a>
  );
};
