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

  useEffect(() => {
    // Pick a random avatar on mount
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setAvatar(`/avatars/${randomAvatar}`);
  }, []);

  return (
    <div className={clsx(
      "flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 text-center h-full w-full",
      className
    )}>
      <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-md border-4 border-white">
        <img
          src={avatar}
          alt={siteConfig.author.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2 font-display tracking-tight">
        {siteConfig.author.name}
      </h1>
      <p className="text-gray-500 text-base max-w-xs leading-relaxed">
        {siteConfig.author.headline}
      </p>
    </div>
  );
};
