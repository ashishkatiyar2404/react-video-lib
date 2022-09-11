import { useEffect } from "react";
import Mockman from "mockman-js";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LandingPage from "./Pages/Landing Page/LandingPage";
import Login from "./Pages/Authentication/Login/Login";
import Signup from "./Pages/Authentication/SignUp/Signup";
import WatchLater from "./Pages/WatchLater/WatchLater";
import History from "./Pages/History/History";
import SingleVideoPage from "./Pages/SingleVideoPage/SingleVideoPage";
import Likes from "./Pages/Likes/Likes";
import PlaylistPage from "./Pages/PlaylistPage/PlaylistPage";
import AuthRequire from "./Pages/Authentication/RequiredAuth";

function App() {
  useEffect(() => {
    document.title = "Wave Library";
  });
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Signup />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/video/:videoID" element={<SingleVideoPage />} />

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
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
