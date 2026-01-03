import React, { useState, useEffect, useCallback } from 'react';
import { siteConfig } from '../config';
import { clsx } from 'clsx';

// Dynamically get all avatar SVGs at build time
// Use glob to discover files, extract filenames, reference from public root
const avatarFiles = import.meta.glob('/public/avatars/*.svg', { query: '?raw', import: 'default' });
const avatars = Object.keys(avatarFiles).map(path => {
  const filename = path.split('/').pop();
  return `/avatars/${filename}`;
});

interface ProfileCardProps {
  size?: '2x2';
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const [avatar, setAvatar] = useState<string>('/sticker-clear.svg');
  const [showSmoke, setShowSmoke] = useState(false);
  const [smokeKey, setSmokeKey] = useState(0);

  const triggerSmoke = useCallback(() => {
    setShowSmoke(true);
    setSmokeKey(prev => prev + 1);
    setTimeout(() => setShowSmoke(false), 800);
  }, []);

  const pickRandomAvatar = useCallback(() => {
    triggerSmoke();
    setTimeout(() => {
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
      setAvatar(randomAvatar);
    }, 150);
  }, [triggerSmoke]);

  useEffect(() => {
    pickRandomAvatar();
  }, []);

  return (
    <div className={clsx(
      "flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-center h-full w-full overflow-hidden transition-colors duration-300",
      className
    )}>
      <button
        onClick={pickRandomAvatar}
        className="relative w-40 h-48 mb-2 cursor-pointer hover:scale-105 transition-all duration-300 focus:outline-none flex-shrink-0"
        title="Click for a new avatar"
      >
        {/* Circle background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gray-700 dark:bg-gray-600 shadow-md border-4 border-white dark:border-gray-800 transition-colors duration-300" />
        {/* Container for avatar - allows top overflow, clips bottom to circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt={siteConfig.author.name}
            className="absolute w-[130%] h-auto object-contain left-1/2 -translate-x-1/2 bottom-0"
          />
        </div>
        {/* Top overflow layer - shows head above circle */}
        <img
          src={avatar}
          alt=""
          aria-hidden="true"
          className="absolute w-[130%] h-auto object-contain left-1/2 -translate-x-1/2 pointer-events-none bottom-0"
          style={{
            clipPath: 'inset(0 0 60% 0)'
          }}
        />
        {/* Smoke puff effect */}
        {showSmoke && (
          <div key={smokeKey} className="absolute inset-0 pointer-events-none">
            <div className="smoke-particle smoke-1" />
            <div className="smoke-particle smoke-2" />
            <div className="smoke-particle smoke-3" />
            <div className="smoke-particle smoke-4" />
            <div className="smoke-particle smoke-5" />
            <div className="smoke-particle smoke-6" />
            <div className="smoke-particle smoke-7" />
            <div className="smoke-particle smoke-8" />
          </div>
        )}
      </button>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display tracking-tight transition-colors duration-300">
        {siteConfig.author.name}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base max-w-xs leading-relaxed transition-colors duration-300">
        {siteConfig.author.headline}
      </p>
    </div>
  );
};
