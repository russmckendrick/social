import React from 'react';

interface StatTileProps {
  href: string;
  label: string;
  value: string;
  caption: string;
  tone: 'invert' | 'accent';
}

const tones = {
  invert: 'bg-[var(--invert)] text-[var(--invert-fg)] [--stat-muted:var(--invert-muted)]',
  accent: 'bg-[var(--accent)] text-[var(--accent-fg)] [--stat-muted:var(--accent-muted)]',
};

export const StatTile: React.FC<StatTileProps> = ({ href, label, value, caption, tone }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`tile flex flex-col justify-between gap-6 border-transparent p-7 ${tones[tone]}`}
  >
    <span className="text-sm text-[var(--stat-muted)]">{label}</span>
    <span>
      <span className="block font-display text-[64px] font-extrabold leading-none tracking-[-0.04em]">
        {value}
      </span>
      <span className="mt-1.5 block text-[15px] text-[var(--stat-muted)]">{caption}</span>
    </span>
  </a>
);
