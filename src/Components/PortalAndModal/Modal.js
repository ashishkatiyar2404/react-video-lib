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
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ setOpenModal, video }) => {
  const playlistsData = useSelector((state) => state.playlist.playlist);

  console.log(playlistsData);

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
  };
  const removeVideoFromPlayList = async (videoId, playlistId) => {
    dispatch(removingVideoFromPlaylist({ videoId, playlistId, token }));
  };

  const deletePlaylist = async (playlistId) => {
    dispatch(deletingPlaylist({ token, playlistId }));
  };

  return (
    <div className="modal">
      <div className="modal_playlist">
        <div className="close_btn_modal">
          <p>Add to existing playlist :-</p>
          <p onClick={() => setOpenModal(false)} className="cursor_pointer">
            <AiFillCloseCircle className="playlist_close_btn" />
          </p>
        </div>
        <div>
          {playlistsData?.map((playlist) => (
            <div className="modalPlaylist_container" key={playlist._id}>
              <div>
                <input
                  type="checkbox"
                  id={playlist._id}
                  className="input_playlist"
                  onChange={(e) => {
                    updatingPlaylist(e, video, playlist._id);
                  }}
                />
                <label htmlFor={playlist._id}> {playlist.title}</label>
              </div>

              <FaTrash
                className="delplaylistNameIcon white_text_color mt-1 fs-1"
                onClick={() => {
                  deletePlaylist(playlist._id);
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <p>Create new playlist :</p>
          <PlaylistInputForm className="input_playlist" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
