import "./Quiz.css";
import React, { useEffect, useState } from "react";
import Quiz_single from "./Quiz_single";
import db from "../../../config/firebase";
import { ref, child, get } from "firebase/database";

const QuizListArea = () => {
  const [questionsDB, setQuestionDB] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const dbRef = ref(db);
      let snapshot = await get(child(dbRef, `questions`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setQuestionDB(snapshot.val());
      } else {
        console.log("no data found");
      }
    };
    getQuestions();
  }, []);

  const setOne = questionsDB.slice(0, 5);
  const title = "Mock Test 1";

  return (
    <div>
      <div className="pt-50 pb-50 text-center">
        <h2>Quiz List</h2>
      </div>
      <>
        <div className="quiz-list-wrapper">
          <Quiz_single title={title} questions={setOne} />
        </div>
      </>
    </div>
  );
};

export default QuizListArea;
