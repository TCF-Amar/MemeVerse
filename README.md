
# MemeVerse - A React-Based Meme Explorer 🚀

MemeVerse is a multi-page, highly interactive website where users can explore, upload, and interact with memes. This project is built using **React + Vite** for a fast and optimized frontend experience.

## 🎯 Features & Functionalities

### ✅ Homepage (Landing Page)

- Displays trending memes dynamically using an API.
- Interactive animations & transitions with **Framer Motion**.
- Dark mode toggle for better user experience.

### ✅ Meme Explorer Page

- Infinite scrolling or pagination for meme browsing.
- Meme categories filter (**Trending, New, Classic, Random**).
- Search functionality with debounced API calls.
- Sorting options: **Likes, Date, Comments**.

### ✅ Meme Upload Page

- Upload memes in **image/gif format**.
- Add funny captions using a text editor.
- Option to generate AI-based meme captions using a meme-related API.
- Preview before uploading.

### ✅ Meme Details Page

- Dynamic routing (**/meme/:id**).
- Displays meme details, likes, comments, and sharing options.
- Like & Comment system (saved in **Local Storage**).
- Animated like button with persistence.

### ✅ User Profile Page

- Displays user-uploaded memes.
- Allows users to **edit profile info (Name, Bio, Profile Picture)**.
- View liked memes (saved in **Local Storage** or API).

### ✅ Leaderboard Page

- Displays **Top 10 most liked memes**.
- User rankings based on engagement (likes & comments).

### ✅ 404 Page (Easter Egg)

- A fun, **meme-based 404 error page** for non-existent routes.

## 🛠 Tech Stack

- **React (Hooks & Components)** - Frontend framework
- **Vite** - Fast build tool
- **Tailwind CSS** - For styling
- **Framer Motion** - Animations & transitions
- **Context API** - State management
- **Local Storage** - Store user preferences, likes & comments
- **Meme APIs (Imgflip, ImgBB, Cloudinary)** - Fetch memes
- **React Profiler** - Performance optimization

## 📂 Folder Structure

```
src/
├── components/      # Reusable components (Navbar, MemeCard, LikeButton)
├── pages/          # Main pages (Home, Explore, Upload, Profile)
├── hooks/          # Custom React hooks
├── context/        # Context API states (Dark Mode, User Data)
├── utils/          # Helper functions (API calls, LocalStorage handling)
├── assets/         # Static files (icons, images)
├── App.jsx         # Main App component
├── main.jsx        # Entry point
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/memeverse.git
cd memeverse
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start the Development Server

```bash
npm run dev
```

### 4️⃣ Build for Production

```bash
npm run build
```

## 🎨 UI/UX Enhancements

- **Smooth animations** using Framer Motion.
- **Lazy loading** for better performance.
- **Code Splitting** for optimized loading.

## 🔥 Contribution

Want to improve MemeVerse? Feel free to contribute! Fork the repo, make changes, and submit a PR. 🚀

## 📜 License

This project is open-source under the **MIT License**.
