import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import "./VideoCard.css";
import { useDispatch, useSelector } from "react-redux";
import { addingToWatchLater } from "../../Store/WatchLaterSlice";

const VideoCard = ({ videosData }) => {
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  // console.log(token);

  const { _id, title, creator, views, monthAgo, img } = videosData;
  const [watched, setWatched] = useState(false);

  function watchLaterHandler() {
    console.log(token);
    setWatched(() => true);
    dispatch(addingToWatchLater({ video: videosData, token: token }));
  }
  function watchedLaterHandler() {
    console.log(token);
    setWatched(() => false);
    dispatch(addingToWatchLater({ video: videosData, token: token }));
  }

  return (
    <div className="videoCard__container">
      <div className="thumbNail__container">
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
          <TbPlaylistAdd className="icon__playList" />
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
