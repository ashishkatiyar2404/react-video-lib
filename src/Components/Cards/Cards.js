import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deletingWatchLater } from "../../Store/WatchLaterSlice";

const Cards = ({ videos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  function deleteHandler(e) {
    e.preventDefault();
    if (user.token) {
      dispatch(deletingWatchLater({ videoID: videos._id, token: user.token }));
    }
  }
  return (
    <div className="videoCard__container">
      <div className="thumbNail__container">
        <Link to={`/video/${videos._id}`}>
          <img
            className="thumbNailIMG"
            src={`https://i.ytimg.com/vi/${videos._id}/hqdefault.jpg`}
            alt=""
          />
        </Link>
      </div>
      <div className="profileAndCreator">
        <div className="profile_img">
          <img src={videos.img} alt={videos.title} />
        </div>
        <div className="creator">
          <p>{videos.title}</p>
          <TbPlaylistAdd className="icon__playList" />
        </div>
      </div>
      <div className="viewsAndMonth">
        <p className="creator-container">
          {videos.creator} <BsFillCheckCircleFill />
        </p>
        <p>
          &nbsp;&nbsp;{videos.views}
          <BsDot />
          {videos.monthAgo}
        </p>
        <p>
          <RiDeleteBin5Line
            className="delete_icon icon__watchLater"
            onClick={deleteHandler}
          />
        </p>
      </div>
    </div>
  );
};

export default Cards;
