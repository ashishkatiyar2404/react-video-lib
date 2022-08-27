import React from "react";
import { Link } from "react-router-dom";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import "./VideoCard.css";

const VideoCard = ({ videosData }) => {
  const { _id, title, creator, views, monthAgo, img } = videosData;
  console.log(videosData);
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
      </div>
    </div>
  );
};

export default VideoCard;
