import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaMagic, FaImage } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import { memeApi } from '../api/memeApi';
import { localStorageService } from '../utils/localStorage';

const MemeUploader = () => {
  const { darkMode } = useAppContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('image/') || file.type === 'image/gif')) {
      setSelectedFile(file);
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image or GIF file');
    }
  };

  const generateAICaption = async () => {
    if (!selectedFile) return;
    setIsGenerating(true);
    try {
      const caption = await memeApi.generateCaption(selectedFile.name);
      setCaption(caption);
    } catch (error) {
      setError('Failed to generate caption. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    const newMeme = {
      id: Date.now(),
      url: preview,
      name: caption || 'My Meme',
      timestamp: new Date().toISOString(),
    };

    localStorageService.addUploadedMeme(newMeme);
    setSelectedFile(null);
    setPreview('');
    setCaption('');
  };

  return (
    <div className={`max-w-2xl mx-auto p-6 rounded-lg shadow-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="space-y-6">
        {/* File Input */}
        <div className="flex justify-center">
          <label className={`w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer ${
            darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
          }`}>
            <FaImage className="w-8 h-8 mb-2 text-gray-500" />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Click to upload a meme
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*,.gif"
              onChange={handleFileSelect}
            />
          </label>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-96 mx-auto rounded-lg"
            />
          </div>
        )}

        {/* Caption Input */}
        <div>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            className={`w-full p-2 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
            rows="3"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
       
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white disabled:opacity-50`}
          >
            <FaUpload />
            Upload Meme
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default MemeUploader;
