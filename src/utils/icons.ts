import * as SiIcons from "react-icons/si";
import * as LuIcons from "react-icons/lu";
import * as FaIcons from "react-icons/fa";
import { type IconType } from "react-icons";

// Map config library/name to actual React Icon component
export const getIcon = (library: string, name: string): IconType => {
    if (library === 'simple') {
        // Simple Icons usually start with Si... in react-icons/si
        const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
        const iconName = `Si${pascalName}` as keyof typeof SiIcons;

        // Special case overrides
        if (name === 'lastdotfm') return SiIcons.SiLastdotfm;
        if (name === 'applemusic') return SiIcons.SiApplemusic;

        return SiIcons[iconName] || SiIcons.SiRss;
    }

    if (library === 'lucide') {
        // Lucide icons in react-icons/lu are Lu...
        const iconName = `Lu${name}` as keyof typeof LuIcons;
        return LuIcons[iconName] || LuIcons.LuLink;
    }

    if (library === 'fa') {
        // FontAwesome icons in react-icons/fa are Fa...
        const iconName = `Fa${name}` as keyof typeof FaIcons;
        return FaIcons[iconName] || FaIcons.FaLink;
    }

    return LuIcons.LuLink;
};
