import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Book {
  title: string;
  href?: string;
  imageUrl: string;
}

interface BookShelfProps {
  books: Book[];
  title?: string;
}

export const BookShelf: React.FC<BookShelfProps> = ({ books, title = "My Books" }) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleModalClick = () => {
    if (selectedBook?.href) {
      window.open(selectedBook.href, '_blank', 'noopener,noreferrer');
    }
    setSelectedBook(null);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedBook(null);
    }
  };

  return (
    <>
      <motion.section
        className="bookshelf-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="bookshelf-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {books.map((book, index) => (
            <motion.div
              key={`book-${index}`}
              className="book-item"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + (index * 0.1),
                ease: [0.21, 1.11, 0.81, 0.99]
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div
                className={`book-link ${!book.href ? 'book-placeholder' : ''}`}
                onClick={() => handleBookClick(book)}
                whileHover={{
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="book-cover"
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="book-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleOverlayClick}
          >
            <motion.div
              className="book-modal-content"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
              onClick={handleModalClick}
              whileHover={selectedBook.href ? {
                scale: 1.02,
                transition: { duration: 0.2 }
              } : {}}
            >
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.title}
                className="book-modal-image"
              />
              <div className="book-modal-info">
                <h3 className="book-modal-title">{selectedBook.title}</h3>
                {selectedBook.href && (
                  <p className="book-modal-hint">Click to visit</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};