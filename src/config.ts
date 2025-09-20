export interface Book {
  title: string;
  href?: string;
  imageUrl: string;
}

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
  blogFeed: {
    title: string;
    feedUrl: string;
    linkBaseUrl: string;
    postCount: number;
  };
  bookShelf: {
    title: string;
    books: Book[];
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
        text: "My Blog",
        icon: "RiMacFill",
        colors: {
          primary: "#1e293b", // slate-800
          secondary: "#334155", // slate-700
          tertiary: "#475569"   // slate-600
        }
      },
      {
        type: "records",
        href: "https://www.russ.fm/",
        text: "My Record Collection",
        icon: "BsFillVinylFill",
        colors: {
          primary: "#1e40af", // blue-800
          secondary: "#2563eb", // blue-600
          tertiary: "#3b82f6"   // blue-500
        }
      },
      {
        type: "tools",
        href: "https://www.russ.tools/",
        text: "Russ Tools",
        icon: "TbTools",
        colors: {
          primary: "#0f3460", // dark teal-blue
          secondary: "#1e5f74", // medium teal
          tertiary: "#22d3ee"   // cyan-400
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
        type: "bluesky",
        href: "https://bsky.app/profile/russmckendrick.bsky.social",
        text: "Bluesky",
        icon: "SiBluesky",
        colors: {
          primary: "#01AAFF", // Azure Radiance
          secondary: "#A5D4FE", // Anakiwa
          tertiary: "#15406B"   // Chathams Blue
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
  },
  blogFeed: {
    title: "Latest Blog Posts",
    feedUrl: "https://www.russ.cloud/index.xml",
    linkBaseUrl: "https://www.russ.cloud",
    postCount: 5
  },
  bookShelf: {
    title: "My Books",
    books: [
      {
        title: "Monitoring Docker",
        href: "https://www.packtpub.com/en-gb/product/monitoring-docker-9781785885501",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/02.jpg"
      },
      {
        title: "Monitoring & Management of Docker Containers",
        href: "https://thenewstack.io/ebooks/docker-and-containers/monitoring-management-docker-containers/",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/01.png"
      },
      {
        title: "Extending Docker",
        href: "",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/03.jpg"
      },
      {
        title: "Docker Bootcamp",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/04.jpg"
      },
      {
        title: "Mastering Docker - Second Edition",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/05.jpg"
      },
      {
        title: "Kubernetes for Serverless Applications",
        href: "https://www.packtpub.com/product/kubernetes-for-serverless-applications/9781788620376",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/06.jpg"
      },
      {
        title: "Learn Ansible - First Edition",
        href: "https://www.packtpub.com/en-gb/product/learn-ansible-9781788999328",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/07.png"
      },
      {
        title: "Mastering Docker - Third Edition",
        href: "https://www.packtpub.com/en-gb/product/mastering-docker-9781789618686",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/08.jpg"
      },
      {
        title: "Docker High Performance - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/docker-high-performance-9781789804409",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/09.png"
      },
      {
        title: "Mastering Docker - Fourth Edition",
        href: "https://www.packtpub.com/en-gb/product/mastering-docker-fourth-edition-9781839213519",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/10.jpg"
      },
      {
        title: "The Kubernetes Bible - First Edition",
        href: "https://www.packtpub.com/en-gb/product/the-kubernetes-bible-9781838829452",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/11.png"
      },
      {
        title: "Infrastructure as Code for Beginners",
        href: "https://www.packtpub.com/en-gb/product/infrastructure-as-code-for-beginners-9781837636174",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/12.jpg"
      },
      {
        title: "Learn Ansible - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/learn-ansible-9781835082171",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/13.jpg"
      },
      {
        title: "The Kubernetes Bible - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/the-kubernetes-bible-9781835468241",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/14.jpg"
      }
    ]
  }
};