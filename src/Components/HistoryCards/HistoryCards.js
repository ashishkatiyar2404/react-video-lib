import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { removingDataFromHistory } from "../../Store/HistorySlice";
import "../VideoCard/VideoCard.css";

const DEFAULT_AVATAR = (creator) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    creator || "Anime"
  )}&backgroundColor=ffd5dc,c0aede,ffdfbf`;

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=640&auto=format&fit=crop&q=80";

const HistoryCards = ({ videos }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  function deleteHistoryHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    if (user?.token) {
      dispatch(
        removingDataFromHistory({ videoID: videos._id, token: user.token })
      );
    }
  }

  return (
    <article className="videoCard__container">
      <div className="thumbNail__container">
        <Link to={`/video/${videos._id}`} aria-label={videos.title}>
          <img
            className="thumbNailIMG"
            src={`https://i.ytimg.com/vi/${videos._id}/hqdefault.jpg`}
            alt={videos.title}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_THUMBNAIL;
            }}
          />
          {videos.category && <span className="videoCard_badge">{videos.category}</span>}
        </Link>
      </div>

      <div className="videoCard_details">
        <div className="profile_img">
          <img
            src={videos.img || DEFAULT_AVATAR(videos.creator)}
            alt={videos.creator}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_AVATAR(videos.creator);
            }}
          />
        </div>
        <div className="videoCard_meta">
          <h3 className="videoCard_title">
            <Link to={`/video/${videos._id}`}>{videos.title}</Link>
          </h3>

          <p className="creator-container">
            <span>{videos.creator}</span>
          </p>

          <div className="viewsAndMonth">
            <span className="views-info">
              {videos.views} <BsDot /> {videos.monthAgo}
            </span>
            <button
              type="button"
              className="delete_icon"
              onClick={deleteHistoryHandler}
              title="Remove from history"
              aria-label="Remove from history"
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <TiDelete size={24} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(HistoryCards);
