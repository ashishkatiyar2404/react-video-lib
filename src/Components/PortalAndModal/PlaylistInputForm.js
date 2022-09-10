import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { BiPlus } from "react-icons/bi";
import { addingNewPlaylist } from "../../Store/PlayListSLice";
import "./Modal.css";

const PlaylistInputForm = () => {
  const [playlistName, setPlayListName] = useState("");
  const dispatch = useDispatch();
  const {
    user: { token },
  } = useSelector((store) => store.auth);

  const addPlaylistNameHandler = async (playlistName) => {
    const playlist = { title: playlistName };
    dispatch(addingNewPlaylist({ playlist, token }));
    setPlayListName(" ");
  };
  return (
    <div className="playlist_modal_main">
      <input
        type="text"
        placeholder="Enter new Playlist name"
        className="input_playlist grow"
        autoFocus={true}
        value={playlistName}
        onChange={(e) => setPlayListName(e.target.value)}
      />
      <span
        className="plus_icon"
        onClick={() => addPlaylistNameHandler(playlistName)}
      >
        Create
        {/* <BiPlus size="20px" /> */}
      </span>
    </div>
  );
};

export default PlaylistInputForm;
