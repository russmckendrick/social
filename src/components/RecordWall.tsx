import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Record } from '../types/collection';

export const RecordWall: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('https://www.russ.fm/collection.json');
        if (!response.ok) {
          throw new Error('Failed to fetch collection');
        }
        const data = await response.json();
        // Get the last 6 records
        const latestRecords = data.slice(-6).reverse();
        setRecords(latestRecords);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load records');
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const RecordCover: React.FC<{ record: Record; index: number }> = ({ record, index }) => {
    const [imageError, setImageError] = useState(false);
    
    const imageUrl = imageError 
      ? `https://assets.russ.fm${record.images_uri_release.medium}` 
      : `https://assets.russ.fm${record.images_uri_release.hi_res}`;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: -10 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.21, 1.11, 0.81, 0.99]
        }}
        className="record-cover-container"
      >
        <motion.a
          href={`https://www.russ.fm${record.uri_release}`}
          target="_blank"
          rel="noopener noreferrer"
          className="record-cover"
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            z: 10,
          }}
          whileTap={{ scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          <div className="record-sleeve">
            <img
              src={imageUrl}
              alt={`${record.release_name} by ${record.release_artist}`}
              className="album-cover"
              onError={() => setImageError(true)}
            />
            <div className="record-overlay">
              <div className="record-info">
                <h4 className="album-title">{record.release_name}</h4>
                <p className="artist-name">{record.release_artist}</p>
                <p className="release-year">{new Date(record.date_release_year).getFullYear()}</p>
              </div>
            </div>
          </div>
          
          {/* Vinyl record behind the cover */}
          <motion.div 
            className="vinyl-record"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="vinyl-center">
              <div className="vinyl-label"></div>
            </div>
          </motion.div>
        </motion.a>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <motion.div 
        className="record-wall-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <h3 className="section-title">Latest Additions to the Collection</h3>
        <div className="record-wall loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="record-placeholder">
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
        className="record-wall-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <h3 className="section-title">Latest Additions to the Collection</h3>
        <p className="error-message">Unable to load recent albums: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="record-wall-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <h3 className="section-title">Latest Additions to the Collection</h3>
      <div className="record-wall">
        {records.map((record, index) => (
          <RecordCover 
            key={`${record.uri_release}-${index}`} 
            record={record} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
};