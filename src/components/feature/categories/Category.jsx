import "./Categories.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions, setTestState } from "../quiz/quizSlice";
import UserProgress from "./UserProgress";

const Category = ({ id, title, icon }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  const questionsDB = useSelector((state) => state.db.value.questionsDB);

  const handleClick = () => {
    const categoryId = id;
    const categoryQuestion = questionsDB.filter((item) => {
      if (categoryId !== 0) {
        return item.category === categoryId;
      } else {
        return item.category !== categoryId;
      }
    });
    dispatch(setQuestions(categoryQuestion));
    dispatch(setTestState("practice"));
    console.log(categoryQuestion);
    navigate("/quizmenu", { state: { title } });
  };
  return (
    <>
      <div className="category-wrapper" onClick={handleClick}>
        <div className="btn-left">
          <img alt="category icon" src={icon} />
          <h3>{title}</h3>
        </div>
        {user !== null && <UserProgress title={title} />}
      </div>
    </>
  );
};

export default Category;
