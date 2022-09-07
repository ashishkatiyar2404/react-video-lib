import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import { fetchingAllPlaylists } from "../../Store/PlayListSLice";
import "./PlaylistPage.css";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((store) => store.playlist.playlistManagement);
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchingAllPlaylists({ token }));
    // eslint-disable-next-line
  }, []);
  console.log(playlist);

  return (
    <main className="playlist_management_container watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      {playlist.length > 0 ? (
        "yes there are"
      ) : (
        <div className="noPlayList_exist">
          No Playlist Exist <Link to="/LandingPage">Explore Videos</Link>
        </div>
      )}
    </main>
  );
};

export default PlaylistPage;
