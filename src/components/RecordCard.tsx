import React from 'react';
import { siteConfig } from '../config';
import { type Record as DiscogsRecord } from '../types/collection';

interface RecordCardProps {
  record: DiscogsRecord;
}

const buildImageUrl = (record: DiscogsRecord) => {
  const imagePath =
    record.images_uri_release.hi_res || record.images_uri_release.medium;

  return `${siteConfig.recordWall.assetBaseUrl}${imagePath}`;
};

const buildRecordUrl = (record: DiscogsRecord) => {
  return `${siteConfig.recordWall.linkBaseUrl}${record.uri_release}`;
};

export const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
  const imageUrl = buildImageUrl(record);
  const linkUrl = buildRecordUrl(record);

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      aria-label={`Open record: ${record.release_name} by ${record.release_artist}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--dashboard-border)] bg-[var(--dashboard-panel-strong)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--dashboard-border-strong)] hover:shadow-[0_18px_34px_rgba(31,35,40,0.1)]">
        <div className="aspect-square overflow-hidden border-b border-[var(--dashboard-border)] bg-[var(--dashboard-bg-subtle)]">
          <img
            src={imageUrl}
            alt={`${record.release_name} by ${record.release_artist}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h4 className="line-clamp-2 text-sm font-bold leading-snug text-[var(--dashboard-fg)]">
            {record.release_name}
          </h4>
          <p className="mt-2 line-clamp-2 text-[10px] uppercase tracking-[0.24em] text-[var(--dashboard-subtle)]">
            {record.release_artist}
          </p>
        </div>
      </div>
    </a>
  );
};
