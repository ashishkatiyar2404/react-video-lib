import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addingVideoToPlaylist,
  deletingPlaylist,
  removingVideoFromPlaylist,
  selectAllPlaylists,
} from "../../Store/PlayListSLice";
import "./Modal.css";
import PlaylistInputForm from "./PlaylistInputForm";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ setOpenModal, video }) => {
  const playlistsData = useSelector(selectAllPlaylists);
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const updatingPlaylist = (e, videoItem, playlistId) => {
    if (e.target.checked) {
      dispatch(addingVideoToPlaylist({ video: videoItem, playlistId, token }));
    } else {
      dispatch(
        removingVideoFromPlaylist({ videoId: videoItem._id, playlistId, token })
      );
    }
  };

  const deletePlaylist = (playlistId) => {
    if (window.confirm("Delete this playlist?")) {
      dispatch(deletingPlaylist({ token, playlistId }));
    }
  };

  return (
    <div
      className="modal"
      onClick={() => setOpenModal(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Add to Playlist"
    >
      <div
        className="modal_playlist"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close_btn_modal">
          <p style={{ margin: 0, fontWeight: 700 }}>Add to playlist:</p>
          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="cursor_pointer"
            style={{ background: "none", border: "none", color: "inherit", padding: 0 }}
            aria-label="Close modal"
          >
            <AiFillCloseCircle className="playlist_close_btn" size={22} />
          </button>
        </div>

        <div style={{ margin: "1rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {playlistsData?.length > 0 ? (
            playlistsData.map((playlist) => {
              const isInPlaylist = playlist.videos?.some(
                (v) => v._id === video?._id
              );
              return (
                <div className="modalPlaylist_container" key={playlist._id}>
                  <label
                    htmlFor={playlist._id}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                  >
                    <input
                      type="checkbox"
                      id={playlist._id}
                      className="input_playlist"
                      defaultChecked={isInPlaylist}
                      onChange={(e) => updatingPlaylist(e, video, playlist._id)}
                    />
                    <span>{playlist.title}</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => deletePlaylist(playlist._id)}
                    style={{ background: "none", border: "none", color: "#fca5a5", cursor: "pointer" }}
                    aria-label={`Delete ${playlist.title}`}
                  >
                    <FaTrash className="delplaylistNameIcon" />
                  </button>
                </div>
              );
            })
          ) : (
            <p style={{ fontSize: "0.88rem", opacity: 0.85, margin: "0.5rem 0" }}>
              No playlists created yet. Create one below!
            </p>
          )}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "0.75rem" }}>
          <p style={{ margin: "0 0 0.5rem 0", fontWeight: 600 }}>Create new playlist:</p>
          <PlaylistInputForm className="input_playlist" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
