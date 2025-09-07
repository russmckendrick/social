import { motion } from 'framer-motion';
import { siteConfig } from './config';
import { SocialLink, BlogFeed } from './components';
import { RecordWall } from './components/RecordWall';

function App() {
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
              <motion.img
                src={siteConfig.author.image}
                alt={siteConfig.author.name}
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
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(siteConfig.author.name)}&size=160&background=6366f1&color=ffffff`;
                }}
              />
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
          {/* <RecordWall /> */}

          {/* Blog Feed */}
          {/* <BlogFeed /> */}

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