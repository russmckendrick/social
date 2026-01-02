import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config';
import { clsx } from 'clsx';

// List of available avatars (SVG versions for better quality)
const avatars = [
  '3am.svg', 'ai-02.svg', 'ai.svg', 'anon.svg', 'ansible.svg',
  'arms-folded-02.svg', 'arms-folded.svg', 'arms-to-side.svg', 'azure.svg',
  'band-01.svg', 'band-02.svg', 'band-03.svg', 'band-04.svg', 'band-05.svg',
  'book.svg', 'cables.svg', 'cloud.svg', 'coffee-02.svg', 'coffee.svg',
  'data.svg', 'devops.svg', 'docker.svg', 'founder.svg', 'github.svg',
  'glitch.svg', 'hacker.svg', 'headphones-off.svg', 'headphones.svg',
  'hipster.svg', 'hoodie-down.svg', 'hoodie-up.svg', 'jobs.svg',
  'keyboard.svg', 'laptop-01.svg', 'laptop-02.svg', 'linux.svg', 'nerd.svg',
  'network-02.svg', 'network.svg', 'pass.svg', 'phone.svg', 'python.svg',
  'record-01.svg', 'record-03.svg', 'snug.svg', 'speaker.svg',
  'suit.svg', 'tablet.svg', 'terminal.svg', 'thumbs-down.svg',
  'thumbs-up.svg', 'watch.svg'
];

interface ProfileCardProps {
  size?: '2x2';
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ className }) => {
  const [avatar, setAvatar] = useState<string>('/sticker-clear.svg');

  const pickRandomAvatar = () => {
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(`/avatars/${randomAvatar}`);
  };

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
