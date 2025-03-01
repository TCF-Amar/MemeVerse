import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaComment, FaShare, FaArrowLeft } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { localStorageService } from '../utils/localStorage';
import { memeApi } from '../api/memeApi';
import MemeCard from '../components/MemeCard';

const MemeDetails = () => {
  const { id } = useParams();
  const { darkMode } = useAppContext();
  const [meme, setMeme] = useState(null);
  const [relatedMemes, setRelatedMemes] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLiked = localStorageService.isMemeLiked(id);

  useEffect(() => {
    const fetchMemeData = async () => {
      try {
        setLoading(true);
        const memeData = await memeApi.getMemeById(id);
        if (memeData) {
          setMeme(memeData);
          const allMemes = await memeApi.getTrendingMemes();
          const filteredMemes = allMemes.filter(m => m.id !== id).slice(0, 3);
          setRelatedMemes(filteredMemes);
        }
      } catch (error) {
        console.error('Error fetching meme:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeData();
    setComments(localStorageService.getComments(id));
  }, [id]);

  const handleLike = () => {
    localStorageService.toggleMemeLike(id);
    setMeme(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = localStorageService.addComment(id, comment);
    setComments(prev => [...prev, newComment]);
    setComment('');
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className={`w-12 h-12 border-4 border-t-transparent rounded-full shadow-lg ${
            darkMode ? 'border-white' : 'border-gray-900'
          }`}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-16 px-4 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/explore" 
          className={`flex items-center mb-6 transition-colors duration-300 ${
            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'
          }`}
        >
          <FaArrowLeft className="mr-2" /> Back to Explore
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className={`shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="p-4">
            <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {meme?.title}
            </h1>
          </div>
          <div className={`w-full flex items-center justify-center transition-colors duration-300 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <img 
              src={meme?.url} 
              alt={meme?.title} 
              className="w-full h-auto object-contain max-h-[600px]" 
            />
          </div>
          <div className="p-4 flex justify-between">
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              onClick={handleLike} 
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                isLiked 
                  ? 'text-red-500' 
                  : darkMode 
                    ? 'text-gray-300 hover:text-red-400' 
                    : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <FaHeart /> <span>{meme?.likes}</span>
            </motion.button>
            <div className={`flex items-center space-x-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              <FaComment /> <span>{comments.length}</span>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 transition-colors duration-300 ${
                darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FaShare /> <span>Share</span>
            </motion.button>
          </div>
        </motion.div>

        <div className={`mt-8 shadow-lg rounded-xl p-4 transition-colors duration-300 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h2 className={`text-xl font-semibold mb-4 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Comments
          </h2>
          <form onSubmit={handleComment} className="mb-6 flex gap-2">
            <input 
              type="text" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              placeholder="Add a comment..."
              className={`flex-1 p-2 rounded-lg transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
              } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Post
            </motion.button>
          </form>
          <div className="space-y-4">
            {comments.map(comment => (
              <div 
                key={comment.id} 
                className={`p-3 rounded-lg transition-colors duration-300 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between mb-1">
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}>
                    Anonymous
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className={`text-xl font-semibold mb-4 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Related Memes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedMemes.map(relatedMeme => 
              <MemeCard key={relatedMeme.id} meme={relatedMeme} showActions={false} />
            )}
          </div>
        </div>
      </div><br />
    </div>
  );
};

export default MemeDetails;
