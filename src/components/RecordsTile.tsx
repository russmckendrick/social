import React from 'react';
import { siteConfig } from '../config';
import type { Record as DiscogsRecord } from '../types/collection';
import { formatShortDate, getHost } from '../utils/format';
import { TileHeader } from './TileHeader';

interface RecordsTileProps {
  records: DiscogsRecord[];
  loading: boolean;
}

const imageUrl = (record: DiscogsRecord) =>
  `${siteConfig.recordWall.assetBaseUrl}${record.images_uri_release.medium}`;

const recordUrl = (record: DiscogsRecord) =>
  `${siteConfig.recordWall.linkBaseUrl}${record.uri_release}`;

export const RecordsTile: React.FC<RecordsTileProps> = ({ records, loading }) => {
  const latest = records.slice(0, 6);
  const newest = latest[0];

  return (
    <section
      aria-labelledby="records-heading"
      className="tile flex flex-col gap-4 px-7 py-6 sm:col-span-2"
    >
      <TileHeader
        id="records-heading"
        title="New on the shelf"
        href={siteConfig.recordWall.linkBaseUrl}
        linkLabel={getHost(siteConfig.recordWall.linkBaseUrl)}
      />
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-xl bg-[var(--tile-sunken)]" />
            ))
          : latest.map((record) => (
              <a
                key={record.uri_release}
                href={recordUrl(record)}
                target="_blank"
                rel="noopener noreferrer"
                title={`${record.release_name} — ${record.release_artist}`}
                className="group block overflow-hidden rounded-xl"
              >
                <img
                  src={imageUrl(record)}
                  alt={`${record.release_name} by ${record.release_artist}`}
                  className="aspect-square w-full bg-[var(--tile-sunken)] object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            ))}
      </div>
      {newest && (
        <p className="text-sm text-[var(--muted)]">
          Latest: <span className="font-medium text-[var(--fg)]">{newest.release_name}</span> by{' '}
          {newest.release_artist}
          {newest.date_added && `, added ${formatShortDate(newest.date_added)}`}
        </p>
      )}
    </section>
  );
};
