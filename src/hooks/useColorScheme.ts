import { useSyncExternalStore } from 'react';

export type ColorScheme = 'light' | 'dark';

const query = '(prefers-color-scheme: dark)';

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
};

const getSnapshot = (): ColorScheme => (window.matchMedia(query).matches ? 'dark' : 'light');

// The page's colours come from CSS (prefers-color-scheme); this is only for
// components that need the scheme in JS, such as the contribution heatmap.
export const useColorScheme = () => useSyncExternalStore(subscribe, getSnapshot, (): ColorScheme => 'light');
