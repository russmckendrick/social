import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type BlogPost } from '../types/collection';
import { siteConfig } from '../config';

export const BlogFeed: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let response;
        
        // Try proxy endpoint first (works in production), fallback to direct call for development  
        try {
          const proxyUrl = `/api/proxy?url=${encodeURIComponent(siteConfig.blogFeed.feedUrl)}`;
          response = await fetch(proxyUrl);
        } catch {
          // Fallback to direct API call for development
          console.log('Proxy failed, trying direct call...');
          response = await fetch(siteConfig.blogFeed.feedUrl);
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch blog feed');
        }
        
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
        
        // Parse RSS feed items
        const items = Array.from(xmlDoc.querySelectorAll('item'));
        const parsedPosts = items.slice(0, siteConfig.blogFeed.postCount).map(item => {
          const link = item.querySelector('link')?.textContent || '';
          // Generate cover image URL from blog post link
          const coverImage = link ? `${link}cover.png` : undefined;
          
          return {
            title: item.querySelector('title')?.textContent || '',
            link,
            pubDate: item.querySelector('pubDate')?.textContent || '',
            description: item.querySelector('description')?.textContent || '',
            coverImage
          };
        });
        
        setPosts(parsedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const BlogPostCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
    const [imageError, setImageError] = useState(false);
    
    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } catch {
        return dateString;
      }
    };

    const stripHtml = (html: string) => {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    };

    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.21, 1.11, 0.81, 0.99]
        }}
        className="blog-post-card"
      >
        <motion.a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-post-link"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
        >
          {post.coverImage && !imageError && (
            <div className="blog-post-image">
              <img
                src={post.coverImage}
                alt={`Cover for ${post.title}`}
                className="blog-cover-image"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className="blog-post-content">
            <h4 className="blog-post-title">{post.title}</h4>
            <p className="blog-post-date">{formatDate(post.pubDate)}</p>
            <p className="blog-post-description">
              {stripHtml(post.description).substring(0, 150)}...
            </p>
          </div>
        </motion.a>
      </motion.article>
    );
  };

  if (loading) {
    return (
      <motion.div 
        className="blog-feed-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <h3 className="section-title">{siteConfig.blogFeed.title}</h3>
        <div className="blog-feed loading">
          {[...Array(siteConfig.blogFeed.postCount)].map((_, i) => (
            <div key={i} className="blog-placeholder">
              <div className="placeholder-animation"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        className="blog-feed-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <h3 className="section-title">{siteConfig.blogFeed.title}</h3>
        <p className="error-message">Unable to load recent posts: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="blog-feed-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <h3 className="section-title">{siteConfig.blogFeed.title}</h3>
      <div className="blog-feed">
        {posts.map((post, index) => (
          <BlogPostCard 
            key={`${post.link}-${index}`} 
            post={post} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
};