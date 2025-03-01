import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown, FaUser, FaMedal, FaHashtag } from "react-icons/fa";
import { useAppContext } from "../context/AppContext.jsx";
import MiniMemeCard from "../components/MiniMemeCard";
import { memeApi } from "../api/memeApi";

const getRankIcon = (rank) => {
  if (rank === 1) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown
          className="text-yellow-500 w-6 h-6 drop-shadow-lg"
          title="1st Place"
        />
      </motion.div>
    );
  } else if (rank === 2) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown
          className="text-gray-400 w-5 h-5 drop-shadow-lg"
          title="2nd Place"
        />
      </motion.div>
    );
  } else if (rank === 3) {
    return (
      <motion.div
        initial={{ rotate: -30 }}
        animate={{ rotate: 0 }}
        whileHover={{ scale: 1.2, y: -2 }}
      >
        <FaCrown
          className="text-amber-600 w-4 h-4 drop-shadow-lg"
          title="3rd Place"
        />
      </motion.div>
    );
  }
  return null;
};

const getRankStyle = (rank) => {
  if (rank === 1) {
    return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50";
  } else if (rank === 2) {
    return "bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-gray-400/50";
  } else if (rank === 3) {
    return "bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-amber-600/50";
  }
  return "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-700 dark:from-gray-600 dark:to-gray-800 dark:text-gray-300";
};

const getRankDisplay = (rank) => {
  const rankColor = rank === 1 ? "text-yellow-500" :
                   rank === 2 ? "text-gray-400" :
                   rank === 3 ? "text-amber-600" :
                   "text-gray-500";
  
  return (
    <div className="flex items-center gap-1">
      <FaHashtag className={`${rankColor} w-4 h-4`} />
      <span className={`${rankColor} font-bold text-lg`}>{rank}</span>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Leaderboard = () => {
  const { darkMode } = useAppContext();
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("memes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (activeTab === "memes") {
          const memes = await memeApi.getTrendingMemes();
          const sortedMemes = memes
            .sort((a, b) => b.likes - a.likes)
            .slice(0, 10)
            .map(meme => ({
              ...meme,
              comments: meme.comments || [],
              likes: meme.likes || 0
            }));
          setTopMemes(sortedMemes);
        } else {
          const users = await memeApi.getTopUsers();
          setTopUsers(users);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setError("Failed to load leaderboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [activeTab]);

  const TabButton = ({ label, isActive, onClick }) => (
    <motion.button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
        isActive
          ? `${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} shadow-lg`
          : `${darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );

  return (
    <div
      className={`min-h-screen pt-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <motion.h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-center justify-center gap-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                y: [0, -2, 2, -2, 2, 0],
              }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaCrown className="text-yellow-500 w-8 h-8 md:w-10 md:h-10 drop-shadow-lg" />
            </motion.div>
            Leaderboard
          </motion.h1>

          <div className="flex justify-center gap-4 mb-8">
            <TabButton
              label="Top Memes"
              isActive={activeTab === "memes"}
              onClick={() => setActiveTab("memes")}
            />
            <TabButton
              label="Top Users"
              isActive={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`max-w-2xl mx-auto p-4 rounded-lg text-center ${
                darkMode ? "bg-red-900/20 text-red-200" : "bg-red-50 text-red-600"
              }`}
            >
              {error}
            </motion.div>
          ) : loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto space-y-4"
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse rounded-xl overflow-hidden shadow-lg h-24 ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-2xl mx-auto space-y-4 px-2 sm:px-4"
            >
              {activeTab === "memes" ? (
                topMemes.map((meme, index) => (
                  <motion.div
                    key={meme.id}
                    variants={itemVariants}
                    className={`relative rounded-xl overflow-hidden shadow-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="absolute top-2 left-2 z-10">
                      {getRankDisplay(index + 1)}
                    </div>
                    <div className="flex items-center p-4">
                      <div className="flex-1">
                        <MiniMemeCard meme={meme} rank={index + 1} />
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                topUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    variants={itemVariants}
                    className={`flex items-center p-4 rounded-xl shadow-lg ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <div className="absolute top-2 left-2 z-10">
                      {getRankDisplay(index + 1)}
                    </div>
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full mr-4 ${getRankStyle(index + 1)}`}>
                      {getRankIcon(index + 1) || (
                        <FaUser className="w-5 h-5 text-current" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {user.username}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {user.totalLikes} likes
                        </span>
                        <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {user.memeCount} memes
                        </span>
                      </div>
                    </div>
                    <FaMedal className={`w-5 h-5 ${index < 3 ? "text-yellow-500" : "text-gray-400"}`} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Leaderboard;
