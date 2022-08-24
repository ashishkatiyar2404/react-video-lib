import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { categories } from "../../backend/db/categories";
import CategoryList from "./CategoryList";

const Home = () => {
  console.log(categories);
  return (
    <div>
      {/* HERO SECTION */}
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
          <Link to="/LandingPage" className="btn__white">
            Start Watching
          </Link>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="trending__container">
        <div className="trending">
          <h3>Trending Videos</h3>
        </div>
        <div className="trending__List">
          {categories.map((items) => (
            <CategoryList items={items} key={items._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
