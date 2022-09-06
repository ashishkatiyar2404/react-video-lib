import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./SingleVideoPage.css";
import ReactPlayer from "react-player/youtube";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { addingToHistory } from "../../Store/HistorySlice";
import { MdPlaylistAdd } from "react-icons/md";
import { AiOutlineLike, AiFillDislike } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { addingLikes, removingLikes } from "../../Store/LikeSlice";

const SingleVideoPage = () => {
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const { likes } = useSelector((store) => store.like);

  let { videoID } = useParams();
  const dispatch = useDispatch();
  const [videoInfo, setVideoInfo] = useState(null);
  // console.log(videoInfo);

  // USE EFFECT?
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/video/${videoID}`);
        console.log("apun hogya");
        setVideoInfo(response.data.video);
      } catch (ERROR) {
        console.log("MAI DIKKT DUNGA", ERROR);
      }
    })();
  }, [videoID]);

  const ifAlreadyLiked = (likes, videoId) => {
    return likes.some((item) => item._id === videoId);
  };

  const likeHandler = (e) => {
    e.preventDefault();
    if (token) {
      if (ifAlreadyLiked(likes, videoID)) {
        dispatch(removingLikes({ videoId: videoID, token: token }));
      } else {
        dispatch(addingLikes({ videoInfo: videoInfo, token: token }));
      }
      return;
    }
  };

  const [alreadyLike, setPresentInLikes] = useState(
    ifAlreadyLiked(likes, videoID)
  );

  useEffect(() => {
    if (ifAlreadyLiked(likes, videoID)) {
      setPresentInLikes(true);
    } else {
      setPresentInLikes(false);
    }
  }, [likes, videoID]);

  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="single_video_container">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoID}`}
          width={"100%"}
          // height="30rem"
          controls={true}
          style={{ aspectRatio: "auto" }}
          playing
          onPlay={() => dispatch(addingToHistory({ video: videoInfo, token }))}
        ></ReactPlayer>
        <section className="video_description">
          <div className="video_heading">
            <p>{videoInfo?.title}</p>
            <p className="like_dislike_playlist_icon">
              {alreadyLike ? (
                <AiFillDislike onClick={likeHandler} />
              ) : (
                <AiOutlineLike onClick={likeHandler} />
              )}
              <MdPlaylistAdd />
            </p>
          </div>

          <div className="video_channelProfile">
            <div className="img_container_videoID">
              <img src={videoInfo?.img} alt={videoInfo?.category} />
            </div>
            <div className="video_creator">{videoInfo?.creator} |</div>
            <div className="video_views">
              | {videoInfo?.views} <GoPrimitiveDot /> {videoInfo?.monthAgo}
            </div>
          </div>
          <div className="video_descrption">{videoInfo?.description}</div>
        </section>
      </div>
    </div>
  );
};

export default SingleVideoPage;
