import React, { useMemo } from 'react';
import { useMixedContent, type BentoItem } from '../hooks/useMixedContent';
import { siteConfig } from '../config';
import { ProfileCard } from './ProfileCard';
import { LinkCard } from './LinkCard';
import { BookCard } from './BookCard';
import { RecordCard } from './RecordCard';
import { PostCard } from './PostCard';
import { HeaderCard } from './HeaderCard';
import { clsx } from 'clsx';

export const BentoGrid: React.FC = () => {
  const { items, loading } = useMixedContent();

  // Pre-calculate header spans to fill remaining row space
  // Headers come AFTER section items and fill the remainder of that row
  const headerSpans = useMemo(() => {
    const spans: Record<string, { sm: number; md: number; lg: number; xl: number }> = {};
    const gridCols = { sm: 2, md: 4, lg: 6, xl: 8 };

    // Track slot-units separately for each breakpoint
    // This is necessary because headers span different amounts at each breakpoint
    const slotUnits = { sm: 0, md: 0, lg: 0, xl: 0 };

    const getSlotUnits = (item: BentoItem): number => {
      if (item.type === 'profile') return 4; // 2x2 = 4 slots
      const size = item.size || '1x1';
      switch (size) {
        case '2x2': return 4;
        case '2x1': return 2;
        case '4x2': return 8;
        case '4x4': return 16;
        default: return 1;
      }
    };

    for (const item of items) {
      if (item.type === 'header') {
        // Calculate remaining columns at each breakpoint independently
        const calcRemaining = (cols: number, currentSlots: number) => {
          const remainder = currentSlots % cols;
          // If at start of row, span full width; otherwise fill remainder
          return remainder === 0 ? cols : cols - remainder;
        };

        const headerSpan = {
          sm: calcRemaining(gridCols.sm, slotUnits.sm),
          md: calcRemaining(gridCols.md, slotUnits.md),
          lg: calcRemaining(gridCols.lg, slotUnits.lg),
          xl: calcRemaining(gridCols.xl, slotUnits.xl),
        };

        spans[item.id] = headerSpan;

        // After header, add its span at each breakpoint to move to next row start
        slotUnits.sm += headerSpan.sm;
        slotUnits.md += headerSpan.md;
        slotUnits.lg += headerSpan.lg;
        slotUnits.xl += headerSpan.xl;
      } else {
        const units = getSlotUnits(item);
        slotUnits.sm += units;
        slotUnits.md += units;
        slotUnits.lg += units;
        slotUnits.xl += units;
      }
    }

    return spans;
  }, [items]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  return (
    <div className="page-wrapper max-w-[1600px] mx-auto p-4 md:p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 auto-rows-[minmax(160px,auto)] grid-flow-dense">
        {items.map((item: BentoItem) => {
          // Special handling for headers - use pre-calculated responsive spans via CSS custom properties
          if (item.type === 'header') {
            const spans = headerSpans[item.id] || { sm: 2, md: 4, lg: 6, xl: 8 };
            return (
              <div
                key={item.id}
                className="header-cell h-full row-span-1"
                style={{
                  '--span-sm': spans.sm,
                  '--span-md': spans.md,
                  '--span-lg': spans.lg,
                  '--span-xl': spans.xl,
                } as React.CSSProperties}
              >
                <HeaderCard text={item.data.text} color={item.data.color} />
              </div>
            );
          }

          // Regular items with responsive sizing
          // On mobile (2 cols): most items should be 1x1 or full width
          // On tablet (4 cols): 2x2 items are fine
          // On desktop (6-8 cols): original sizes
          let spanClass = "col-span-1 row-span-1 transition-all duration-300";
          if (item.size === "2x2") {
            // 2x2 stays 2x2 on all breakpoints (fits in 2-col mobile grid)
            spanClass = "col-span-2 row-span-2 transition-all duration-300";
          } else if (item.size === "2x1") {
            // 2x1 stays 2x1 on all breakpoints
            spanClass = "col-span-2 row-span-1 transition-all duration-300";
          } else if (item.size === "4x2") {
            // 4x2 becomes 2x2 on mobile/tablet, full size on lg+
            spanClass = "col-span-2 row-span-2 lg:col-span-4 lg:row-span-2 transition-all duration-300";
          } else if (item.size === "4x4") {
            // 4x4 becomes 2x2 on mobile, 4x4 on lg+
            spanClass = "col-span-2 row-span-2 lg:col-span-4 lg:row-span-4 transition-all duration-300";
          }

          return (
            <div key={item.id} className={clsx("h-full", spanClass)}>
              {item.type === 'profile' && <ProfileCard />}
              {item.type === 'link' && <LinkCard link={item.data} />}
              {item.type === 'book' && <BookCard book={item.data} />}
              {item.type === 'record' && <RecordCard record={item.data} />}
              {item.type === 'post' && <PostCard post={item.data} />}
            </div>
          );
        })}

        {/* Footer - spans full width at all breakpoints */}
        <div className="col-span-2 md:col-span-4 lg:col-span-6 xl:col-span-8 py-8 text-center text-gray-400 dark:text-gray-500 text-sm transition-colors duration-300">
          <p>{siteConfig.footer.text}</p>
          {siteConfig.footer.showSource && siteConfig.footer.sourceUrl && (
            <a
              href={siteConfig.footer.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              View Source →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
