import React from "react";
import "./SideBar.css";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import QueueIcon from "@mui/icons-material/Queue";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HistoryIcon from "@mui/icons-material/History";

const SideBar = () => {
  const sideBarData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      link: "/home",
    },
    {
      title: "Liked",
      icon: <ThumbUpAltIcon />,
      link: "Liked",
    },
    {
      title: "PlayList",
      icon: <QueueIcon />,
      link: "PlayList",
    },
    {
      title: "Watch Later",
      icon: <WatchLaterIcon />,
      link: "WatchLater",
    },
    {
      title: "History",
      icon: <HistoryIcon />,
      link: "History",
    },
  ];
  return (
    <div className="sideBar__container">
      <ul className="sideBar__list">
        {sideBarData.map((val, key) => {
          return (
            <li
              key={key}
              // id={window.location.pathname == val.link ? "active" : ""}
              className="sideBar__row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div className="cursor icon">{val.icon}</div>
              <div className="cursor title"> {val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
