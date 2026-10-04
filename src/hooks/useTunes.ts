import { useEffect, useState } from 'react';
import { siteConfig } from '../config';
import { fetchWithProxyFallback } from '../utils/fetch';

const BLOG_NAMESPACE = 'https://www.russ.cloud/rss/ns';

export interface TunesWeek {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  week?: number;
}

export interface TunesAlbum {
  src: string;
  title: string;
  artist: string;
}

interface TunesState {
  weeks: TunesWeek[];
  cover?: string;
  albums: TunesAlbum[];
  loading: boolean;
}

// Alt text on the album art is "<album> by <artist>".
const splitAlt = (alt: string) => {
  const index = alt.lastIndexOf(' by ');
  return index === -1
    ? { title: alt, artist: '' }
    : { title: alt.slice(0, index), artist: alt.slice(index + 4) };
};

const parseFeed = (xmlText: string): Omit<TunesState, 'loading'> => {
  const xml = new DOMParser().parseFromString(xmlText, 'text/xml');
  if (xml.getElementsByTagName('parsererror').length > 0) {
    return { weeks: [], albums: [] };
  }

  const items = Array.from(xml.querySelectorAll('item'));
  const weeks = items
    .map((item): TunesWeek => {
      const description = item.querySelector('description')?.textContent?.trim() ?? '';
      const week = Number.parseInt(description.match(/^Week (\d+)/)?.[1] ?? '', 10);

      return {
        title: item.querySelector('title')?.textContent?.trim() ?? '',
        link: item.querySelector('link')?.textContent?.trim() ?? '',
        description,
        pubDate: item.querySelector('pubDate')?.textContent?.trim() ?? '',
        week: Number.isFinite(week) ? week : undefined,
      };
    })
    .filter((week) => week.title && week.link);

  // The latest week's cover and records come from the feed's blog: namespace
  // (blog:coverImage, and blog:album with the cover URL in its image attribute).
  const latest = items[0];
  const cover =
    latest?.getElementsByTagNameNS(BLOG_NAMESPACE, 'coverImage')[0]?.textContent?.trim() ||
    undefined;
  const albums = latest
    ? Array.from(latest.getElementsByTagNameNS(BLOG_NAMESPACE, 'album'))
        .map((album) => ({
          src: album.getAttribute('image') ?? '',
          ...splitAlt(album.textContent?.trim() ?? ''),
        }))
        .filter((album) => album.src)
    : [];

  return { weeks, cover, albums };
};

export function useTunes() {
  const [state, setState] = useState<TunesState>({ weeks: [], albums: [], loading: true });

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      const response = await fetchWithProxyFallback(siteConfig.tunes.feedUrl);
      const feed = response.ok ? parseFeed(await response.text()) : { weeks: [], albums: [] };

      if (isActive) {
        setState({ ...feed, loading: false });
      }
    };

    load().catch((error) => {
      console.error('Failed to load tunes', error);
      if (isActive) {
        setState({ weeks: [], albums: [], loading: false });
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return state;
}
