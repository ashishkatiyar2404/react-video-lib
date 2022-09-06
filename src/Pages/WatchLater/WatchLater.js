import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cards from "../../Components/Cards/Cards";
import SideBar from "../../Components/SideBar/SideBar";
import "./WatchLater.css";

const WatchLater = () => {
  const watchLaterVideos = useSelector((store) => store.watch.watchLater);
  // console.log(watchLaterVideos);
  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>

      {watchLaterVideos.length > 0 ? (
        <div className="watchLaterVideos__container">
          {watchLaterVideos.map((videos) => (
            <Cards videos={videos} />
          ))}
        </div>
      ) : (
        <div className="no_like_videos">
          No WatchLater Videos Click here for
          <Link className="text-decoration" to="/LandingPage">
            <Button className="explore_btn"> Explore more</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchLater;
