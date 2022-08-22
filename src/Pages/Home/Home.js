import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="hero__section">
        <div className="heading__text-box">
          <h1 className="heading__primary">
            <span className="heading__primary-main">
              Welcome to Naruto Video Library!
            </span>
            <span className="heading__primary-sub">
              Naruto is a Japanese series written by Masashi Kishimoto. It tells
              the story of Naruto Uzumaki.
            </span>
          </h1>
          <Link to="/VideoList" className="btn__white">
            Start Watching
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
