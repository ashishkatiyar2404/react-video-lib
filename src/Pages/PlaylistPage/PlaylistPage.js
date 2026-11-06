import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import { FaTrash } from "react-icons/fa";
import {
  deletingPlaylist,
  fetchingAllPlaylists,
  selectAllPlaylists,
} from "../../Store/PlayListSLice";
import "./PlaylistPage.css";
import VideoCard from "../../Components/VideoCard/VideoCard";

const PlaylistPage = () => {
  const dispatch = useDispatch();
  const playlist = useSelector(selectAllPlaylists);
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchingAllPlaylists({ token }));
    }
  }, [dispatch, token]);

  const deletingWholePlaylist = (playlistId) => {
    if (token && window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletingPlaylist({ token, playlistId }));
    }
  };

  return (
    <div className="playlist_management_container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <main className="playlist_container">
        {playlist?.length > 0 ? (
          playlist.map((everyPlaylist) => (
            <section className="playlistVideo" key={everyPlaylist._id}>
              <div className="playlistName_title">
                <h2>{everyPlaylist.title}</h2>
                <button
                  type="button"
                  onClick={() => deletingWholePlaylist(everyPlaylist._id)}
                  title="Delete playlist"
                  aria-label={`Delete playlist ${everyPlaylist.title}`}
                  style={{ background: "none", border: "none", padding: 0 }}
                >
                  <FaTrash className="playlistDeleteIcon" />
                </button>
              </div>
              <div className="perticularPlaylistVideo">
                {everyPlaylist.videos?.map((videosData) => (
                  <VideoCard videosData={videosData} key={videosData._id} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="noPlayList_exist">
            <p>No playlists found.</p>
            <Link to="/LandingPage">Explore anime videos to add to a playlist</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlaylistPage;
