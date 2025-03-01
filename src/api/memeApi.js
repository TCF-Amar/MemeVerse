import axios from 'axios';

const BASE_URL = 'https://api.imgflip.com';

// Base meme like counts (simulated persistent data)
const BASE_MEME_LIKES = {
  '181913649': 9876, // Drake Hotline Bling
  '87743020': 8654,  // Two Buttons
  '112126428': 7823, // Distracted Boyfriend
  '129242436': 7654, // Change My Mind
  '124822590': 6543, // Left Exit 12 Off Ramp
  '217743513': 5987, // UNO Draw 25 Cards
  '131087935': 5876, // Running Away Balloon
  '247375501': 5432, // Buff Doge vs. Cheems
  '222403160': 4987, // Bernie I Am Once Again Asking
  '119139145': 4765, // Blank Nut Button
};

// Simulated user data
const TOP_USERS = [
  { id: 1, username: "MemeKing", totalLikes: 15432, memeCount: 45 },
  { id: 2, username: "MemeQueen", totalLikes: 12543, memeCount: 38 },
  { id: 3, username: "DankMaster", totalLikes: 10987, memeCount: 52 },
  { id: 4, username: "MemeCreator", totalLikes: 9876, memeCount: 29 },
  { id: 5, username: "MemeLord", totalLikes: 8765, memeCount: 33 },
  { id: 6, username: "MemeArtist", totalLikes: 7654, memeCount: 27 },
  { id: 7, username: "MemePro", totalLikes: 6543, memeCount: 31 },
  { id: 8, username: "MemeGuru", totalLikes: 5432, memeCount: 25 },
  { id: 9, username: "MemeWizard", totalLikes: 4321, memeCount: 22 },
  { id: 10, username: "MemeMaster", totalLikes: 3210, memeCount: 19 }
];

export const memeApi = {
  getTrendingMemes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_memes`);
      const memes = response.data.data.memes.map(meme => ({
        id: meme.id,
        title: meme.name,
        url: meme.url,
        width: meme.width,
        height: meme.height,
        boxCount: meme.box_count,
        likes: BASE_MEME_LIKES[meme.id] || Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
      }));
      return memes;
    } catch (error) {
      console.error('Error fetching memes:', error);
      return [];
    }
  },

  searchMemes: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/get_memes`);
      const memes = response.data.data.memes
        .filter(meme => meme.name.toLowerCase().includes(query.toLowerCase()))
        .map(meme => ({
          id: meme.id,
          title: meme.name,
          url: meme.url,
          width: meme.width,
          height: meme.height,
          boxCount: meme.box_count,
          likes: BASE_MEME_LIKES[meme.id] || Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 100),
        }));
      return memes;
    } catch (error) {
      console.error('Error searching memes:', error);
      return [];
    }
  },

  getMemeById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/get_memes`);
      const meme = response.data.data.memes.find(m => m.id === id);
      if (!meme) return null;
      
      return {
        id: meme.id,
        title: meme.name,
        url: meme.url,
        width: meme.width,
        height: meme.height,
        boxCount: meme.box_count,
        likes: BASE_MEME_LIKES[meme.id] || Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
      };
    } catch (error) {
      console.error('Error fetching meme by id:', error);
      return null;
    }
  },

  createCustomMeme: async (templateId, texts) => {
    try {
      const params = new URLSearchParams({
        template_id: templateId,
        username: 'memeverse_demo', // You should replace these with actual credentials
        password: 'demo123',        // from imgflip.com
      });

      // Add text boxes
      texts.forEach((text, index) => {
        params.append(`boxes[${index}][text]`, text);
      });

      const response = await axios.post(`${BASE_URL}/caption_image`, params);
      return response.data.data.url;
    } catch (error) {
      console.error('Error creating custom meme:', error);
      return null;
    }
  },

  getTopUsers: async () => {
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return TOP_USERS;
  }
};
