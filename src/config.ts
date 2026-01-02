export interface Book {
  title: string;
  href?: string;
  imageUrl: string;
  spineColor?: string; // Hex color for spine/border that matches the book cover edge
}

export type IconLibrary = 'simple' | 'lucide' | 'fa';
export type CardSize = '1x1' | '2x1' | '2x2' | '4x2' | '4x4';
export type AccentColor = 'blue' | 'pink' | 'yellow' | 'green' | 'purple' | 'orange' | 'gray';
export type SectionType = 'links' | 'blog' | 'books' | 'records';

export interface HeaderConfig {
  enabled: boolean;
  text: string;
  size: CardSize;
  color?: AccentColor;
}

export interface IconConfig {
  name: string;
  library: IconLibrary;
}

export interface SocialLink {
  type: string;
  href: string;
  text: string;
  icon: IconConfig;
  iconColor: string;
  size: CardSize;
  accent: AccentColor;
}

export interface SiteConfig {
  title: string;
  sectionOrder: SectionType[];
  footer: {
    text: string;
    showSource?: boolean;
    sourceUrl?: string;
  };
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
    itemSize: CardSize;
    header: HeaderConfig;
  };
  blogFeed: {
    title: string;
    feedUrl: string;
    linkBaseUrl: string;
    postCount: number;
    itemSize: CardSize;
    header: HeaderConfig;
  };
  bookShelf: {
    title: string;
    books: Book[];
    itemSize: CardSize;
    header: HeaderConfig;
  };
}

