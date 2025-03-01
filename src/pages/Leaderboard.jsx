import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import MiniMemeCard from '../components/MiniMemeCard';
import { memeApi } from '../api/memeApi';

const Leaderboard = () => {
  const { darkMode } = useAppContext();
  const [topMemes, setTopMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMemes = async () => {
      try {
        const memes = await memeApi.getTrendingMemes();
        // Sort by likes in descending order and take top 10
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
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Meme Leaderboard
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Top 10 most liked memes
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto space-y-3"
          >
            {topMemes.map((meme, index) => (
              <MiniMemeCard
                key={meme.id}
                meme={meme}
                rank={index + 1}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
