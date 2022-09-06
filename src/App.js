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
        <Route path="/LikedVideos" element={<Likes />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/WatchLater" element={<WatchLater />} />
        <Route path="/History" element={<History />} />
        <Route path="/video/:videoID" element={<SingleVideoPage />} />
        <Route path="/mockapi" element={<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
