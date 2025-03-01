import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const MiniMemeCard = ({ meme, rank }) => {
  const { darkMode } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center space-x-3 p-2 rounded-lg ${
        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
      } transition-colors duration-200`}
    >
      <span className={`text-lg font-bold ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        #{rank}
      </span>
      
      <Link to={`/meme/${meme.id}`} className="flex-1 flex items-center space-x-3">
        <div className="w-16 h-16 relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <img
            src={meme.url}
            alt={meme.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-medium truncate ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {meme.title}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <FaHeart className="w-4 h-4 text-red-500" />
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {meme.likes || 0}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MiniMemeCard;
