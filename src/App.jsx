import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx"; // Updated extension
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MemeDetails from "./pages/MemeDetails";

function App() {
  return (
    <AppProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/meme/:id" element={<MemeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
