import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectAns, setWrongAns } from "./quizSlice";
import QuizResultDetalis from "./QuizResultDetalis";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useLocation } from "react-router-dom";

const QuizResult = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const title = location.state.title;
  const { user } = useSelector((state) => state.auth.value);
  const quizState = useSelector((state) => state.quiz.value);
  const { questions, regAns, correctAns, wrongAns, pass, fail } = quizState;

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

    const addData = async () => {
      try {
        const docRef = await addDoc(
          collection(db, "users", user.uid, `${title}`),
          {
            questions,
            regAns,
            correctAns: correct,
            wrongAns: wrong,
          }
        );
        console.log("Document written by user uid");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    };
    addData();
  }, []);

  return (
    <>
      {/* when pass */}
      {pass && (
        <div className="result-wrapper text-center pass">
          <h2>Congratulations 🎉</h2>
          <div className="result">
            <h3 className="title">You've Passed !!</h3>
            <h4>
              Correct Ans : <span>{correctAns}</span>
            </h4>
            <h4>
              Wrong Ans : <span>{wrongAns}</span>
            </h4>
          </div>
        </div>
      )}
      {/* when fail */}
      {fail && (
        <div className="result-wrapper text-center fail">
          <h2>Sorry!!😔</h2>
          <div className="result">
            <h3 className="title">You've failed !!</h3>
            <h4>
              Correct Ans : <span>{correctAns}</span>
            </h4>
            <h4>
              Wrong Ans : <span>{wrongAns}</span>
            </h4>
            <h6>To pass the test you must score at least 43 out of 50.</h6>
            <h6>Keep practicing until you are able to pass consistently.</h6>
          </div>
        </div>
      )}

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
