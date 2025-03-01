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
        // Fetch the meme details
        const memeData = await memeApi.getMemeById(id);
        if (memeData) {
          setMeme(memeData);
          
          // Fetch trending memes for related section
          const allMemes = await memeApi.getTrendingMemes();
          // Filter out current meme and get 3 random memes
          const filteredMemes = allMemes
            .filter(m => m.id !== id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
          setRelatedMemes(filteredMemes);
        }
      } catch (error) {
        console.error('Error fetching meme:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemeData();
    // Load comments from localStorage
    const storedComments = localStorageService.getComments(id);
    setComments(storedComments);
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
    if (newComment) {
      setComments(prev => [...prev, newComment]);
      setComment('');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} pt-16`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`w-12 h-12 border-4 border-t-transparent rounded-full 
                ${darkMode ? 'border-white' : 'border-gray-900'}`}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!meme) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} pt-16`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Meme not found</h2>
            <Link to="/explore" className="text-blue-500 hover:text-blue-600">
              Back to Explore
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} pt-16`}>
      <div className="container mx-auto px-4 py-8">
        <Link to="/explore" className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-600">
          <FaArrowLeft className="mr-2" />
          Back to Explore
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Meme Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <div className="p-4">
                <h1 className="text-2xl font-bold mb-2">{meme.title}</h1>
              </div>
              
              <div className="w-full flex justify-center bg-gray-100 dark:bg-gray-700">
                <img 
                  src={meme.url} 
                  alt={meme.title} 
                  className="max-w-full h-auto"
                  style={{
                    maxHeight: '600px',
                    objectFit: 'contain'
                  }}
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLike}
                    className={`flex items-center space-x-2 ${isLiked ? 'text-red-500' : ''}`}
                  >
                    <FaHeart className={isLiked ? 'fill-current' : 'stroke-current'} />
                    <span>{meme.likes}</span>
                  </motion.button>

                  <div className="flex items-center space-x-2">
                    <FaComment />
                    <span>{comments.length}</span>
                  </div>

                  <button className="flex items-center space-x-2">
                    <FaShare />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Comments Section */}
            <div className={`mt-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4`}>
              <h2 className="text-xl font-semibold mb-4">Comments</h2>
              
              <form onSubmit={handleComment} className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className={`flex-1 p-2 rounded-lg ${
                      darkMode 
                        ? 'bg-gray-700 text-white border-gray-600' 
                        : 'bg-gray-50 text-gray-900 border-gray-200'
                    } border`}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Post
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.map(comment => (
                  <div
                    key={comment.id}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">Anonymous</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Memes Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Related Memes</h2>
            <div className="space-y-4">
              {relatedMemes.map(relatedMeme => (
                <MemeCard key={relatedMeme.id} meme={relatedMeme} showActions={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;
