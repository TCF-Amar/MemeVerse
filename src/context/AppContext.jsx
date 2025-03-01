import React, { createContext, useContext, useState, useEffect } from "react";

// Context Create Karo
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  // ✅ Dark Mode State (Local Storage ke sath)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      localStorage.setItem("darkMode", !prevMode);
      return !prevMode;
    });
  };

  // ✅ User Authentication State
  const [user, setUser] = useState(null);

  // ✅ Meme Data Store (API se aayega)
  const [memes, setMemes] = useState([]);

  // ✅ Fetch Memes from API
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setMemes(data.data.memes);
      } catch (error) {
        console.error("Error fetching memes:", error);
      }
    };
    fetchMemes();
  }, []);

  return (
    <AppContext.Provider
      value={{ darkMode, toggleDarkMode, user, setUser, memes }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for Accessing Context
export const useAppContext = () => {
  return useContext(AppContext);
};
