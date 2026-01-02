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

export const LinkCard: React.FC<LinkCardProps> = ({ link, className }) => {
    const IconComponent = getIcon(link.icon.library, link.icon.name);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Light mode: soft pastel background with accent text/border
    // Dark mode: brand color (iconColor) as background with white text/icon
    const accentMap: Record<string, string> = {
        blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-600',
        pink: 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-600',
        yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-500',
        green: 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-600',
        purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-600',
        orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-500',
        gray: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-700',
    };

    const lightModeClass = accentMap[link.accent] || 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-700';
    const darkModeClass = 'text-white border-transparent';

    // In dark mode, use the brand color (iconColor) as background
    const bgStyle = isDark ? { backgroundColor: link.iconColor } : {};
    const iconColor = isDark ? '#ffffff' : link.iconColor;

    return (
        <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "flex flex-col items-center justify-center p-6 h-full w-full rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group",
                isDark ? darkModeClass : lightModeClass,
                className
            )}
            style={bgStyle}
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
