import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryCards from "../../Components/HistoryCards/HistoryCards";
import SideBar from "../../Components/SideBar/SideBar";
import {
  clearAllHistory,
  fetchingHistory,
  selectAllHistory,
} from "../../Store/HistorySlice";
import "./History.css";

const History = () => {
  const dispatch = useDispatch();
  const historyVideos = useSelector(selectAllHistory);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchingHistory({ token: user.token }));
    }
  }, [dispatch, user?.token]);

  function clearAllHandler(e) {
    e.preventDefault();
    if (user?.token && window.confirm("Are you sure you want to clear your entire watch history?")) {
      dispatch(clearAllHistory({ token: user.token }));
    }
  }

  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>

      <main className="clearAll_btn">
        <div className="history_header_row">
          <h1 className="history_page_title">Watch History</h1>
          {historyVideos?.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={clearAllHandler}
              sx={{ textTransform: "none", borderRadius: "8px" }}
            >
              Clear All History
            </Button>
          )}
        </div>

        {historyVideos?.length > 0 ? (
          <section
            className="watchLaterVideos__container"
            aria-label="Watched Anime List"
          >
            {historyVideos.map((videos) => (
              <HistoryCards videos={videos} key={videos._id} />
            ))}
          </section>
        ) : (
          <div className="noPlayList_exist">
            <p>Your watch history is empty.</p>
            <Link to="/LandingPage">Explore videos to start watching</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
