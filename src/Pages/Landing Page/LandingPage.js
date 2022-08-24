import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="VideoLanding__Container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="landing__videos">I am all videos</div>
    </div>
  );
};

export default LandingPage;
