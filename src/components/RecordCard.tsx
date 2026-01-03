import React from 'react';
import { type Record as DiscogsRecord } from '../types/collection';
import { siteConfig, type IconConfig } from '../config';
import { clsx } from 'clsx';
import { getIcon } from '../utils/icons';

interface RecordCardProps {
    record: DiscogsRecord;
    hoverIcon: IconConfig;
    className?: string;
}

export const RecordCard: React.FC<RecordCardProps> = ({ record, hoverIcon, className }) => {
    // Use the high-res image path from the record data, prepended with the asset base URL.
    const imagePath = record.images_uri_release.hi_res || record.images_uri_release.medium;
    const imageUrl = `${siteConfig.recordWall.assetBaseUrl}${imagePath}`;
    const linkUrl = `${siteConfig.recordWall.linkBaseUrl}${record.uri_release}`;
    const HoverIconComponent = getIcon(hoverIcon.library, hoverIcon.name);

    return (
        <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                "relative block h-full w-full rounded-2xl overflow-hidden group border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-300",
                className
            )}
        >
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white p-1 rounded-full">
                <HoverIconComponent />
            </div>

            <img
                src={imageUrl}
                alt={`${record.release_name} by ${record.release_artist}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="text-white font-bold text-sm font-display leading-tight line-clamp-1">
                    {record.release_name}
                </h4>
                <p className="text-purple-100 text-xs line-clamp-1">
                    {record.release_artist}
                </p>
            </div>
        </a>
    );
};
