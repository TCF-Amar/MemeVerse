import axios from 'axios';

const BASE_URL = 'https://api.imgflip.com';

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
        likes: Math.floor(Math.random() * 1000), // Simulated likes since API doesn't provide this
        comments: Math.floor(Math.random() * 100), // Simulated comments
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
          likes: Math.floor(Math.random() * 1000),
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
        likes: Math.floor(Math.random() * 1000),
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
  }
};
