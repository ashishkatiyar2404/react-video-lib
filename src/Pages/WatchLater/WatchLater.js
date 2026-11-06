import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Cards from "../../Components/Cards/Cards";
import SideBar from "../../Components/SideBar/SideBar";
import {
  fetchWatchLater,
  selectAllWatchLater,
} from "../../Store/WatchLaterSlice";
import "./WatchLater.css";

const WatchLater = () => {
  const dispatch = useDispatch();
  const watchLaterVideos = useSelector(selectAllWatchLater);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchWatchLater({ token: user.token }));
    }
  }, [dispatch, user?.token]);

  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>

      <main className="landing__videos">
        <h1 className="history_page_title" style={{ marginBottom: "1.25rem" }}>
          Watch Later
        </h1>

        {watchLaterVideos.length > 0 ? (
          <section
            className="watchLaterVideos__container"
            aria-label="Watch Later Anime Videos"
          >
            {watchLaterVideos.map((videos) => (
              <Cards videos={videos} key={videos._id} />
            ))}
          </section>
        ) : (
          <div className="no_like_videos">
            <p>Your Watch Later list is empty.</p>
            <Link to="/LandingPage">Explore videos to save for later</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default WatchLater;
