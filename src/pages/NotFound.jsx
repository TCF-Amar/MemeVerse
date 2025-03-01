import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';

const NotFound = () => {
  const { darkMode } = useAppContext();

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div className="text-center">
        <motion.h1 
          className="text-9xl font-bold mb-4"
          animate={{ 
            rotateZ: [0, -10, 10, -10, 10, 0],
            transition: { duration: 1, repeat: Infinity, repeatDelay: 3 }
          }}
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold mb-4">
          Oops! This meme has ascended to another dimension
        </h2>
        <p className="text-lg mb-8">
          Even the dankest memes get lost sometimes...
        </p>
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            to="/"
            className={`inline-block px-6 py-3 rounded-lg ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white font-semibold`}
          >
            Return to Meme Land
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
