import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import LoadingFallback from "./Components/LoadingFallback/LoadingFallback";
import AuthRequire from "./Pages/Authentication/RequiredAuth";

// Core routes loaded immediately
import Home from "./Pages/Home/Home";
import LandingPage from "./Pages/Landing Page/LandingPage";

// Lazy-loaded routes for performance & code splitting
const SingleVideoPage = lazy(() =>
  import("./Pages/SingleVideoPage/SingleVideoPage")
);
const PlaylistPage = lazy(() => import("./Pages/PlaylistPage/PlaylistPage"));
const History = lazy(() => import("./Pages/History/History"));
const Likes = lazy(() => import("./Pages/Likes/Likes"));
const WatchLater = lazy(() => import("./Pages/WatchLater/WatchLater"));
const Login = lazy(() => import("./Pages/Authentication/Login/Login"));
const Signup = lazy(() => import("./Pages/Authentication/SignUp/Signup"));
const Mockman = lazy(() => import("mockman-js"));

function App() {
  useEffect(() => {
    document.title = "Wave Library - Anime Video Streaming";
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />

          {/* Video watch routes */}
          <Route path="/video/:videoID" element={<SingleVideoPage />} />
          <Route path="/watch/:videoID" element={<SingleVideoPage />} />

          {/* Protected Library Routes */}
          <Route
            path="/LikedVideos"
            element={
              <AuthRequire>
                <Likes />
              </AuthRequire>
            }
          />
          <Route
            path="/PlaylistPage"
            element={
              <AuthRequire>
                <PlaylistPage />
              </AuthRequire>
            }
          />
          <Route
            path="/playlists"
            element={
              <AuthRequire>
                <PlaylistPage />
              </AuthRequire>
            }
          />
          <Route
            path="/WatchLater"
            element={
              <AuthRequire>
                <WatchLater />
              </AuthRequire>
            }
          />
          <Route
            path="/History"
            element={
              <AuthRequire>
                <History />
              </AuthRequire>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRequire>
                <History />
              </AuthRequire>
            }
          />

          <Route path="/mockapi" element={<Mockman />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
