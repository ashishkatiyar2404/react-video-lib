import { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
// import SideBar from "./Components/SideBar/SideBar";

function App() {
  useEffect(() => {
    document.title = "Wave Library";
  });
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
      </Routes>

      {/* <div className="bottom__container">
        <SideBar />
      </div> */}
    </div>
  );
}

export default App;
