import React from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import SideBar from "../../Components/SideBar/SideBar";
import "./WatchLater.css";

const WatchLater = () => {
  const watchLaterVideos = useSelector((store) => store.watch.watchLater);
  console.log(watchLaterVideos);
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
        <div>Add some videos</div>
      )}
    </div>
  );
};

export default WatchLater;
