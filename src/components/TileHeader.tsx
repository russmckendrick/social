import React from 'react';

interface TileHeaderProps {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
}

export const TileHeader: React.FC<TileHeaderProps> = ({ id, title, href, linkLabel }) => (
  <div className="flex items-baseline justify-between gap-4">
    <h2 id={id} className="font-display text-[22px] font-bold tracking-[-0.01em]">
      {title}
    </h2>
    {href && linkLabel && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="tile-link shrink-0 text-sm text-[var(--muted)]"
      >
        {linkLabel} ↗
      </a>
    )}
  </div>
);
