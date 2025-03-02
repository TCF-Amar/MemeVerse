import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext.jsx';
import MemeUploader from '../components/MemeUploader';

const Upload = () => {
  const { darkMode } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8 mt-12`}
    >
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Upload a Meme
        </h1>
        <MemeUploader />
      </div>
    </motion.div>
  );
};

export default Upload;
