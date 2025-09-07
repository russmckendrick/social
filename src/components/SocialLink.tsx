import React from 'react';
import { motion } from 'framer-motion';
import { SocialIcon } from './SocialIcon';
import { type SocialLink as SocialLinkType } from '../config';

interface SocialLinkProps {
  link: SocialLinkType;
  index: number;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ link, index }) => {
  const gradientStyle = {
    background: `linear-gradient(90deg, ${link.colors.primary}, ${link.colors.secondary}, ${link.colors.tertiary})`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
    >
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        style={gradientStyle}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        whileTap={{ 
          scale: 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <SocialIcon iconName={link.icon} className="social-icon" />
        </motion.div>
        <span>{link.text}</span>

        {/* Shine effect overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};