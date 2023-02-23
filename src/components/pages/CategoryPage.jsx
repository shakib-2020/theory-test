import "./CategoryPage.css";
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";

const CategoryPage = () => {
  const location = useLocation();
  const title = location.state.title;
  return (
    <>
      <Header />
      <div className="categoryPage-wrapper">
        <div className="title">
          <h2>Category: {title}</h2>
        </div>
        <div className="quiz"></div>
      </div>
    </>
  );
};

export default CategoryPage;
