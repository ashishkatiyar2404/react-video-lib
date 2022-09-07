import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { addingNewPlaylist } from "../../Store/PlayListSLice";
import "./Modal.css";

const PlaylistInputForm = () => {
  const [playlistName, setPlayListName] = useState("");
  const inputPlaylistDispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const addPlaylistNameHandler = async (playlistName) => {
    const playlist = { title: playlistName };
    inputPlaylistDispatch(addingNewPlaylist({ playlist, token }));
    setPlayListName(" ");
    return null;
  };
  return (
    <div className="playlist-modal-main">
      <input
        type="text"
        placeholder="Add here..."
        className="input-playlist grow"
        autoFocus={true}
        value={playlistName}
        onChange={(e) => setPlayListName(e.target.value)}
      />
      <span
        className="plus-icon"
        onClick={() => addPlaylistNameHandler(playlistName)}
      >
        <BiPlus size="20px" />
      </span>
    </div>
  );
};

export default PlaylistInputForm;
