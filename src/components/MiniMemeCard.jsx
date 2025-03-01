import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const MiniMemeCard = ({ meme, rank }) => {
  const { darkMode } = useAppContext();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
        darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/50'
      }`}
    >
      <Link 
        to={`/meme/${meme.id}`} 
        className="flex-1 flex items-center space-x-3"
      >
        <motion.div 
          className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex-shrink-0 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <motion.img
            src={meme.url}
            alt={meme.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h3 
            className={`text-sm md:text-base font-medium truncate transition-colors duration-300 ${
              darkMode ? 'text-white group-hover:text-gray-200' : 'text-gray-900 group-hover:text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            {meme.title}
          </motion.h3>
          
          <div className="flex items-center space-x-4 mt-1">
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.1 }}
            >
              <FaHeart className="w-4 h-4 text-red-500" />
              <span className={`text-xs md:text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {meme.likes || 0}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.1 }}
            >
              <FaComment className={`w-4 h-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <span className={`text-xs md:text-sm transition-colors duration-300 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {meme.comments?.length || 0}
              </span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center"
            >
              <FaShare className={`w-4 h-4 transition-colors duration-300 ${
                darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'
              }`} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MiniMemeCard;
