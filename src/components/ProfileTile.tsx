import React from 'react';
import { siteConfig } from '../config';
import { getHost } from '../utils/format';
import { getIcon } from '../utils/icons';

export const ProfileTile: React.FC = () => {
  const sites = siteConfig.author.links.filter((link) => link.group === 'site');

  return (
    <section
      aria-label="About Russ"
      className="tile flex min-h-[440px] flex-col justify-between gap-8 border-transparent bg-[var(--lime)] p-7 text-[var(--lime-fg)] sm:col-span-2 sm:p-9 lg:row-span-2"
    >
      {/* The sticker is a bust with a flat bottom; a circle crops it cleanly. */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-[#121316] sm:h-40 sm:w-40">
        <img
          src={siteConfig.author.image}
          alt={`Illustration of ${siteConfig.author.name}`}
          className="absolute bottom-0 left-1/2 h-[118%] w-[118%] max-w-none -translate-x-1/2 object-contain object-bottom"
        />
      </div>

      <div>
        <h1 className="font-display text-[52px] font-extrabold leading-[0.92] tracking-[-0.035em] sm:text-[76px]">
          Russ
          <br />
          McKendrick
        </h1>
        <p className="mt-4 max-w-[440px] text-lg leading-snug text-[var(--lime-muted)] sm:text-[19px]">
          {siteConfig.author.headline}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {sites.map((site) => {
            const Icon = getIcon(site.icon.library, site.icon.name);

            return (
              <li key={site.type}>
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={site.text}
                  className="flex min-h-11 items-center gap-2 rounded-full bg-[#121316] py-2.5 pl-3.5 pr-[18px] text-[15px] font-medium text-white hover:bg-black"
                >
                  <Icon className="h-4 w-4 text-[var(--lime)]" aria-hidden="true" />
                  {getHost(site.href)}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
