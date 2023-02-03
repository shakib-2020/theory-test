import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions } from "./quizSlice";

const QuizSingle = ({ title, questions }) => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  dispath(setQuestions(questions));
  const handleClick = () => {
    navigate("/quizmenu");
  };
  return (
    <>
      <div onClick={handleClick} className="single-quiz">
        <img src="https://i.ibb.co/MBWMrSf/car.png" alt="car-logo" />
        <h2>{title}</h2>
      </div>
    </>
  );
};

export default QuizSingle;
