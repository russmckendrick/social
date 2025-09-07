export interface SiteConfig {
  title: string;
  author: {
    name: string;
    headline: string;
    image: string;
    links: SocialLink[];
  };
  recordWall: {
    title: string;
    collectionUrl: string;
    assetBaseUrl: string;
    linkBaseUrl: string;
    recordCount: number;
  };
}

export interface SocialLink {
  type: string;
  href: string;
  text: string;
  icon: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
}

export const siteConfig: SiteConfig = {
  title: "Russ McKendrick",
  author: {
    name: "Russ McKendrick",
    headline: "Buys way too many vinyl records, writes a lot about tech & loves orchestration.",
    image: "/sticker-clear.svg",
    links: [
      {
        type: "blog",
        href: "https://www.russ.cloud/",
        text: "Blog",
        icon: "RiMacFill",
        colors: {
          primary: "#475569", // slate-600
          secondary: "#64748b", // slate-500
          tertiary: "#94a3b8"   // slate-400
        }
      },
      {
        type: "records",
        href: "https://www.russ.fm/",
        text: "My Record Collection", 
        icon: "FaRecordVinyl",
        colors: {
          primary: "#3730a3", // indigo-800
          secondary: "#4338ca", // indigo-700
          tertiary: "#6366f1"   // indigo-500
        }
      },
      {
        type: "tools",
        href: "https://www.russ.tools/",
        text: "Russ Tools", 
        icon: "TbTools",
        colors: {
          primary: "#0f172a", // dark slate
          secondary: "#134e4a", // dark teal  
          tertiary: "#14b8a6"   // bright teal
        }
      },
      {
        type: "github",
        href: "https://github.com/russmckendrick",
        text: "GitHub",
        icon: "FaGithub",
        colors: {
          primary: "#111827", // gray-900
          secondary: "#374151", // gray-700
          tertiary: "#6b7280"   // gray-500
        }
      },
      {
        type: "linkedin",
        href: "https://www.linkedin.com/in/russmckendrick/",
        text: "LinkedIn",
        icon: "FaLinkedin",
        colors: {
          primary: "#1e40af", // blue-800
          secondary: "#2563eb", // blue-600
          tertiary: "#3b82f6"   // blue-500
        }
      },
      {
        type: "amazon",
        href: "https://www.amazon.com/stores/Russ-McKendrick/author/B079KJV88Z?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true",
        text: "Amazon",
        icon: "FaAmazon",
        colors: {
          primary: "#ea580c", // orange-600
          secondary: "#f97316", // orange-500
          tertiary: "#fb923c"   // orange-400
        }
      },
      {
        type: "packt",
        href: "https://www.packtpub.com/en-gb/search?q=Russ%20McKendrick&country=gb&language=en",
        text: "Packt",
        icon: "SiPackt",
        colors: {
          primary: "#c2410c", // orange-700
          secondary: "#ea580c", // orange-600
          tertiary: "#f97316"   // orange-500
        }
      },
      {
        type: "instagram",
        href: "https://www.instagram.com/russmckendrick/",
        text: "Instagram",
        icon: "FaInstagram",
        colors: {
          primary: "#dc2626", // red-600 (Instagram gradient start)
          secondary: "#c026d3", // fuchsia-600 (Instagram gradient middle)
          tertiary: "#7c3aed"   // violet-600 (Instagram gradient end)
        }
      },
      {
        type: "mastodon",
        href: "https://social.mckendrick.io/@russ",
        text: "Mastodon",
        icon: "FaMastodon",
        colors: {
          primary: "#2563eb", // blue-600
          secondary: "#7c3aed", // violet-600
          tertiary: "#c026d3"   // fuchsia-600
        }
      },
      {
        type: "medium",
        href: "https://russmckendrick.medium.com/",
        text: "Medium",
        icon: "FaMedium",
        colors: {
          primary: "#111827", // gray-900
          secondary: "#374151", // gray-700
          tertiary: "#6b7280"   // gray-500
        }
      },
      {
        type: "reddit",
        href: "https://www.reddit.com/user/russmckendrick/",
        text: "Reddit",
        icon: "FaReddit",
        colors: {
          primary: "#c2410c", // orange-700
          secondary: "#dc2626", // red-600
          tertiary: "#ef4444"   // red-500
        }
      },
      {
        type: "discogs",
        href: "https://www.discogs.com/user/russmck/collection?header=1",
        text: "Discogs",
        icon: "SiDiscogs",
        colors: {
          primary: "#111827", // gray-900
          secondary: "#374151", // gray-700
          tertiary: "#6b7280"   // gray-500
        }
      },
      {
        type: "apple-music",
        href: "https://music.apple.com/profile/russmckendrick",
        text: "Apple Music",
        icon: "SiApplemusic",
        colors: {
          primary: "#dc2626", // red-600
          secondary: "#ef4444", // red-500
          tertiary: "#f87171"   // red-400
        }
      },
      {
        type: "lastfm",
        href: "https://www.last.fm/user/RussMckendrick",
        text: "Last.fm",
        icon: "FaLastfm",
        colors: {
          primary: "#b91c1c", // red-700
          secondary: "#dc2626", // red-600
          tertiary: "#ef4444"   // red-500
        }
      },
      {
        type: "spotify",
        href: "https://open.spotify.com/user/russmckendrick",
        text: "Spotify",
        icon: "FaSpotify",
        colors: {
          primary: "#059669", // emerald-600
          secondary: "#10b981", // emerald-500
          tertiary: "#34d399"   // emerald-400
        }
      }
    ]
  },
  recordWall: {
    title: "Latest Additions to the record collection",
    collectionUrl: "https://www.russ.fm/collection.json",
    assetBaseUrl: "https://assets.russ.fm",
    linkBaseUrl: "https://www.russ.fm",
    recordCount: 6
  }
};