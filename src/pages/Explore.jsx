import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext.jsx';
import MemeCard from '../components/MemeCard';
import SearchBar from '../components/SearchBar';
import { memeApi } from '../api/memeApi';

const CATEGORIES = ['Trending', 'New', 'Classic', 'Random'];
const SORT_OPTIONS = [
  { label: 'Most Liked', value: 'likes' },
  { label: 'Newest', value: 'date' },
  { label: 'Most Comments', value: 'comments' }
];

const Explore = () => {
  const { darkMode } = useAppContext();
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('Trending');
  const [sortBy, setSortBy] = useState('likes');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMemes();
  }, [category, sortBy]);

  const fetchMemes = async (searchTerm = '') => {
    try {
      setLoading(true);
      const newMemes = await memeApi.getTrendingMemes();
      
      // Apply filters and sorting
      let filteredMemes = [...newMemes];
      if (searchTerm) {
        filteredMemes = filteredMemes.filter(meme => 
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort memes
      filteredMemes.sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.timestamp) - new Date(a.timestamp);
        }
        return b.likes - a.likes;
      });

      setMemes(filteredMemes);
      setHasMore(filteredMemes.length >= 10);
    } catch (error) {
      console.error('Error fetching memes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setPage(1);
    fetchMemes(term);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
    // In a real app, you would fetch more memes here
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8`}
    >
      <div className="container mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Explore Memes
        </h1>

        <SearchBar onSearch={handleSearch} />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2">
            <FaFilter className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`rounded-lg border px-3 py-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`rounded-lg border px-3 py-2 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Meme Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          {loading && page === 1 ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {memes.map((meme) => (
                <MemeCard key={meme.id} meme={meme} />
              ))}
            </>
          )}
        </motion.div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className={`px-6 py-2 rounded-lg ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white`}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Explore;