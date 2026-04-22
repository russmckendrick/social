import React from 'react';
import { LuArrowUpRight } from 'react-icons/lu';
import { type SocialLink } from '../config';
import { getIcon } from '../utils/icons';

interface LinkCardProps {
  link: SocialLink;
}

const hexToRgb = (hex: string) => {
  const normalized = hex.replace('#', '');
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;

  const value = Number.parseInt(expanded, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
};

const toRgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getHoverColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness >= 90) {
    return hex;
  }

  const mix = 0.55;
  const mixedR = Math.round(r + (255 - r) * mix);
  const mixedG = Math.round(g + (255 - g) * mix);
  const mixedB = Math.round(b + (255 - b) * mix);

  return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
};

export const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  const Icon = getIcon(link.icon.library, link.icon.name);
  const hoverColor = getHoverColor(link.iconColor);

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 bg-[var(--dashboard-panel-strong)] px-4 py-2.5 transition-colors hover:bg-[color:var(--brand-tint)] lg:px-5 lg:py-3"
      style={
        {
          '--brand-color': hoverColor,
          '--brand-tint': toRgba(link.iconColor, 0.1),
          '--brand-tint-soft': toRgba(link.iconColor, 0.14),
          '--brand-line': toRgba(link.iconColor, 0.36),
        } as React.CSSProperties
      }
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon className="shrink-0 text-base text-[color:var(--brand-color)] transition-colors group-hover:text-[color:var(--brand-color)] lg:text-sm" />
        <span className="truncate whitespace-nowrap text-sm leading-snug text-[var(--dashboard-muted)] transition-colors group-hover:text-[color:var(--brand-color)]">
          {link.text}
        </span>
      </span>
      <LuArrowUpRight className="ml-auto shrink-0 text-[11px] text-[var(--dashboard-subtle)] transition-colors group-hover:text-[color:var(--brand-color)]" />
    </a>
  );
};
