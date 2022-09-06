import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removingLikes } from "../../Store/LikeSlice";
import { TiDelete } from "react-icons/ti";
// import { BsDot } from "react-icons/bs";
import "./LikeCard.css";

const LikeCard = ({ videos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  function removeLikeHandler(e) {
    e.preventDefault();
    if (user.token) {
      dispatch(removingLikes({ videoId: videos._id, token: user.token }));
    }
  }

  return (
    <div className="videoCard__container like_container">
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
        <div className="viewsAndMonth">
          <p>
            <TiDelete
              className="delete_icon icon__watchLater"
              onClick={removeLikeHandler}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default LikeCard;
