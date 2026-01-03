import React from 'react';
import { type SocialLink, type IconConfig } from '../config';
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';
import { getIcon } from '../utils/icons';

interface LinkCardProps {
    link: SocialLink;
    hoverIcon: IconConfig;
    className?: string;
}

// Convert hex to RGB values
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
};

// Create a light variant of a color (mix with white)
const createLightVariant = (hex: string, lightness: number = 0.12): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#f5f5f5';
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${lightness})`;
};

// Create a very light/pale version of a color for icon on dark background
const createPaleColor = (hex: string): string => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    // Mix with white to create a pale version
    const mix = 0.7; // 70% white
    const r = Math.round(rgb.r + (255 - rgb.r) * mix);
    const g = Math.round(rgb.g + (255 - rgb.g) * mix);
    const b = Math.round(rgb.b + (255 - rgb.b) * mix);
    return `rgb(${r}, ${g}, ${b})`;
};

export const LinkCard: React.FC<LinkCardProps> = ({ link, hoverIcon, className }) => {
    const IconComponent = getIcon(link.icon.library, link.icon.name);
    const HoverIconComponent = getIcon(hoverIcon.library, hoverIcon.name);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Light mode: light variant of brand color as background, brand color for text/border
    // Dark mode: brand color as background with white text/icon
    const brandColor = link.iconColor;
    const lightBg = createLightVariant(brandColor, 0.12);
    const lightBgHover = createLightVariant(brandColor, 0.18);

    const darkModeClass = 'text-white border-transparent';

    // Style object for light mode (brand colors)
    const lightModeStyle: React.CSSProperties = {
        backgroundColor: lightBg,
        color: brandColor,
        borderColor: brandColor,
    };

    // Style object for dark mode
    const darkModeStyle: React.CSSProperties = {
        backgroundColor: brandColor,
    };

    const iconColor = isDark ? '#ffffff' : brandColor;

    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "flex flex-col items-center justify-center p-6 h-full w-full rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group border",
                isDark && darkModeClass,
                className
            )}
            style={isDark ? darkModeStyle : lightModeStyle}
            onMouseEnter={(e) => {
                if (!isDark) {
                    e.currentTarget.style.backgroundColor = lightBgHover;
                }
            }}
            onMouseLeave={(e) => {
                if (!isDark) {
                    e.currentTarget.style.backgroundColor = lightBg;
                }
            }}
        >
            <div
                className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full"
                style={{ backgroundColor: isDark ? createPaleColor(brandColor) : brandColor }}
            >
                <HoverIconComponent style={{ color: isDark ? brandColor : createPaleColor(brandColor) }} />
            </div>
            <div className="mb-3 text-4xl transition-transform duration-300 group-hover:-translate-y-1">
                <IconComponent style={{ color: iconColor }} />
            </div>
            <span className="font-semibold text-sm text-center font-display leading-tight opacity-90">
                {link.text}
            </span>
        </a>
    );
};
