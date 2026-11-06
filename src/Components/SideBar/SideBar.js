import React from "react";
import "./SideBar.css";
import HomeIcon from "@mui/icons-material/Home";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import QueueIcon from "@mui/icons-material/Queue";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import HistoryIcon from "@mui/icons-material/History";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const sideBarData = [
    {
      title: "Explore",
      icon: <HomeIcon fontSize="inherit" />,
      link: "/LandingPage",
    },
    {
      title: "Liked",
      icon: <ThumbUpAltIcon fontSize="inherit" />,
      link: "/LikedVideos",
    },
    {
      title: "Playlist",
      icon: <QueueIcon fontSize="inherit" />,
      link: "/PlaylistPage",
    },
    {
      title: "Watch Later",
      icon: <WatchLaterIcon fontSize="inherit" />,
      link: "/WatchLater",
    },
    {
      title: "History",
      icon: <HistoryIcon fontSize="inherit" />,
      link: "/History",
    },
  ];

  return (
    <nav className="sideBar__container" aria-label="Main Navigation">
      <ul className="sideBar__list">
        {sideBarData.map((val, key) => (
          <li key={key}>
            <NavLink
              to={val.link}
              className={({ isActive }) =>
                `sideBar__row ${isActive ? "active" : ""}`
              }
            >
              <span className="icon">{val.icon}</span>
              <span className="title">{val.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
