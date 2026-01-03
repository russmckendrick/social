import React from 'react';
import { type BlogPost } from '../types/collection';
import { type IconConfig } from '../config';
import { clsx } from 'clsx';
import { getIcon } from '../utils/icons';

interface PostCardProps {
    post: BlogPost;
    hoverIcon: IconConfig;
    className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, hoverIcon, className }) => {
    const hasImage = !!post.coverImage;
    const HoverIconComponent = getIcon(hoverIcon.library, hoverIcon.name);

    // OG images already contain title and overview - show them without overlay
    if (hasImage) {
        return (
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                    "relative block h-full w-full rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 group border border-gray-100 dark:border-gray-700",
                    className
                )}
            >
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-1 rounded-full">
                    <HoverIconComponent />
                </div>
                <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </a>
        );
    }

    // Fallback for posts without images
    return (
        <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "relative flex flex-col justify-between p-5 h-full w-full rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 group border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800",
                className
            )}
        >
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-1 rounded-full">
                <HoverIconComponent />
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <span className="text-xs font-semibold mb-2 uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    Blog
                </span>
                <h4 className="font-bold leading-tight mb-2 line-clamp-3 transition-colors text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                </h4>
                <p className="text-xs mt-auto text-gray-400 dark:text-gray-500">
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                    })}
                </p>
            </div>
            <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-900/20 transition-colors duration-300 pointer-events-none" />
        </a>
    );
};
