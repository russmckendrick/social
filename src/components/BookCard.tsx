import React from 'react';
import { type Book } from '../config';
import { clsx } from 'clsx';

interface BookCardProps {
    book: Book;
    className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
    return (
        <a
            href={book.href || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "relative block h-full w-full rounded-2xl overflow-hidden group cursor-pointer",
                className
            )}
        >
            <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-medium font-display line-clamp-2">
                    {book.title}
                </span>
            </div>
        </a>
    );
};
