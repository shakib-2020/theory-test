import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectAns, setWrongAns } from "./quizSlice";
import QuizResultDetalis from "./Quiz_result_detalis";

const QuizResult = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.quiz.value);
  const { questions, regAns, correctAns, wrongAns } = state;

  // result
  let ansList = [];
  questions.forEach((item) => {
    ansList.push(`${item.correctAnswer}`);
  });

  const getResult = (ansList, userSelectedAns) => {
    let correct = 0;
    let wrong = 0;
    ansList.forEach((item, index) => {
      if (item === userSelectedAns[index]) {
        correct++;
      } else {
        wrong++;
      }
    });
    return { correct, wrong };
  };
  useEffect(() => {
    const { correct, wrong } = getResult(ansList, regAns);
    dispatch(setCorrectAns(correct));
    dispatch(setWrongAns(wrong));
  }, []);
  // detalis
  console.log(regAns);
  return (
    <>
      <div className="result-wrapper text-center">
        <h2 className="title">Quiz Result</h2>
        <div className="result">
          <h3>
            Correct Ans : <span>{correctAns}</span>
          </h3>
          <h3>
            Wrong Ans : <span>{wrongAns}</span>
          </h3>
        </div>
      </div>
      <div>
        <div className="text-center">
          <h2>Review:</h2>
        </div>
        {questions.map((question, index) => {
          return (
            <QuizResultDetalis
              key={index}
              index={index}
              questionData={question}
              userSelectedAns={regAns[index]}
            />
          );
        })}
      </div>
    </>
  );
};

export default QuizResult;
