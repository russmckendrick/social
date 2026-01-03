import React from 'react';
import { type Book, type IconConfig } from '../config';
import { clsx } from 'clsx';
import { getIcon } from '../utils/icons';

interface BookCardProps {
    book: Book;
    hoverIcon: IconConfig;
    className?: string;
}

export const BookCard: React.FC<BookCardProps> = ({ book, hoverIcon, className }) => {
    const HoverIconComponent = getIcon(hoverIcon.library, hoverIcon.name);

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
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-1 rounded-full">
                <HoverIconComponent />
            </div>
            {/* Book container with 3D effect */}
            <div className="relative h-full w-full" style={{ perspective: '1000px' }}>
                <div
                    className="relative h-full w-full transition-transform duration-300 group-hover:translate-x-1"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Main book cover */}
                    <div className="relative h-full w-full rounded-r-lg rounded-l-sm overflow-hidden shadow-[4px_4px_12px_rgba(0,0,0,0.4)]">
                        {/* Spine edge - left side */}
                        <div
                            className="absolute left-0 top-0 bottom-0 w-3 z-10"
                            style={{
                                background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(255,255,255,0.1) 70%, rgba(0,0,0,0.15) 100%)',
                            }}
                        />

                        {/* Book cover image */}
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />

                        {/* Page edges - right side */}
                        <div
                            className="absolute right-0 top-1 bottom-1 w-1.5"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, #f5f5f0 0px, #e8e8e3 1px, #f5f5f0 2px)',
                                borderRadius: '0 2px 2px 0',
                            }}
                        />

                        {/* Subtle top edge highlight */}
                        <div
                            className="absolute top-0 left-3 right-1.5 h-px"
                            style={{
                                background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                            }}
                        />

                        {/* Hover overlay with title */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-medium font-display line-clamp-2">
                                {book.title}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};
