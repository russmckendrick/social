import React, { Suspense } from 'react';
import { loadIcon } from '../utils/iconLoader';

interface SocialIconProps {
  iconName: string;
  className?: string;
}

const IconFallback = ({ className }: { className?: string }) => (
  <div className={`${className} animate-pulse bg-white/20 rounded-sm`} />
);

export const SocialIcon: React.FC<SocialIconProps> = ({ iconName, className = "social-icon" }) => {
  const IconComponent = loadIcon(iconName);

  return (
    <Suspense fallback={<IconFallback className={className} />}>
      <IconComponent className={className} />
    </Suspense>
  );
};