import React from 'react';
import { LuArrowUpRight, LuMail } from 'react-icons/lu';
import type { LinkGroup, SocialLink } from '../config';
import { getHost } from '../utils/format';
import { getIcon } from '../utils/icons';
import { TileHeader } from './TileHeader';

interface LinksTileProps {
  links: SocialLink[];
  contactHref?: string;
}

// Two columns, split so they come out roughly the same height.
const COLUMNS: { id: LinkGroup; label: string }[][] = [
  [
    { id: 'social', label: 'Social' },
    { id: 'code', label: 'Code' },
  ],
  [
    { id: 'listening', label: 'Listening' },
    { id: 'writing', label: 'Writing' },
  ],
];

const LinkRow: React.FC<{ link: SocialLink }> = ({ link }) => {
  const Icon = getIcon(link.icon.library, link.icon.name);

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -mx-2 flex min-h-[52px] items-center gap-3 rounded-[14px] px-2 py-1.5 hover:bg-[var(--tile-sunken)]"
    >
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-white shadow-[0_0_0_1px_var(--icon-ring)]"
        style={{ backgroundColor: link.iconColor }}
        aria-hidden="true"
      >
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[15px] font-medium leading-tight group-hover:text-[var(--link-hover)]">
          {link.text}
        </span>
        <span className="truncate text-[13px] leading-snug text-[var(--muted)]">
          {link.handle ?? getHost(link.href)}
        </span>
      </span>
      <LuArrowUpRight
        className="hidden h-4 w-4 shrink-0 text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 sm:block"
        aria-hidden="true"
      />
    </a>
  );
};

export const LinksTile: React.FC<LinksTileProps> = ({ links, contactHref }) => (
  <section
    aria-labelledby="links-heading"
    className="tile flex flex-col gap-5 px-7 pb-7 pt-6 sm:col-span-2 lg:row-span-2"
  >
    <TileHeader id="links-heading" title="Find me elsewhere" />

    <div className="grid grid-cols-1 gap-x-8 gap-y-5 min-[420px]:grid-cols-2">
      {COLUMNS.map((column, index) => (
        <div key={index} className="flex flex-col gap-5">
          {column.map((group) => {
            const groupLinks = links.filter((link) => link.group === group.id);
            if (groupLinks.length === 0) {
              return null;
            }

            return (
              <div key={group.id}>
                <h3 className="mb-1 text-[13px] font-medium text-[var(--muted)]">{group.label}</h3>
                <ul>
                  {groupLinks.map((link) => (
                    <li key={link.type}>
                      <LinkRow link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ))}
    </div>

    {contactHref && (
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 rounded-[18px] bg-[var(--tile-sunken)] py-3 pl-5 pr-3">
        <span className="text-[15px]">Prefer email?</span>
        <a
          href={contactHref}
          className="flex min-h-11 items-center gap-2 rounded-full bg-[var(--fg)] px-[18px] text-[15px] font-medium text-[var(--bg)] hover:opacity-90"
        >
          <LuMail className="h-4 w-4" aria-hidden="true" />
          Say hello
        </a>
      </div>
    )}
  </section>
);
