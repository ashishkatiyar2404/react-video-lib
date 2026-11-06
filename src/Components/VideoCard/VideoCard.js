import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import "./VideoCard.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addingToWatchLater,
  deletingWatchLater,
} from "../../Store/WatchLaterSlice";
import { addingToHistory } from "../../Store/HistorySlice";

const DEFAULT_AVATAR = (creator) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    creator || "Anime"
  )}&backgroundColor=ffd5dc,c0aede,ffdfbf`;

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=640&auto=format&fit=crop&q=80";

const VideoCard = ({ videosData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const watchLaterList = useSelector((store) => store.watch?.watchLater || []);
  const { _id, title, creator, views, monthAgo, img, category } = videosData;

  const isWatched = watchLaterList.some((item) => item._id === _id);

  function handleWatchLaterToggle(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!token) {
      alert("Please login first to manage Watch Later.");
      navigate("/Login");
      return;
    }

    if (isWatched) {
      dispatch(deletingWatchLater({ videoID: _id, token }));
    } else {
      dispatch(addingToWatchLater({ video: videosData, token }));
    }
  }

  function handleCardClick() {
    if (token) {
      dispatch(addingToHistory({ video: videosData, token }));
    }
  }

  return (
    <article className="videoCard__container">
      <div className="thumbNail__container">
        <Link to={`/video/${_id}`} onClick={handleCardClick} aria-label={title}>
          <img
            className="thumbNailIMG"
            src={`https://i.ytimg.com/vi/${_id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_THUMBNAIL;
            }}
          />
          {category && <span className="videoCard_badge">{category}</span>}
        </Link>
      </div>

      <div className="videoCard_details">
        <div className="profile_img">
          <img
            src={img || DEFAULT_AVATAR(creator)}
            alt={creator}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_AVATAR(creator);
            }}
          />
        </div>
        <div className="videoCard_meta">
          <h3 className="videoCard_title">
            <Link to={`/video/${_id}`} onClick={handleCardClick}>
              {title}
            </Link>
          </h3>

          <p className="creator-container">
            <span>{creator}</span>
            <BsFillCheckCircleFill className="verified-icon" />
          </p>

          <div className="viewsAndMonth">
            <span className="views-info">
              {views} <BsDot /> {monthAgo}
            </span>
            <button
              type="button"
              className="icon__watchLater"
              onClick={handleWatchLaterToggle}
              title={isWatched ? "Remove from Watch Later" : "Add to Watch Later"}
              aria-label={isWatched ? "Remove from Watch Later" : "Add to Watch Later"}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              {isWatched ? (
                <MdWatchLater className="active" />
              ) : (
                <MdOutlineWatchLater />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(VideoCard);
