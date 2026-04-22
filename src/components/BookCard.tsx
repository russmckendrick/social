import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { type Book } from '../config';

interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list';
}

const BookContent: React.FC<BookCardProps> = ({ book, variant = 'grid' }) => {
  if (variant === 'list') {
    return (
      <div className="group flex items-center gap-4 rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] p-3 transition-colors hover:border-[var(--dashboard-border-strong)] hover:bg-[var(--dashboard-bg-subtle)]">
        <div className="h-20 w-14 shrink-0 overflow-hidden rounded-md bg-[var(--dashboard-bg)] shadow-sm">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-bold leading-relaxed text-[var(--dashboard-fg)]">
            {book.title}
          </p>
        </div>
        <LuArrowUpRight className="shrink-0 text-sm text-[var(--dashboard-subtle)] transition-colors group-hover:text-[var(--dashboard-primary)]" />
      </div>
    );
  }

  return (
    <div className="group flex h-full cursor-pointer flex-col rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--dashboard-border-strong)] hover:shadow-[0_18px_30px_rgba(31,35,40,0.08)]">
      <div className="aspect-[3/4] overflow-hidden rounded-lg border border-[var(--dashboard-border)] bg-[var(--dashboard-bg)] shadow-[0_10px_24px_rgba(31,35,40,0.12)]">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="line-clamp-2 text-sm font-bold leading-snug text-[var(--dashboard-fg)]">
          {book.title}
        </p>
        <LuArrowUpRight className="mt-0.5 shrink-0 text-sm text-[var(--dashboard-subtle)] transition-colors group-hover:text-[var(--dashboard-primary)]" />
      </div>
    </div>
  );
};

export const BookCard: React.FC<BookCardProps> = ({ book, variant = 'grid' }) => {
  if (!book.href) {
    return <BookContent book={book} variant={variant} />;
  }

  return (
    <a href={book.href} target="_blank" rel="noopener noreferrer" className="block h-full">
      <BookContent book={book} variant={variant} />
    </a>
  );
};