export const siteConfig: SiteConfig = {
  title: "Russ McKendrick",
  sectionOrder: ['links', 'blog', 'books', 'records'],
  footer: {
    text: "Made with ☕ and mass mass mass amounts of AI",
    showSource: true,
    sourceUrl: "https://github.com/russmckendrick/russ-social"
  },
  author: {
    name: "Russ McKendrick",
    headline: "Buys way too many vinyl records, writes a lot about tech & loves orchestration.",
    image: "/sticker-clear.svg",
    links: [
      {
        type: "blog",
        href: "https://www.russ.cloud/",
        text: "My Blog",
        icon: { name: "rss", library: "simple" },
        iconColor: "#3b82f6",
        size: "1x1",
        accent: "blue"
      },
      {
        type: "records",
        href: "https://www.russ.fm/",
        text: "My Record Collection",
        icon: { name: "discogs", library: "simple" },
        iconColor: "#8b5cf6",
        size: "1x1",
        accent: "purple"
      },
      {
        type: "tools",
        href: "https://www.russ.tools/",
        text: "Russ Tools",
        icon: { name: "Wrench", library: "lucide" },
        iconColor: "#10b981",
        size: "1x1",
        accent: "green"
      },
      {
        type: "github",
        href: "https://github.com/russmckendrick",
        text: "GitHub",
        icon: { name: "github", library: "simple" },
        iconColor: "#1d1d1f",
        size: "1x1",
        accent: "gray"
      },
      {
        type: "linkedin",
        href: "https://www.linkedin.com/in/russmckendrick/",
        text: "LinkedIn",
        icon: { name: "Linkedin", library: "fa" },
        iconColor: "#0077b5",
        size: "1x1",
        accent: "blue"
      },
      {
        type: "amazon",
        href: "https://www.amazon.com/stores/Russ-McKendrick/author/B079KJV88Z?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true",
        text: "Amazon",
        icon: { name: "Amazon", library: "fa" },
        iconColor: "#ff9900",
        size: "1x1",
        accent: "orange"
      },
      {
        type: "packt",
        href: "https://www.packtpub.com/en-gb/search?q=Russ%20McKendrick&country=gb&language=en",
        text: "Packt",
        icon: { name: "packt", library: "simple" },
        iconColor: "#f97316",
        size: "1x1",
        accent: "orange"
      },
      {
        type: "instagram",
        href: "https://www.instagram.com/russmckendrick/",
        text: "Instagram",
        icon: { name: "instagram", library: "simple" },
        iconColor: "#e4405f",
        size: "1x1",
        accent: "pink"
      },
      {
        type: "mastodon",
        href: "https://social.mckendrick.io/@russ",
        text: "Mastodon",
        icon: { name: "mastodon", library: "simple" },
        iconColor: "#6364ff",
        size: "1x1",
        accent: "purple"
      },
      {
        type: "bluesky",
        href: "https://bsky.app/profile/russmckendrick.bsky.social",
        text: "Bluesky",
        icon: { name: "bluesky", library: "simple" },
        iconColor: "#0085ff",
        size: "1x1",
        accent: "blue"
      },
      {
        type: "medium",
        href: "https://russmckendrick.medium.com/",
        text: "Medium",
        icon: { name: "medium", library: "simple" },
        iconColor: "#1d1d1f",
        size: "1x1",
        accent: "gray"
      },
      {
        type: "reddit",
        href: "https://www.reddit.com/user/russmckendrick/",
        text: "Reddit",
        icon: { name: "reddit", library: "simple" },
        iconColor: "#ff4500",
        size: "1x1",
        accent: "orange"
      },
      {
        type: "discogs",
        href: "https://www.discogs.com/user/russmck/collection?header=1",
        text: "Discogs",
        icon: { name: "discogs", library: "simple" },
        iconColor: "#1d1d1f",
        size: "1x1",
        accent: "gray"
      },
      {
        type: "apple-music",
        href: "https://music.apple.com/profile/russmckendrick",
        text: "Apple Music",
        icon: { name: "applemusic", library: "simple" },
        iconColor: "#fa243c",
        size: "1x1",
        accent: "pink"
      },
      {
        type: "lastfm",
        href: "https://www.last.fm/user/RussMckendrick",
        text: "Last.fm",
        icon: { name: "lastdotfm", library: "simple" },
        iconColor: "#d51007",
        size: "1x1",
        accent: "pink"
      },
      {
        type: "spotify",
        href: "https://open.spotify.com/user/russmckendrick",
        text: "Spotify",
        icon: { name: "spotify", library: "simple" },
        iconColor: "#1db954",
        size: "1x1",
        accent: "green"
      }
    ]
  },
  recordWall: {
    title: "Latest Records",
    collectionUrl: "https://www.russ.fm/collection.json",
    assetBaseUrl: "https://assets.russ.fm",
    linkBaseUrl: "https://www.russ.fm",
    recordCount: 16,
    itemSize: "1x1",
    header: {
      enabled: true,
      text: "Latest additons to the record collection ...",
      size: "2x1",
      color: "gray"
    }
  },
  blogFeed: {
    title: "Latest Posts",
    feedUrl: "https://www.russ.cloud/rss.xml",
    linkBaseUrl: "https://www.russ.cloud",
    postCount: 7,
    itemSize: "2x1",
    header: {
      enabled: true,
      text: "From the Blog ...",
      size: "2x1",
      color: "gray"
    }
  },
  bookShelf: {
    title: "My Books",
    itemSize: "1x1",
    header: {
      enabled: true,
      text: "Books I have written ...",
      size: "2x1",
      color: "gray"
    },
    books: [
      {
        title: "Monitoring Docker",
        href: "https://www.packtpub.com/en-gb/product/monitoring-docker-9781785885501",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/02.jpg",
        spineColor: "#0c3d5f"
      },
      {
        title: "Monitoring & Management of Docker Containers",
        href: "https://thenewstack.io/ebooks/docker-and-containers/monitoring-management-docker-containers/",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/01.png",
        spineColor: "#9b4d96"
      },
      {
        title: "Extending Docker",
        href: "",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/03.jpg",
        spineColor: "#1a3a5c"
      },
      {
        title: "Docker Bootcamp",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/04.jpg",
        spineColor: "#f97316"
      },
      {
        title: "Mastering Docker - Second Edition",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/05.jpg",
        spineColor: "#1a5f5f"
      },
      {
        title: "Kubernetes for Serverless Applications",
        href: "https://www.packtpub.com/product/kubernetes-for-serverless-applications/9781788620376",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/06.jpg",
        spineColor: "#2563eb"
      },
      {
        title: "Learn Ansible - First Edition",
        href: "https://www.packtpub.com/en-gb/product/learn-ansible-9781788999328",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/07.png",
        spineColor: "#f97316"
      },
      {
        title: "Mastering Docker - Third Edition",
        href: "https://www.packtpub.com/en-gb/product/mastering-docker-9781789618686",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/08.jpg",
        spineColor: "#1a5f5f"
      },
      {
        title: "Docker High Performance - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/docker-high-performance-9781789804409",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/09.png",
        spineColor: "#1a4a4a"
      },
      {
        title: "Mastering Docker - Fourth Edition",
        href: "https://www.packtpub.com/en-gb/product/mastering-docker-fourth-edition-9781839213519",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/10.jpg",
        spineColor: "#1a5f5f"
      },
      {
        title: "The Kubernetes Bible - First Edition",
        href: "https://www.packtpub.com/en-gb/product/the-kubernetes-bible-9781838829452",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/11.png",
        spineColor: "#1e3a5f"
      },
      {
        title: "Infrastructure as Code for Beginners",
        href: "https://www.packtpub.com/en-gb/product/infrastructure-as-code-for-beginners-9781837636174",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/12.jpg",
        spineColor: "#f97316"
      },
      {
        title: "Learn Ansible - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/learn-ansible-9781835082171",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/13.jpg",
        spineColor: "#f97316"
      },
      {
        title: "The Kubernetes Bible - Second Edition",
        href: "https://www.packtpub.com/en-gb/product/the-kubernetes-bible-9781835468241",
        imageUrl: "https://raw.githubusercontent.com/russmckendrick/russmckendrick/master/img/14.jpg",
        spineColor: "#1e3a5f"
      }
    ]
  }
};
