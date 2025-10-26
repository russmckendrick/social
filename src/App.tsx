import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from './config';
import { SocialLink, BlogFeed, BookShelf } from './components';
import { RecordWall } from './components/RecordWall';

const avatarModules = import.meta.glob('../public/avatars/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
}) as Record<string, string>;

const availableAvatars = Object.values(avatarModules);
const fallbackAvatar = siteConfig.author.image;
const remotePlaceholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(siteConfig.author.name)}&size=160&background=6366f1&color=ffffff`;

const getRandomAvatar = () => {
  if (!availableAvatars.length) {
    return fallbackAvatar;
  }
  const randomIndex = Math.floor(Math.random() * availableAvatars.length);
  return availableAvatars[randomIndex];
};

function App() {
  const [avatarSrc, setAvatarSrc] = useState<string>(() => getRandomAvatar());

  return (
    <motion.div 
      className="gradient-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="container">
        <div className="content">
          {/* Profile Section */}
          <motion.div 
            className="profile"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 1.11, 0.81, 0.99] }}
          >
            <motion.div className="avatar-container">
              <div className="avatar-glow"></div>
              <motion.div
                className="avatar"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="avatar-ring"></div>
                <img
                  src={avatarSrc}
                  alt={siteConfig.author.name}
                  className="avatar-image"
                  onError={() => {
                    setAvatarSrc((current) => {
                      if (current !== fallbackAvatar) {
                        return fallbackAvatar;
                      }
                      return remotePlaceholderAvatar;
                    });
                  }}
                />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {siteConfig.author.name}
            </motion.h1>
            
            <motion.p 
              className="headline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {siteConfig.author.headline}
            </motion.p>
          </motion.div>

          {/* Social Links Grid */}
          <motion.div 
            className="links-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {siteConfig.author.links.map((link, index) => (
              <SocialLink 
                key={`${link.type}-${index}`} 
                link={link} 
                index={index}
              />
            ))}
          </motion.div>

          {/* Record Wall */}
          <RecordWall />

          {/* Blog Feed */}
          <BlogFeed />

          {/* Book Shelf */}
          <BookShelf
            books={siteConfig.bookShelf.books}
            title={siteConfig.bookShelf.title}
          />

          {/* Footer */}
          <motion.div 
            className="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <p>© 2025 {siteConfig.author.name}</p>
            <p>Built with React & Framer Motion</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default App;
