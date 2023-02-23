import "./Quiz.css";
import React from "react";
import QuizSingle from "./QuizSingle";
import { useSelector } from "react-redux";

const QuizListArea = () => {
  const questionsDB = useSelector((state) => state.db.value.questionsDB);
  const setOne = questionsDB.slice(0, 5);
  const setTwo = questionsDB.slice(5, 10);
  const setThree = questionsDB.slice(10, 15);

  return (
    <>
      <div>
        <div className="pt-10 pb-50 text-center">
          <h2>Free Practice Tests</h2>
        </div>
        <>
          <div className="quiz-list-wrapper">
            <QuizSingle title="Practice Test 1" questions={setOne} />
            <QuizSingle title="Practice Test 2" questions={setTwo} />
            <QuizSingle title="Practice Test 3" questions={setThree} />
            <QuizSingle title="Practice Test 1" questions={setOne} />
            <QuizSingle title="Practice Test 2" questions={setTwo} />
            <QuizSingle title="Practice Test 3" questions={setThree} />
          </div>
        </>
      </div>
    </>
  );
};

export default QuizListArea;
