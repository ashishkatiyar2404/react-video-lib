import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { removingDataFromHistory } from "../../Store/HistorySlice";

const HistoryCards = ({ videos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  function deleteHistoryHandler(e) {
    e.preventDefault();
    if (user.token) {
      dispatch(
        removingDataFromHistory({ videoID: videos._id, token: user.token })
      );
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
        </div>
      </div>
      <div className="viewsAndMonth">
        <p className="creator-container">{videos.creator}</p>
        <p>
          &nbsp;&nbsp;{videos.views}
          <BsDot />
          {videos.monthAgo}
        </p>
        <p>
          <TiDelete
            className="delete_icon icon__watchLater"
            onClick={deleteHistoryHandler}
          />
        </p>
      </div>
    </div>
  );
};

export default HistoryCards;
