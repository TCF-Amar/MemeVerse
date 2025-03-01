import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext.jsx';
import MiniMemeCard from '../components/MiniMemeCard';
import { memeApi } from '../api/memeApi';

const getRankIcon = (rank) => {
  if (rank === 1) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown className="text-yellow-500 w-6 h-6 drop-shadow-lg" title="1st Place" />
      </motion.div>
    );
  } else if (rank === 2) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown className="text-gray-400 w-5 h-5 drop-shadow-lg" title="2nd Place" />
      </motion.div>
    );
  } else if (rank === 3) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown className="text-amber-600 w-4 h-4 drop-shadow-lg" title="3rd Place" />
      </motion.div>
    );
  }
  return null;
};

const getRankStyle = (rank) => {
  if (rank === 1) {
    return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50';
  } else if (rank === 2) {
    return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-400/50';
  } else if (rank === 3) {
    return 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-600/50';
  }
  return 'bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700 dark:from-gray-600 dark:to-gray-800 dark:text-gray-300';
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const Leaderboard = () => {
  const { darkMode } = useAppContext();
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMemes = async () => {
      try {
        const memes = await memeApi.getTrendingMemes();
        const sortedMemes = memes
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);
        setTopMemes(sortedMemes);
      } catch (error) {
        console.error('Error fetching top memes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMemes();
  }, []);

  return (
    <div className={`min-h-screen pt-16 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 flex items-center justify-center gap-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 10, 0],
                y: [0, -2, 2, -2, 2, 0]
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaCrown className="text-yellow-500 w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
            </motion.div>
            Meme Leaderboard
          </motion.h1>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Top 10 most liked memes
          </p>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className={`w-12 h-12 md:w-16 md:h-16 border-4 border-t-transparent rounded-full shadow-lg
                  ${darkMode ? 'border-white' : 'border-gray-900'}`}
              />
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-2xl mx-auto space-y-4 px-2 sm:px-4"
            >
              {topMemes.map((meme, index) => (
                <motion.div
                  key={meme.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className={`relative rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/90 hover:bg-gray-800' : 'bg-white/90 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center p-4">
                    <motion.div 
                      className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full mr-4 shadow-lg ${getRankStyle(index + 1)}`}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      {getRankIcon(index + 1) || (
                        <span className="text-lg md:text-xl font-bold">{index + 1}</span>
                      )}
                    </motion.div>
                    <div className="flex-1">
                      <MiniMemeCard
                        meme={meme}
                        rank={index + 1}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Leaderboard;
