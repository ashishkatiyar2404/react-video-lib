import React, { useEffect, useMemo } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./LandingPage.css";
import { STATUSES, fetchingVideos } from "../../Store/videoSlice";
import {
  setSelectedCategory,
  selectSelectedCategory,
  selectFilteredVideos,
} from "../../Store/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../../Components/VideoCard/VideoCard";

const CATEGORIES = [
  "All",
  "Naruto",
  "Itachi",
  "Akatsuki",
  "Sasuke",
  "Madara Uchiha",
];

const LandingPage = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);
  const filteredVideos = useSelector(selectFilteredVideos);
  const status = useSelector((state) => state.video?.status);

  useEffect(() => {
    dispatch(fetchingVideos());
  }, [dispatch]);

  const skeletonPlaceholders = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i),
    []
  );

  return (
    <div className="VideoLanding__Container">
      <div className="bottom__container">
        <SideBar />
      </div>

      <main className="landing__videos">
        {/* YouTube-Style Chip Bar */}
        <section
          className="category_btn_container"
          aria-label="Filter by Anime Category"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`category_chip ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => dispatch(setSelectedCategory(category))}
            >
              {category === "All" ? "All Anime" : category}
            </button>
          ))}
        </section>

        {/* Video Feed / Skeletons */}
        {status === STATUSES.LOADING && filteredVideos.length === 0 ? (
          <div className="skeleton_grid" aria-label="Loading anime videos...">
            {skeletonPlaceholders.map((idx) => (
              <div key={idx} className="skeleton_card">
                <div className="skeleton_thumb" />
                <div className="skeleton_details">
                  <div className="skeleton_avatar" />
                  <div className="skeleton_text_group">
                    <div className="skeleton_line" />
                    <div className="skeleton_line short" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : status === STATUSES.ERROR && filteredVideos.length === 0 ? (
          <div className="noPlayList_exist">
            <h2>Unable to load videos</h2>
            <p>Please check your connection and try again.</p>
            <button
              type="button"
              className="category_chip active"
              onClick={() => dispatch(fetchingVideos())}
              style={{ marginTop: "1rem" }}
            >
              Retry
            </button>
          </div>
        ) : (
          <section
            className="all_Videos_Container"
            aria-label="Anime Video Collection"
          >
            {filteredVideos.map((videoItem) => (
              <VideoCard videosData={videoItem} key={videoItem._id} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
