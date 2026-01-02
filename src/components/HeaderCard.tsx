import React from 'react';
import { clsx } from 'clsx';
import type { CardSize, AccentColor } from '../config';

interface HeaderCardProps {
    text: string;
    size?: CardSize;
    color?: AccentColor;
    className?: string;
}

const colorClasses: Record<AccentColor, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-50' },
    pink: { bg: 'bg-pink-600', text: 'text-pink-50' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-50' },
    green: { bg: 'bg-green-600', text: 'text-green-50' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-50' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-50' },
    gray: { bg: 'bg-gray-700', text: 'text-gray-50' },
};

export const HeaderCard: React.FC<HeaderCardProps> = ({ text, color = 'gray', className }) => {
    const colors = colorClasses[color];

    return (
        <div
            className={clsx(
                "flex items-end justify-start p-6 h-full w-full rounded-2xl",
                colors.bg,
                className
            )}
        >
            <h2 className={clsx("text-2xl md:text-3xl font-bold leading-none tracking-tight", colors.text)}>
                {text}
            </h2>
        </div>
    );
};
