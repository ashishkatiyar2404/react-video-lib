import React from "react";
import "./CategoryList.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../Store/filterSlice";

const CategoryList = ({ items }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (items.categoryName) {
      dispatch(setSelectedCategory(items.categoryName));
    }
  };

  return (
    <Link
      to="/LandingPage"
      className="trending__singleItem"
      onClick={handleClick}
      aria-label={`View ${items.categoryName} videos`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="img__container">
        <img
          src={`${items.thumbnail}`}
          alt={items.categoryName}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=640&auto=format&fit=crop&q=80";
          }}
        />
      </div>
      <div className="category__name">
        <p>{items.categoryName}</p>
      </div>
    </Link>
  );
};

export default CategoryList;
