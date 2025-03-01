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
- Related memes suggestions.
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

- **React 19** - Frontend framework
- **Vite 6** - Fast build tool
- **Tailwind CSS** - For styling
- **Framer Motion** - Animations & transitions
- **React Router** - Navigation and routing
- **Context API** - State management
- **Local Storage** - Store user preferences, likes & comments
- **Imgflip API** - Fetch and create memes
- **React Icons** - Icon library
- **Axios** - HTTP client

## 📂 Project Structure

```
src/
├── components/      # Reusable components
│   ├── MemeCard/   # Meme display component
│   ├── NavBar/     # Navigation component
│   ├── SearchBar/  # Search component
│   └── MemeUploader/ # Upload component
├── pages/          # Main pages
│   ├── Home/       # Landing page
│   ├── Explore/    # Meme browsing
│   ├── Upload/     # Meme upload
│   ├── Profile/    # User profile
│   └── MemeDetails/ # Individual meme view
├── context/        # React Context
│   └── AppContext/ # App-wide state
├── api/           # API integration
│   └── memeApi.js # Meme API calls
├── utils/         # Utilities
│   └── localStorage.js # Local storage handling
└── assets/        # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/memeverse.git
cd memeverse
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:5173 to view the app

### Building for Production

```bash
npm run build
# or
yarn build
```

## 💾 Local Storage

The app uses localStorage for:
- User preferences (dark mode)
- Liked memes
- Comments
- User profile data

## 🔄 State Management

- **AppContext**: Manages global state (dark mode, user preferences)
- **Local Storage**: Persists user data and preferences
- **Component State**: Handles component-specific state

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Dark mode support
- Smooth animations and transitions
- Loading states and error handling
- Infinite scroll for better UX
- Image lazy loading
- Debounced search
- Interactive UI elements





## 🙏 Acknowledgments

- [Imgflip API](https://imgflip.com/api) for meme data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Icons](https://react-icons.github.io/react-icons/) for icons
