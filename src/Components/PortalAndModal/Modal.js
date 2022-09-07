import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addingVideoToPlaylist,
  deletingPlaylist,
  removingVideoFromPlaylist,
} from "../../Store/PlayListSLice";
import "./Modal.css";
import PlaylistInputForm from "./PlaylistInputForm";

const Modal = ({ setOpenModal, video }) => {
  const playlistsData = useSelector(
    (state) => state.playlist.playlistManagement
  );
  const {
    user: { token },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const updatingPlaylist = (e, video, playlistId) => {
    e.target.checked
      ? addVideoToPlayList(video, playlistId)
      : removeVideoFromPlayList(video._id, playlistId);
  };
  const addVideoToPlayList = async (video, playlistId) => {
    dispatch(addingVideoToPlaylist({ video, playlistId, token }));
    return null;
  };
  const removeVideoFromPlayList = async (videoId, playlistId) => {
    dispatch(removingVideoFromPlaylist({ videoId, playlistId, token }));
    return null;
  };

  const deletePlaylist = async (playlistId) => {
    dispatch(deletingPlaylist({ token, playlistId }));
    return null;
  };

  return (
    <div className="modal">
      <div className="modal-playlist">
        <div className="close-btn-modal">
          <p onClick={() => setOpenModal(false)} className="cursor-pointer">
            <span className="playlist-close-btn">X</span>
          </p>
        </div>
        <div>
          <p>Add to existing playlist :</p>
          {playlistsData.map((playlist) => (
            <div className="modalPlaylist-container" key={playlist._id}>
              <div>
                <input
                  type="checkbox"
                  id={playlist._id}
                  className="input-playlist"
                  onChange={(e) => {
                    updatingPlaylist(e, video, playlist._id);
                  }}
                />
                <label htmlFor={playlist._id}> {playlist.title}</label>
              </div>

              <FaTrash
                className="delplaylistNameIcon white-text-color mt-1 fs-1"
                onClick={() => {
                  deletePlaylist(playlist._id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <p>Create new playlist :</p>
          <PlaylistInputForm className="input-playlist" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
