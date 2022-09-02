import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LandingPage from "./Pages/Landing Page/LandingPage";
import Login from "./Pages/Authentication/Login/Login";
import Signup from "./Pages/Authentication/SignUp/Signup";
import WatchLater from "./Pages/WatchLater/WatchLater";

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
        <Route path="/WatchLater" element={<WatchLater />} />
      </Routes>
    </div>
  );
}

export default App;
