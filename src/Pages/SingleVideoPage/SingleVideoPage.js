import React, { useEffect, useState } from "react";
import "./SingleVideoPage.css";
import ReactPlayer from "react-player/youtube";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addingToHistory } from "../../Store/HistorySlice";
import { MdPlaylistAdd, MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsFillCheckCircleFill, BsDot } from "react-icons/bs";
import { addingLikes, removingLikes } from "../../Store/LikeSlice";
import {
  addingToWatchLater,
  deletingWatchLater,
} from "../../Store/WatchLaterSlice";
import { fetchingVideos } from "../../Store/videoSlice";
import PlaylistPortal from "../../Components/PortalAndModal/PlaylistPortal";

const SingleVideoPage = () => {
  const { videoID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { likes = [] } = useSelector((store) => store.like || {});
  const watchLaterList = useSelector((store) => store.watch?.watchLater || []);
  const allVideos = useSelector((store) => store.video?.data || []);

  const [videoInfo, setVideoInfo] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load recommendations if not yet loaded
  useEffect(() => {
    if (!allVideos.length) {
      dispatch(fetchingVideos());
    }
  }, [allVideos.length, dispatch]);

  // Fetch video data by ID with AbortController for cleanup
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const response = await axios.get(`/api/video/${videoID}`, {
          signal: controller.signal,
        });
        setVideoInfo(response.data.video);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // Fallback: search in local store if available
          const found = allVideos.find((item) => item._id === videoID);
          if (found) {
            setVideoInfo(found);
          }
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [videoID, allVideos]);

  const isLiked = likes.some((item) => item._id === videoID);
  const isWatched = watchLaterList.some((item) => item._id === videoID);

  const handleLikeToggle = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first to like videos.");
      navigate("/Login");
      return;
    }

    if (isLiked) {
      dispatch(removingLikes({ videoId: videoID, token }));
    } else {
      dispatch(addingLikes({ videoInfo, token }));
    }
  };

  const handleWatchLaterToggle = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first to save to Watch Later.");
      navigate("/Login");
      return;
    }

    if (isWatched) {
      dispatch(deletingWatchLater({ videoID, token }));
    } else {
      dispatch(addingToWatchLater({ video: videoInfo, token }));
    }
  };

  const handlePlaylistClick = (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first to manage playlists.");
      navigate("/Login");
      return;
    }
    setOpenModal(true);
  };

  // Up Next / Recommendations excluding current video
  const recommendations = allVideos.filter((v) => v._id !== videoID).slice(0, 8);

  return (
    <div className="watch_page_layout">
      {openModal && (
        <PlaylistPortal video={videoInfo} setOpenModal={setOpenModal} />
      )}

      {/* Primary Video & Details Column */}
      <main className="watch_primary_content">
        <div className="video_player_wrapper">
          <ReactPlayer
            className="react-player"
            url={`https://www.youtube.com/watch?v=${videoID}`}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
            onPlay={() => {
              if (token && videoInfo) {
                dispatch(addingToHistory({ video: videoInfo, token }));
              }
            }}
          />
        </div>

        <section className="watch_video_details">
          <h1 className="watch_video_title">
            {videoInfo?.title || (loading ? "Loading video..." : "Video")}
          </h1>

          <div className="watch_actions_bar">
            <div className="watch_channel_info">
              <img
                className="watch_channel_avatar"
                src={
                  videoInfo?.img ||
                  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
                    videoInfo?.creator || "Anime"
                  )}&backgroundColor=ffd5dc,c0aede,ffdfbf`
                }
                alt={videoInfo?.creator || "Channel"}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
                    videoInfo?.creator || "Anime"
                  )}&backgroundColor=ffd5dc,c0aede,ffdfbf`;
                }}
              />
              <div className="watch_channel_text">
                <span className="watch_creator_name">
                  {videoInfo?.creator}
                  <BsFillCheckCircleFill className="verified-icon" />
                </span>
                <span className="watch_meta_sub">
                  {videoInfo?.views} views <BsDot /> {videoInfo?.monthAgo}
                </span>
              </div>
            </div>

            <div className="watch_action_buttons">
              <button
                type="button"
                className={`watch_btn ${isLiked ? "active" : ""}`}
                onClick={handleLikeToggle}
                aria-label={isLiked ? "Unlike video" : "Like video"}
              >
                {isLiked ? <AiFillLike size={18} /> : <AiOutlineLike size={18} />}
                <span>{isLiked ? "Liked" : "Like"}</span>
              </button>

              <button
                type="button"
                className={`watch_btn ${isWatched ? "active" : ""}`}
                onClick={handleWatchLaterToggle}
                aria-label={isWatched ? "Remove from Watch Later" : "Save to Watch Later"}
              >
                {isWatched ? <MdWatchLater size={18} /> : <MdOutlineWatchLater size={18} />}
                <span>Watch Later</span>
              </button>

              <button
                type="button"
                className="watch_btn"
                onClick={handlePlaylistClick}
                aria-label="Save to playlist"
              >
                <MdPlaylistAdd size={18} />
                <span>Save</span>
              </button>
            </div>
          </div>

          <div className="watch_description_box">
            <div className="watch_description_header">
              {videoInfo?.views} views • {videoInfo?.monthAgo}
              {videoInfo?.category ? ` • #${videoInfo.category}` : ""}
            </div>
            <p style={{ margin: 0 }}>
              {videoInfo?.description || "No description provided."}
            </p>
          </div>
        </section>
      </main>

      {/* Up Next / Recommendations Column */}
      <aside className="watch_recommendations" aria-label="Up Next and Recommendations">
        <h2 className="watch_recommendations_header">Up Next</h2>
        <div className="recommendations_list">
          {recommendations.map((item) => (
            <Link
              key={item._id}
              to={`/video/${item._id}`}
              className="compact_video_card"
            >
              <div className="compact_thumb">
                <img
                  src={`https://i.ytimg.com/vi/${item._id}/hqdefault.jpg`}
                  alt={item.title}
                  loading="lazy"
                />
              </div>
              <div className="compact_info">
                <p className="compact_title">{item.title}</p>
                <p className="compact_creator">{item.creator}</p>
                <p className="compact_meta">
                  {item.views} <BsDot /> {item.monthAgo}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SingleVideoPage;
