import React from 'react';
import { type SocialLink } from '../config';
import * as SiIcons from "react-icons/si";
import * as LuIcons from "react-icons/lu";
import * as FaIcons from "react-icons/fa";
import { clsx } from 'clsx';
import { useTheme } from '../context/ThemeContext';

interface LinkCardProps {
    link: SocialLink;
    className?: string;
}

// Map config library/name to actual React Icon component
const getIcon = (library: string, name: string) => {
    // Normalize names if necessary, but assuming config matches react-icons export names usually helps.
    // The User's config has "simple" => "rss", "discogs" etc.
    // And "lucide" => "Wrench", "Linkedin", "Store".

    // Strategy: Try to find the icon in the respective pack.

    if (library === 'simple') {
        // Simple Icons usually start with Si... in react-icons/si
        // e.g. "rss" -> SiRss, "discogs" -> SiDiscogs
        // User config names are lowercase, need to PascalCase them and prepend Si
        const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
        const iconName = `Si${pascalName}` as keyof typeof SiIcons;

        // Special case overrides if needed based on the user's config file inspection
        if (name === 'lastdotfm') return SiIcons.SiLastdotfm;
        if (name === 'applemusic') return SiIcons.SiApplemusic;

        return SiIcons[iconName] || SiIcons.SiRss; // Fallback
    }

    if (library === 'lucide') {
        // Lucide icons in react-icons/lu are Lu...
        // e.g. "Wrench" -> LuWrench
        const iconName = `Lu${name}` as keyof typeof LuIcons;
        return LuIcons[iconName] || LuIcons.LuLink;
    }

    if (library === 'fa') {
        // FontAwesome icons in react-icons/fa are Fa...
        // e.g. "Linkedin" -> FaLinkedin
        // User requested imports: import { FaLinkedin } from "react-icons/fa";
        // So we expect name="Linkedin" -> FaLinkedin
        const iconName = `Fa${name}` as keyof typeof FaIcons;
        return FaIcons[iconName] || FaIcons.FaLink;
    }

    return LuIcons.LuLink;
};

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

export const LinkCard: React.FC<LinkCardProps> = ({ link, className }) => {
    const IconComponent = getIcon(link.icon.library, link.icon.name);
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
            <div className="mb-3 text-4xl transition-transform duration-300 group-hover:-translate-y-1">
                <IconComponent style={{ color: iconColor }} />
            </div>
            <span className="font-semibold text-sm text-center font-display leading-tight opacity-90">
                {link.text}
            </span>
        </a>
    );
};
