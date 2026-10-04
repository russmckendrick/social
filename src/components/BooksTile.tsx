import React from 'react';
import type { Book } from '../config';
import { TileHeader } from './TileHeader';

interface BooksTileProps {
  books: Book[];
  allBooksHref?: string;
}

const BookCover: React.FC<{ book: Book }> = ({ book }) => (
  <>
    <span className="block overflow-hidden rounded-[14px] bg-[var(--tile-sunken)]">
      <img
        src={book.imageUrl}
        alt={`${book.title} cover`}
        className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </span>
    <span className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-[var(--link-hover)]">
      {book.title}
    </span>
  </>
);

export const BooksTile: React.FC<BooksTileProps> = ({ books, allBooksHref }) => (
  <section
    aria-labelledby="books-heading"
    className="tile flex flex-col gap-[18px] px-7 pb-7 pt-6 sm:col-span-2 lg:col-span-4"
  >
    <TileHeader
      id="books-heading"
      title="Books I’ve written"
      href={allBooksHref}
      linkLabel={`All ${books.length}`}
    />
    <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      {books.map((book) => (
        <li key={book.title}>
          {book.href ? (
            <a href={book.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2.5">
              <BookCover book={book} />
            </a>
          ) : (
            <div className="group flex flex-col gap-2.5">
              <BookCover book={book} />
            </div>
          )}
        </li>
      ))}
    </ul>
  </section>
);
