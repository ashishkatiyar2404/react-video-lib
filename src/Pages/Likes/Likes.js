import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LikeCard from "../../Components/LikeCards/LikeCard";
import SideBar from "../../Components/SideBar/SideBar";
import { fetchingLikes, selectAllLikes } from "../../Store/LikeSlice";
import "./Likes.css";

const Likes = () => {
  const dispatch = useDispatch();
  const likeVideos = useSelector(selectAllLikes);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchingLikes({ token: user.token }));
    }
  }, [dispatch, user?.token]);

  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>

      <main className="landing__videos">
        <h1 className="history_page_title" style={{ marginBottom: "1.25rem" }}>
          Liked Videos
        </h1>

        {likeVideos.length > 0 ? (
          <section
            className="likeVideos__container"
            aria-label="Liked anime videos"
          >
            {likeVideos.map((videos) => (
              <LikeCard videos={videos} key={videos._id} />
            ))}
          </section>
        ) : (
          <div className="no_like_videos">
            <p>You have not liked any videos yet.</p>
            <Link to="/LandingPage">Explore videos and like your favorites</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Likes;
