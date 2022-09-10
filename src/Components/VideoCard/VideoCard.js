import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { TbPlaylistAdd } from "react-icons/tb";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import "./VideoCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addingToWatchLater,
  deletingWatchLater,
} from "../../Store/WatchLaterSlice";
import { addingToHistory } from "../../Store/HistorySlice";

const VideoCard = ({ videosData }) => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const { _id, title, creator, views, monthAgo, img } = videosData;
  const [watched, setWatched] = useState(false);

  // ADDING TO WATCHLATER HANDLER
  function watchLaterHandler() {
    console.log(token);
    setWatched(() => true);
    dispatch(addingToWatchLater({ video: videosData, token: token }));
  }

  // UNDO WATCH LATER HANDLER
  function watchedLaterHandler() {
    console.log(token);
    setWatched(() => false);
    dispatch(deletingWatchLater({ videoID: videosData._id, token: token }));
  }

  // HISTORY HANDLER
  function historyHandler(e) {
    e.preventDefault();
    dispatch(addingToHistory({ video: videosData, token: token }));
  }

  return (
    <div className="videoCard__container">
      <div className="thumbNail__container" onClick={historyHandler}>
        <Link to={`/video/${_id}`}>
          <img
            className="thumbNailIMG"
            src={`https://i.ytimg.com/vi/${_id}/hqdefault.jpg`}
            alt=""
          />
        </Link>
      </div>
      <div className="profileAndCreator">
        <div className="profile_img">
          <img src={img} alt={title} />
        </div>
        <div className="creator">
          <p>{title}</p>
          {/* <TbPlaylistAdd className="icon__playList" /> */}
        </div>
      </div>
      <div className="viewsAndMonth">
        <p className="creator-container">
          {creator} <BsFillCheckCircleFill />
        </p>
        <p>
          &nbsp;&nbsp;{views}
          <BsDot />
          {monthAgo}
        </p>
        <p>
          {watched ? (
            <MdWatchLater
              className="icon__watchLater"
              onClick={watchedLaterHandler}
            />
          ) : (
            <MdOutlineWatchLater
              className="icon__watchLater"
              onClick={watchLaterHandler}
            />
          )}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
