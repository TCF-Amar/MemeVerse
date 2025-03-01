import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaHeart, FaUpload, FaTrash } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext.jsx';
import MemeCard from '../components/MemeCard';
import { localStorageService } from '../utils/localStorage';
import { memeApi } from '../api/memeApi';

const Profile = () => {
  const { darkMode } = useAppContext();
  const [activeTab, setActiveTab] = useState('uploaded');
  const [profile, setProfile] = useState(localStorageService.getUserProfile());
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get uploaded memes
        setUploadedMemes(localStorageService.getUploadedMemes());
        
        // Get liked meme IDs
        const likedMemeIds = localStorageService.getLikedMemes();
        
        // Fetch details for each liked meme
        const memesData = await Promise.all(
          likedMemeIds.map(async (id) => {
            const meme = await memeApi.getMemeById(id);
            return meme;
          })
        );
        
        // Filter out any null values (in case some memes couldn't be fetched)
        setLikedMemes(memesData.filter(meme => meme !== null));
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const updatedProfile = {
      ...profile,
      name: e.target.name.value,
      bio: e.target.bio.value,
    };
    localStorageService.updateUserProfile(updatedProfile);
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleDeleteMeme = (memeId) => {
    if (window.confirm('Are you sure you want to delete this meme?')) {
      localStorageService.deleteUploadedMeme(memeId);
      setUploadedMemes(prevMemes => prevMemes.filter(meme => meme.id !== memeId));
    }
  };

  return (
    <div className={`min-h-screen pt-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-6 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-lg`}
        >
          {isEditing ? (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={profile.name}
                  className={`w-full p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Bio
                </label>
                <textarea
                  name="bio"
                  defaultValue={profile.bio}
                  className={`w-full p-2 rounded-lg ${
                    darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  }`}
                  rows="3"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-start justify-between">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {profile.name || 'Anonymous User'}
                </h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {profile.bio || 'No bio yet'}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                } hover:opacity-80`}
              >
                <FaEdit size={20} />
              </button>
            </div>
          )}
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('uploaded')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'uploaded'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-white text-gray-700'
            }`}
          >
            <FaUpload className="mr-2" /> Uploaded
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'liked'
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-800 text-gray-300'
                : 'bg-white text-gray-700'
            }`}
          >
            <FaHeart className="mr-2" /> Liked
          </button>
        </div>

        {/* Loading State */}
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
          /* Memes Grid */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {activeTab === 'uploaded' ? (
              uploadedMemes.length > 0 ? (
                uploadedMemes.map(meme => (
                  <div key={meme.id} className="relative group">
                    <MemeCard meme={meme} />
                    <button
                      onClick={() => handleDeleteMeme(meme.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              ) : (
                <div className={`col-span-full text-center py-8 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No memes uploaded yet
                </div>
              )
            ) : (
              likedMemes.length > 0 ? (
                likedMemes.map(meme => (
                  <MemeCard key={meme.id} meme={meme} />
                ))
              ) : (
                <div className={`col-span-full text-center py-8 ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  No memes liked yet
                </div>
              )
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
