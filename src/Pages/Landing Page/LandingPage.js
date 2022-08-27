import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./LandingPage.css";
import { STATUSES, fetchingVideos } from "../../Store/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import VideoCard from "../../Components/VideoCard/VideoCard";

const LandingPage = () => {
  const [categorySelected, setCategorySelected] = useState("All");

  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.video);
  // console.log(STATUSES);
  // console.log(fetchingVideos());
  // console.log(data);
  useEffect(() => {
    dispatch(fetchingVideos());
  }, [dispatch]);

  function allVideos(categorySelected, videoArr) {
    return categorySelected !== "All"
      ? videoArr.filter((item) => item.category === categorySelected)
      : videoArr;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Masla Hogya Ji</h2>;
  }

  return (
    <div className="VideoLanding__Container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="landing__videos">
        <div className="category_btn_container">
          <button
            className="All_Selected"
            onClick={() => setCategorySelected("All")}
          >
            All
          </button>
          <button
            className="Funny_Selected"
            onClick={() => setCategorySelected("Naruto")}
          >
            Naruto Uzumaki
          </button>
          <button
            className="Facts_Selected"
            onClick={() => setCategorySelected("Itachi")}
          >
            Itachi Uchiha
          </button>
          <button
            className="Interview_Selected"
            onClick={() => setCategorySelected("Akatsuki")}
          >
            Akatsuki
          </button>
          <button
            className="Interview_Selected"
            onClick={() => setCategorySelected("Sasuke")}
          >
            Sasuke Uchiha
          </button>
          <button
            className="Interview_Selected"
            onClick={() => setCategorySelected("Madara Uchiha")}
          >
            Madara Uchiha
          </button>
        </div>
        <div className="all_Videos_Container">
          {allVideos(categorySelected, data).map((videoItem) => {
            return <VideoCard videosData={videoItem} key={videoItem._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
