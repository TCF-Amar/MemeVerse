import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import MemeCard from '../components/MemeCard';
import { memeApi } from '../api/memeApi';

const Home = () => {
  const { darkMode } = useAppContext();
  const [trendingMemes, setTrendingMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMemes = async () => {
      try {
        const memes = await memeApi.getTrendingMemes();
        setTrendingMemes(memes);
      } catch (error) {
        console.error('Error fetching trending memes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMemes();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
            ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Welcome to MemeVerse
          </h1>
          <p className={`text-lg md:text-xl 
            ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover the trending memes of today
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`w-12 h-12 border-4 border-t-transparent rounded-full 
                ${darkMode ? 'border-white' : 'border-gray-900'}`}
            />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {trendingMemes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
