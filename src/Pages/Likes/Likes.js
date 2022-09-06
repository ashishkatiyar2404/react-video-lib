import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LikeCard from "../../Components/LikeCards/LikeCard";
import SideBar from "../../Components/SideBar/SideBar";
import "./Likes.css";

const Likes = () => {
  const likeVideos = useSelector((store) => store.like.likes);
  // console.log(likeVideos);
  return (
    <div className="watchLater__container">
      <div className="bottom__container">
        <SideBar />
      </div>
      <div className="likeVideos__container">
        {likeVideos.length > 0 ? (
          likeVideos.map((videos) => <LikeCard videos={videos} />)
        ) : (
          <div className="no_like_videos">
            No Like Videos Click here for
            <Link className="text-decoration" to="/LandingPage">
              <Button className="explore_btn"> Explore more</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Likes;
