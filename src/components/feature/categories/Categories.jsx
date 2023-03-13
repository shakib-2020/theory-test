import React from "react";
import catergoryList from "../../../api/categoryList";
import Category from "./Category";

const Categories = () => {
  return (
    <div className="categories-wrapper" id="learning">
      <h2 className="title">Categories</h2>
      <div className="category-list">
        {catergoryList.map((item, index) => {
          return (
            <Category
              key={index}
              id={item.id}
              title={item.title}
              icon={item.icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
