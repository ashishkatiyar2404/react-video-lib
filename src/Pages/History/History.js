import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  console.log(historyVideos);
  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="clearAll_btn">
        <Button onClick={clearAllHandler}>Clear All</Button>
        {historyVideos.length > 0 ? (
          <div className="watchLaterVideos__container">
            {historyVideos.map((videos) => (
              <HistoryCards videos={videos} />
            ))}
          </div>
        ) : (
          <div>Add some videos</div>
        )}
      </div>
    </div>
  );
};

export default History;
