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
import "./PlaylistPage.css";

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
    <main className="playlist_management_container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="playlist_container">
        {playlist.length > 0 ? (
          playlist.map((everyPlaylist) => {
            return (
              <div className="playlistVideo" key={everyPlaylist._id}>
                <div className="playlistName_title">
                  <h1>{everyPlaylist.title} </h1>
                  <p>
                    <FaTrash
                      className="playlistDeleteIcon"
                      onClick={() => deletingWholePlaylist(everyPlaylist._id)}
                    />
                  </p>
                </div>
                <div className="perticularPlaylistVideo">
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
      </div>
    </main>
  );
};

export default PlaylistPage;
