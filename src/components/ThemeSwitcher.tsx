import React from 'react';
import { useTheme } from '../context/useTheme';
import { LuSun, LuMoon } from 'react-icons/lu';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-all duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <LuMoon className="w-5 h-5 text-gray-700" />
      ) : (
        <LuSun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
};
