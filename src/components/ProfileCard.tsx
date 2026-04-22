import React from 'react';
import { siteConfig } from '../config';

interface ProfileCardProps {
  subtitle?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ subtitle }) => {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4 flex items-center gap-4">
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-[var(--dashboard-border)] p-0.5">
          <img
            src={siteConfig.author.image}
            alt={siteConfig.author.name}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-base font-semibold text-[var(--dashboard-fg)]">
            {siteConfig.author.name}
          </h2>
          <p className="text-xs text-[var(--dashboard-subtle)]">{subtitle}</p>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-[var(--dashboard-muted)]">
        {siteConfig.author.headline}
      </p>
    </div>
  );
};
