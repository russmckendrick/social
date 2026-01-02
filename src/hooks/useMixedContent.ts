import { useState, useEffect } from 'react';
import { siteConfig, type SocialLink, type Book, type CardSize, type AccentColor, type SectionType } from '../config';
import type { Record as DiscogsRecord, BlogPost } from '../types/collection';

// Define a union type for all possible items in the grid
export type BentoItemType = 'profile' | 'link' | 'book' | 'record' | 'post' | 'header';

export interface BaseBentoItem {
    id: string;
    type: BentoItemType;
    // Size can be utilized by the grid layout.
    // Most items are 1x1. Profile is 2x2.
    size?: CardSize;
}

export interface ProfileItem extends BaseBentoItem {
    type: 'profile';
}

export interface LinkItem extends BaseBentoItem {
    type: 'link';
    data: SocialLink;
}

export interface BookItem extends BaseBentoItem {
    type: 'book';
    data: Book;
}

export interface RecordItem extends BaseBentoItem {
    type: 'record';
    data: DiscogsRecord;
}

export interface PostItem extends BaseBentoItem {
    type: 'post';
    data: BlogPost;
}

export interface HeaderItem extends BaseBentoItem {
    type: 'header';
    data: {
        text: string;
        color?: AccentColor;
        section: SectionType;
    };
}

export type BentoItem = ProfileItem | LinkItem | BookItem | RecordItem | PostItem | HeaderItem;

// Shuffle function removed as requested

export function useMixedContent() {
    const [items, setItems] = useState<BentoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            try {
                // ... (existing code omitted for brevity in instruction, but kept in mind)
                // Logic flow: try { ... } catch (err) { ... }
                // The previous tool call output showed `} } catch`. I need to replace that block.


                // 1. Static Content (Links & Books)
                const linkItems: LinkItem[] = siteConfig.author.links.map((link, i) => ({
                    id: `link-${link.type}-${i}`,
                    type: 'link',
                    size: link.size, // Use size from config
                    data: link,
                }));

                const bookItems: BookItem[] = siteConfig.bookShelf.books.map((book, i) => ({
                    id: `book-${i}`,
                    type: 'book',
                    size: siteConfig.bookShelf.itemSize,
                    data: book,
                }));

                // 2. Fetch Records
                let recordItems: RecordItem[] = [];
                try {
                    // Try proxy first, then direct
                    const recordUrl = siteConfig.recordWall.collectionUrl;
                    let res = await fetch(`/api/proxy?url=${encodeURIComponent(recordUrl)}`).catch(() => null);
                    if (!res || !res.ok) {
                        res = await fetch(recordUrl);
                    }
                    if (res && res.ok) {
                        const data: DiscogsRecord[] = await res.json();
                        // Featured record logic removed. All records 1x1.
                        recordItems = data.slice(0, siteConfig.recordWall.recordCount).map((record) => ({
                            id: `record-${record.uri_release}`,
                            type: 'record',
                            size: siteConfig.recordWall.itemSize,
                            data: record,
                        }));
                    }
                } catch (error) {
                    console.error("Failed to load records", error);
                }

                // 3. Fetch Blog Posts
                let postItems: PostItem[] = [];
                try {
                    const feedUrl = siteConfig.blogFeed.feedUrl;
                    let res = await fetch(`/api/proxy?url=${encodeURIComponent(feedUrl)}`).catch(() => null);
                    if (!res || !res.ok) {
                        res = await fetch(feedUrl);
                    }
                    if (res && res.ok) {
                        const xmlText = await res.text();
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                        const feedItems = Array.from(xmlDoc.querySelectorAll('item'));

                        // Featured post logic removed. All posts 1x1.
                        postItems = feedItems.slice(0, siteConfig.blogFeed.postCount).map((item, i) => {
                            const link = item.querySelector('link')?.textContent || '';
                            // User requested Open Graph image pattern: url-without-slash + -og.png
                            // Example: https://.../edition/ -> https://.../edition-og.png
                            const cleanLink = link.replace(/\/$/, '');
                            const coverImage = cleanLink ? `${cleanLink}-og.png` : undefined;

                            return {
                                id: `post-${i}`,
                                type: 'post',
                                size: siteConfig.blogFeed.itemSize,
                                data: {
                                    title: item.querySelector('title')?.textContent || '',
                                    link,
                                    pubDate: item.querySelector('pubDate')?.textContent || '',
                                    description: item.querySelector('description')?.textContent || '',
                                    coverImage
                                }
                            };
                        });
                    }
                } catch (error) {
                    console.error("Failed to load blog posts", error);
                }

                if (isMounted) {
                    // 4. Construct Final List based on sectionOrder from config
                    // Headers come AFTER their section items to fill remaining row space
                    const profileItem: ProfileItem = {
                        id: 'profile-main',
                        type: 'profile',
                        size: '2x2'
                    };

                    const finalItems: BentoItem[] = [profileItem];

                    // Build sections based on configured order
                    // Headers appear at the END of each section to cap off the row and introduce the next
                    const sectionOrder = siteConfig.sectionOrder;

                    // Helper to get header config for a section
                    const getHeaderConfig = (sectionType: SectionType) => {
                        switch (sectionType) {
                            case 'records':
                                return { config: siteConfig.recordWall.header, id: 'header-records' };
                            case 'blog':
                                return { config: siteConfig.blogFeed.header, id: 'header-blog' };
                            case 'books':
                                return { config: siteConfig.bookShelf.header, id: 'header-books' };
                            default:
                                return null;
                        }
                    };

                    // Helper to get items for a section
                    const getSectionItems = (sectionType: SectionType) => {
                        switch (sectionType) {
                            case 'links': return linkItems;
                            case 'records': return recordItems;
                            case 'blog': return postItems;
                            case 'books': return bookItems;
                            default: return [];
                        }
                    };

                    for (let i = 0; i < sectionOrder.length; i++) {
                        const section = sectionOrder[i];
                        const nextSection = sectionOrder[i + 1];

                        // Add section items
                        finalItems.push(...getSectionItems(section));

                        // Add next section's header after current section (to cap the row)
                        if (nextSection) {
                            const headerInfo = getHeaderConfig(nextSection);
                            if (headerInfo && headerInfo.config.enabled) {
                                finalItems.push({
                                    id: headerInfo.id,
                                    type: 'header',
                                    size: headerInfo.config.size,
                                    data: {
                                        text: headerInfo.config.text,
                                        color: headerInfo.config.color,
                                        section: nextSection
                                    }
                                });
                            }
                        }
                    }

                    setItems(finalItems);
                }
            } catch (err) {
                console.error("General error loading content", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { items, loading };
}
