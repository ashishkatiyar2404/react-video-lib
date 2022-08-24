import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LandingPage from "./Pages/Landing Page/LandingPage";

function App() {
  useEffect(() => {
    document.title = "Wave Library";
  });
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/LandingPage" element={<LandingPage />} exact />
      </Routes>
    </div>
  );
}

export default App;
