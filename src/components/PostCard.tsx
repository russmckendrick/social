import React from 'react';
import { type BlogPost } from '../types/collection';
import { clsx } from 'clsx';

interface PostCardProps {
    post: BlogPost;
    className?: string;
}

export const PostCard: React.FC<PostCardProps> = ({ post, className }) => {
    const hasImage = !!post.coverImage;

    // OG images already contain title and overview - show them without overlay
    if (hasImage) {
        return (
            <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(
                    "relative block h-full w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100",
                    className
                )}
            >
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
                "relative flex flex-col justify-between p-5 h-full w-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 bg-white",
                className
            )}
        >
            <div className="flex-1 flex flex-col justify-end">
                <span className="text-xs font-semibold mb-2 uppercase tracking-wide text-blue-600">
                    Blog
                </span>
                <h4 className="font-bold leading-tight mb-2 line-clamp-3 transition-colors text-gray-900 group-hover:text-blue-600">
                    {post.title}
                </h4>
                <p className="text-xs mt-auto text-gray-400">
                    {new Date(post.pubDate).toLocaleDateString(undefined, {
                        year: 'numeric', month: 'short', day: 'numeric'
                    })}
                </p>
            </div>
            <div className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/30 transition-colors duration-300 pointer-events-none" />
        </a>
    );
};
