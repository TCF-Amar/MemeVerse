import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import { localStorageService } from '../utils/localStorage';

const MemeCard = ({ meme, showActions = true }) => {
  const { darkMode } = useAppContext();
  const isLiked = localStorageService.isMemeLiked(meme.id);
  const [imageError, setImageError] = useState(false);

  const handleLike = () => {
    localStorageService.toggleMemeLike(meme.id);
  };

  const handleImageError = () => {
    console.error(`Failed to load image for meme: ${meme.id}`);
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`w-full rounded-xl overflow-hidden ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-lg transform hover:scale-[1.02] transition-transform duration-200`}
    >
      <Link to={`/meme/${meme.id}`} className="block relative group">
        <div className="w-full h-[300px] relative overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
          {!imageError ? (
            <img
              src={meme.url}
              alt={meme.title}
              onError={handleImageError}
              className="max-w-full max-h-[300px] object-contain"
              loading="lazy"
            />
          ) : (
            <div className="text-gray-500 dark:text-gray-400">
              Failed to load image
            </div>
          )}
        
        </div>
      </Link>

      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 truncate 
          ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {meme.title}
        </h3>

        {showActions && (
          <div className="flex items-center justify-between mt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-red-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <FaHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : 'stroke-current'}`} />
              <span className="text-sm">{meme.likes || 0}</span>
            </motion.button>

            <button className={`flex items-center space-x-1 
              ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}>
              <FaComment className="w-5 h-5" />
              <span className="text-sm">{meme.comments || 0}</span>
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-1 
                ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
            >
              <FaShare className="w-5 h-5" />
              <span className="text-sm hidden sm:inline">Share</span>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MemeCard;
