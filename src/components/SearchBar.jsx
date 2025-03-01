import React, { useState, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext.jsx';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
  const { darkMode } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mb-6">
      <FaSearch className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search memes..."
        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
    </div>
  );
};

export default SearchBar;
