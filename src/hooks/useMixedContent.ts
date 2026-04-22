import { useEffect, useState } from 'react';
import { siteConfig, type Book, type SocialLink } from '../config';
import type { BlogPost, Record as DiscogsRecord } from '../types/collection';

const BLOG_NAMESPACE = 'https://www.russ.cloud/rss/ns';

interface MixedContentState {
  links: SocialLink[];
  books: Book[];
  records: DiscogsRecord[];
  posts: BlogPost[];
  contactHref?: string;
  loading: boolean;
}

const initialState: MixedContentState = {
  links: siteConfig.author.links,
  books: siteConfig.bookShelf.books,
  records: [],
  posts: [],
  contactHref: undefined,
  loading: true,
};

const fetchWithProxyFallback = async (url: string) => {
  const proxiedResponse = await fetch(
    `/api/proxy?url=${encodeURIComponent(url)}`,
  ).catch(() => null);

  if (proxiedResponse?.ok) {
    return proxiedResponse;
  }

  return fetch(url);
};

const stripHtml = (value: string) => {
  if (!value) {
    return '';
  }

  const parsed = new DOMParser().parseFromString(value, 'text/html');
  return parsed.body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
};

const calculateReadTimeMinutes = (value: string) => {
  const words = stripHtml(value).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const extractEmail = (value: string) => {
  const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0];
};

const getNamespacedText = (
  element: Element,
  namespace: string,
  localName: string,
) => {
  return (
    element.getElementsByTagNameNS(namespace, localName)[0]?.textContent?.trim() ?? ''
  );
};

export function useMixedContent() {
  const [content, setContent] = useState<MixedContentState>(initialState);

  useEffect(() => {
    let isActive = true;

    const loadContent = async () => {
      let records: DiscogsRecord[] = [];
      let posts: BlogPost[] = [];
      let contactHref: string | undefined;

      try {
        const recordResponse = await fetchWithProxyFallback(
          siteConfig.recordWall.collectionUrl,
        );

        if (recordResponse.ok) {
          const recordData: DiscogsRecord[] = await recordResponse.json();
          records = recordData;
        }
      } catch (error) {
        console.error('Failed to load records', error);
      }

      try {
        const feedResponse = await fetchWithProxyFallback(siteConfig.blogFeed.feedUrl);

        if (feedResponse.ok) {
          const xmlText = await feedResponse.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
          const feedItems = Array.from(xmlDoc.querySelectorAll('item'));
          const managingEditor =
            xmlDoc.querySelector('channel > managingEditor')?.textContent?.trim() ?? '';

          const email = extractEmail(managingEditor);
          contactHref = email ? `mailto:${email}` : undefined;

          posts = feedItems.map((item) => {
            const link = item.querySelector('link')?.textContent?.trim() ?? '';
            const cleanLink = link.replace(/\/$/, '');
            const contentValue =
              item.querySelector('content\\:encoded')?.textContent?.trim() ??
              item.querySelector('description')?.textContent?.trim() ??
              '';
            const categories = Array.from(item.querySelectorAll('category'))
              .map((category) => category.textContent?.trim() ?? '')
              .filter(Boolean);
            const readingTimeValue = Number.parseInt(
              getNamespacedText(item, BLOG_NAMESPACE, 'readingTime'),
              10,
            );
            const coverImage =
              getNamespacedText(item, BLOG_NAMESPACE, 'coverImage') ||
              getNamespacedText(item, BLOG_NAMESPACE, 'ogImage') ||
              (cleanLink ? `${cleanLink}-og.png` : '');

            return {
              title: item.querySelector('title')?.textContent?.trim() ?? '',
              link,
              pubDate: item.querySelector('pubDate')?.textContent?.trim() ?? '',
              description: item.querySelector('description')?.textContent?.trim() ?? '',
              content: contentValue,
              categories,
              readTimeMinutes: Number.isFinite(readingTimeValue)
                ? Math.max(1, readingTimeValue)
                : calculateReadTimeMinutes(contentValue),
              coverImage: coverImage || undefined,
            };
          });
        }
      } catch (error) {
        console.error('Failed to load blog posts', error);
      }

      if (!isActive) {
        return;
      }

      setContent({
        links: siteConfig.author.links,
        books: siteConfig.bookShelf.books,
        records,
        posts,
        contactHref,
        loading: false,
      });
    };

    loadContent();

    return () => {
      isActive = false;
    };
  }, []);

  return content;
}
