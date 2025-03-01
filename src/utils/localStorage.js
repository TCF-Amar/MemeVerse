const STORAGE_KEYS = {
  LIKED_MEMES: 'memeverse_liked_memes',
  COMMENTS: 'memeverse_comments',
  USER_PROFILE: 'memeverse_user_profile',
  DARK_MODE: 'memeverse_dark_mode',
  UPLOADED_MEMES: 'memeverse_uploaded_memes',
};

export const localStorageService = {
  // Liked Memes Management
  getLikedMemes: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_MEMES) || '[]');
    } catch (error) {
      console.error('Error getting liked memes:', error);
      return [];
    }
  },

  isMemeLiked: (memeId) => {
    try {
      const likedMemes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_MEMES) || '[]');
      return likedMemes.includes(memeId);
    } catch (error) {
      console.error('Error checking if meme is liked:', error);
      return false;
    }
  },

  toggleMemeLike: (memeId) => {
    try {
      const likedMemes = JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_MEMES) || '[]');
      const index = likedMemes.indexOf(memeId);
      
      if (index === -1) {
        likedMemes.push(memeId);
      } else {
        likedMemes.splice(index, 1);
      }
      
      localStorage.setItem(STORAGE_KEYS.LIKED_MEMES, JSON.stringify(likedMemes));
      return likedMemes.includes(memeId);
    } catch (error) {
      console.error('Error toggling meme like:', error);
      return false;
    }
  },

  // Comments Management
  getComments: (memeId) => {
    try {
      const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}');
      return allComments[memeId] || [];
    } catch (error) {
      console.error('Error getting comments:', error);
      return [];
    }
  },

  addComment: (memeId, comment) => {
    try {
      const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}');
      if (!allComments[memeId]) {
        allComments[memeId] = [];
      }
      
      const newComment = {
        id: Date.now(),
        text: comment,
        timestamp: new Date().toISOString(),
      };
      
      allComments[memeId].push(newComment);
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      return null;
    }
  },

  deleteComment: (memeId, commentId) => {
    try {
      const allComments = JSON.parse(localStorage.getItem(STORAGE_KEYS.COMMENTS) || '{}');
      if (!allComments[memeId]) return false;
      
      const commentIndex = allComments[memeId].findIndex(c => c.id === commentId);
      if (commentIndex === -1) return false;
      
      allComments[memeId].splice(commentIndex, 1);
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(allComments));
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      return false;
    }
  },

  // User Profile Management
  getUserProfile: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_PROFILE) || '{}');
    } catch (error) {
      console.error('Error getting user profile:', error);
      return {};
    }
  },

  updateUserProfile: (profile) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  },

  // Dark Mode Management
  getDarkMode: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.DARK_MODE) || 'false');
    } catch (error) {
      console.error('Error getting dark mode:', error);
      return false;
    }
  },

  setDarkMode: (isDark) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(isDark));
      return true;
    } catch (error) {
      console.error('Error setting dark mode:', error);
      return false;
    }
  },

  // Uploaded Memes Management
  getUploadedMemes: () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.UPLOADED_MEMES) || '[]');
    } catch (error) {
      console.error('Error getting uploaded memes:', error);
      return [];
    }
  },

  addUploadedMeme: (meme) => {
    try {
      const uploadedMemes = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPLOADED_MEMES) || '[]');
      const newMeme = {
        ...meme,
        id: `local_${Date.now()}`,
        uploadedAt: new Date().toISOString(),
        likes: 0,
        comments: 0
      };
      uploadedMemes.unshift(newMeme); // Add to beginning of array
      localStorage.setItem(STORAGE_KEYS.UPLOADED_MEMES, JSON.stringify(uploadedMemes));
      return newMeme;
    } catch (error) {
      console.error('Error adding uploaded meme:', error);
      return null;
    }
  },

  deleteUploadedMeme: (memeId) => {
    try {
      const uploadedMemes = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPLOADED_MEMES) || '[]');
      const filteredMemes = uploadedMemes.filter(meme => meme.id !== memeId);
      localStorage.setItem(STORAGE_KEYS.UPLOADED_MEMES, JSON.stringify(filteredMemes));
      return true;
    } catch (error) {
      console.error('Error deleting uploaded meme:', error);
      return false;
    }
  },

  updateUploadedMeme: (memeId, updates) => {
    try {
      const uploadedMemes = JSON.parse(localStorage.getItem(STORAGE_KEYS.UPLOADED_MEMES) || '[]');
      const memeIndex = uploadedMemes.findIndex(meme => meme.id === memeId);
      
      if (memeIndex === -1) return null;
      
      uploadedMemes[memeIndex] = {
        ...uploadedMemes[memeIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEYS.UPLOADED_MEMES, JSON.stringify(uploadedMemes));
      return uploadedMemes[memeIndex];
    } catch (error) {
      console.error('Error updating uploaded meme:', error);
      return null;
    }
  },

  // Clear all data
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }
};
