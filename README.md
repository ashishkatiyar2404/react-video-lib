<div align="center">
  <img src="public/favicon.svg" alt="Wave Library Logo" width="80" height="80" />
  
  # 🌊 Wave Library (AnimeStream)
  
  **A modern, YouTube-style responsive Anime Video Streaming web application.**

  [![Live Demo](https://img.shields.io/badge/demo-online-brightgreen.svg)](https://anime-stream-lib.netlify.app/)
  [![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-RTK-purple.svg)](https://redux-toolkit.js.org/)
  [![React Router](https://img.shields.io/badge/React%20Router-v6-red.svg)](https://reactrouter.com/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/)
  [![Netlify Status](https://img.shields.io/badge/Netlify-Deployed-00C7B7.svg)](https://anime-stream-lib.netlify.app/)

  ### 🔗 [Visit the Live Application](https://anime-stream-lib.netlify.app/)
</div>

---

## 📖 Overview

**Wave Library** is a feature-rich, high-performance video streaming web application designed with a YouTube-inspired user experience tailored for anime fans. Built with pure JavaScript (ES6+ / React 18) and Redux Toolkit, it provides seamless browsing, embedded video playback in cinema mode, category filtering, user playlists, watch history, and instant guest authentication.

---

## ✨ Features & Highlights

### 📱 Responsive YouTube-Style Shell & Layout
- **Dynamic Viewport Heights**: Employs `min-height: 100dvh` across all views, eliminating mobile browser address bar layout jumps and horizontal overflow bugs.
- **Adaptive Navigation**: Full sidebar on desktop screens (`>= 1024px`) gracefully collapses into a native-feeling bottom navigation bar on mobile devices (`< 768px`) with zero layout squishing.
- **Auto-Fitting Video Cards**: Modern CSS grid (`repeat(auto-fill, minmax(260px, 1fr))`) ensuring responsive column layouts across mobile (1 col), tablet (2–3 cols), and desktop (4+ cols).
- **Consistent 16:9 Aspect Ratios**: Strict `aspect-ratio: 16 / 9` cards with two-line title clamping (`-webkit-line-clamp: 2`), creator avatars, verified badges, and image fallback protection.

### 🎬 Cinema Mode Watch Page
- **Side-by-Side Cinema Player**: On desktop, enjoy the primary 16:9 embedded player on the left with an "Up Next / Recommendations" sidebar on the right.
- **Smart Mobile Stacking**: Automatically stacks recommendations cleanly underneath the player on screens `< 1024px` for optimal viewing.
- **Interactive Player Controls**: Like/unlike videos, add to Watch Later, create/manage playlists on the fly, and copy shareable links.

### ⚡ Redux Toolkit Modernization (100% Pure JavaScript)
- **Immer-Powered Slices**: Clean, immutable state management across `videosSlice`, `watchLaterSlice`, `playlistSlice`, `historySlice`, and `filterSlice`.
- **Async Thunk Data Flows**: Standardized `createAsyncThunk` asynchronous lifecycle handlers (`IDLE`, `LOADING`, `SUCCEEDED`, `ERROR`).
- **Memoized Selectors**: Highly optimized `createSelector` filtering (search query + category chip filters) preventing wasteful re-renders across the video feed.

### 🚀 Performance & Code Quality
- **Route Code Splitting**: Main views lazy-loaded via `React.lazy` and wrapped in `<Suspense>` with smooth loading indicators.
- **Image Optimization**: Native image lazy loading (`loading="lazy"`) and shimmer loading skeletons for seamless thumbnail delivery.
- **Lifecycle Cleanup**: Proper `useEffect` listener and timer cleanup preventing memory leaks.

### 🔐 Authentication & Instant Guest Login
- **One-Click Guest Login**: Dedicated guest login button that auto-populates credentials and bypasses browser form blocks.
- **MirageJS Mock Backend**: Fully functional JWT-based authentication flow with secure fallback secret handling.
- **Protected Routes**: Secure access for authenticated-only actions (Watch Later, Playlists, History, Profile).

### 🌐 Single Page App (SPA) Deep Routing
- **Zero 404s on Refresh**: Configured Netlify rewrites via `_redirects` and `netlify.toml` ensuring direct deep-links (e.g. `/LandingPage`, `/watch/:videoId`) refresh smoothly.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Core Framework** | React 18, Pure JavaScript (ES6+ / JSX) |
| **State Management** | Redux Toolkit (RTK), Immer, Reselect |
| **Routing** | React Router v6 (`useNavigate`, `useParams`, `useLocation`) |
| **Video Player** | ReactPlayer, YouTube Embedded API |
| **Styling** | Pure CSS3, CSS Modules, Flexbox & CSS Grid |
| **Mock API & Backend** | MirageJS, `jwt-encode`, MockBee |
| **Icons & Avatars** | React Icons, DiceBear Vector Avatars |
| **Hosting & CI/CD** | Netlify |

---

## 📁 Project Structure

```text
react-video-lib/
├── public/
│   ├── _redirects          # Netlify SPA rewrite configuration
│   ├── favicon.ico         # Legacy 32x32 browser favicon
│   ├── favicon.svg         # Crisp, high-DPI anime wave vector favicon
│   ├── index.html          # HTML shell & SEO/meta tags
│   └── manifest.json       # Web app manifest
├── src/
│   ├── backend/            # MirageJS mock API, db, controllers & auth
│   ├── components/         # Reusable UI components
│   │   ├── Card/           # Responsive 16:9 Video & Playlist Cards
│   │   ├── Category/       # Filter chips & category selectors
│   │   ├── Navbar/         # Header navigation bar & search
│   │   └── SideBar/        # Adaptive desktop sidebar / mobile bottom nav
│   ├── features/           # Redux Toolkit feature slices & selectors
│   │   ├── filter/         # Memoized video filtering slice
│   │   ├── history/        # Watch history slice
│   │   ├── playlist/       # Custom playlist management slice
│   │   ├── video/          # Core video feed slice
│   │   └── watchLater/     # Watch later slice
│   ├── pages/              # Lazy-loaded page views
│   │   ├── History/        # Watch history page
│   │   ├── Home/           # Hero landing & trending videos
│   │   ├── Login/          # Authentication & Guest login
│   │   ├── Playlist/       # User playlist collection
│   │   ├── SingleVideo/    # Cinema watch player & recommendations
│   │   └── Video/          # Full video library feed & search
│   ├── App.css             # Shell styling, responsive grids, themes
│   ├── App.js              # Router configuration with Suspense fallback
│   └── index.js            # React root & Redux Provider setup
├── netlify.toml            # Netlify deployment configuration
└── package.json            # Project dependencies & scripts
```

---

## 🚀 Getting Started

Follow these steps to run the application locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x, v18.x, or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/ashishkatiyar2404/react-video-lib.git
cd react-video-lib
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
Create a `.env` file in the root directory if you wish to override the default JWT secret:
```env
REACT_APP_JWT_SECRET=your_custom_jwt_secret_here
```

### 4. Run Development Server
```bash
npm start
```
The application will open automatically at [http://localhost:3000](http://localhost:3000).

### 5. Build for Production
```bash
npm run build
```
Creates an optimized production bundle inside the `build/` directory ready for deployment.

---

## 📐 Responsive Breakpoints

| Device Category | Screen Width | Shell Navigation | Video Feed Grid | Cinema Mode Watch |
|---|---|---|---|---|
| **Mobile** | `< 768px` | Fixed Bottom Bar | 1 Column Auto-Fit | Stacked Player & Recs |
| **Tablet** | `768px – 1023px` | Mini Sidebar / Top | 2–3 Columns Auto-Fit | Stacked Player & Recs |
| **Desktop** | `>= 1024px` | Persistent 200px Sidebar | 4+ Columns Auto-Fit | Side-by-Side Cinema Mode |

---

## 🤝 Contributing & Workflow

This project adheres to clean Git branching practices:
1. Feature branches follow descriptive naming conventions: `feat/...`, `fix/...`, or `docs/...`.
2. All pull requests are merged sequentially into `dev` after code review and build validation.
3. Production builds are tested to ensure zero compilation warnings or type conflicts.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
