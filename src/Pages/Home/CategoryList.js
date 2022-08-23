import React from "react";
import "./CategoryList.css";

const CategoryList = ({ items }) => {
  return (
    <div className="trending__singleItem">
      <div className="img__container">
        <img src={`${items.thumbnail}`} alt="" />
      </div>
      <div className="category__name">
        <p>{items.categoryName}</p>
      </div>
    </div>
  );
};

export default CategoryList;
