import React from "react";
import ReactDOM from "react-dom";
import Modal from "./Modal";

const PlaylistPortal = ({ setOpenModal, video }) => {
  return ReactDOM.createPortal(
    <Modal setOpenModal={setOpenModal} video={video} />,
    document.getElementById("modal")
  );
};

export default PlaylistPortal;
