import {
    SiApplemusic,
    SiBluesky,
    SiDiscogs,
    SiGithub,
    SiInstagram,
    SiLastdotfm,
    SiMastodon,
    SiMedium,
    SiPackt,
    SiReddit,
    SiRss,
    SiSpotify,
} from "react-icons/si";
import { LuLink, LuWrench } from "react-icons/lu";
import { FaAmazon, FaLinkedin, FaRecordVinyl } from "react-icons/fa";
import { type IconType } from "react-icons";
import type { IconLibrary } from "../config";

// Explicit registry of the icons referenced by `siteConfig.author.links`.
// Named imports keep react-icons tree-shakeable; add an entry here when a
// new link in config.ts needs an icon that isn't listed yet.
const ICONS: Record<IconLibrary, Record<string, IconType>> = {
    simple: {
        applemusic: SiApplemusic,
        bluesky: SiBluesky,
        discogs: SiDiscogs,
        github: SiGithub,
        instagram: SiInstagram,
        lastdotfm: SiLastdotfm,
        mastodon: SiMastodon,
        medium: SiMedium,
        packt: SiPackt,
        reddit: SiReddit,
        rss: SiRss,
        spotify: SiSpotify,
    },
    lucide: {
        Link: LuLink,
        Wrench: LuWrench,
    },
    fa: {
        Amazon: FaAmazon,
        Linkedin: FaLinkedin,
        RecordVinyl: FaRecordVinyl,
    },
};

// Map config library/name to actual React Icon component
export const getIcon = (library: IconLibrary, name: string): IconType => {
    const icon = ICONS[library]?.[name];
    if (!icon && import.meta.env.DEV) {
        console.warn(`[icons] No icon registered for ${library}/${name}; add it to src/utils/icons.ts`);
    }
    return icon ?? LuLink;
};
