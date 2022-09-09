import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import { FaTrash } from "react-icons/fa";
import {
  deletingPlaylist,
  fetchingAllPlaylists,
} from "../../Store/PlayListSLice";
import "./PlaylistPage.css";
import VideoCard from "../../Components/VideoCard/VideoCard";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const playlist = useSelector((store) => store.playlist.playlist);
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchingAllPlaylists({ token }));
    // eslint-disable-next-line
  }, []);
  // console.log(playlist, "d");

  // DELETING WHOLE PLAYLIST
  const deletingWholePlaylist = (playlistId) => {
    dispatch(deletingPlaylist({ token, playlistId }));
  };

  return (
    <main className="playlist_management_container watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      {playlist.length > 0 ? (
        playlist.map((everyPlaylist) => {
          return (
            <div className="playlistVideo" key={everyPlaylist._id}>
              <div className="playlistName-title">
                <h1>{everyPlaylist.title}</h1>
                <FaTrash
                  className="playlistDeleteIcon"
                  onClick={() => deletingWholePlaylist(everyPlaylist._id)}
                />
              </div>
              <div className="d-flex">
                {everyPlaylist.videos.map((videosData) => {
                  return (
                    <VideoCard videosData={videosData} key={videosData._id} />
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div className="noPlayList_exist">
          No Playlist Exist <Link to="/LandingPage">Explore Videos</Link>
        </div>
      )}
    </main>
  );
};

export default PlaylistPage;
