import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryCards from "../../Components/HistoryCards/HistoryCards";
import SideBar from "../../Components/SideBar/SideBar";
import { clearAllHistory } from "../../Store/HistorySlice";
import "./History.css";

const History = () => {
  const dispatch = useDispatch();
  const historyVideos = useSelector((store) => store.history.historyVideos);
  const { user } = useSelector((store) => store.auth);

  // CLEAR ALL HANDLER
  function clearAllHandler(e) {
    e.preventDefault();
    dispatch(clearAllHistory({ token: user.token }));
  }

  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="clearAll_btn">
        {historyVideos?.length > 0 ? (
          <Button onClick={clearAllHandler}>Clear All</Button>
        ) : (
          <div>
            No History Click on
            <Link className="text-decoration" to="/LandingPage">
              <Button className="explore_btn"> Explore more</Button>
            </Link>
            for Add some videos
          </div>
        )}
        {historyVideos.length > 0 ? (
          <div className="watchLaterVideos__container">
            {historyVideos.map((videos) => (
              <HistoryCards videos={videos} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default History;
