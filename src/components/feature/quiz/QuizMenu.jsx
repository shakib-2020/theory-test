import "./Quiz.css";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetQuiz } from "./quizSlice";
import { useDispatch } from "react-redux";

const QuizMenu = () => {
  <Navigate to="/quizmenu" />;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClick = () => {
    navigate("/quiz", { state: { title: location.state.title } });
  };

  useEffect(() => {
    dispatch(resetQuiz());
  });
  return (
    <div className="quiz-menu text-center">
      <h2>{location.state.title}</h2>
      {!location.state.description ? (
        <p>
          You have 57 minutes to answer 50 multiple choice driving theory test
          questions. At least 43 out of 50 questions must be answered correctly
          in order to pass the test. Answers may be reviewed after each question
          or you can wait until the end of the test for your final score. Good
          luck!
        </p>
      ) : (
        <p>{location.state.description}</p>
      )}
      <p></p>
      <Button onClick={handleClick} variant="warning">
        Begin Test
      </Button>
    </div>
  );
};

export default QuizMenu;
