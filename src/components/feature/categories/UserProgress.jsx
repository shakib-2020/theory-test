import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
const UserProgress = ({ title }) => {
  const [result, setResult] = useState({
    questions: 0,
    regAns: 0,
    correctAns: 0,
    wrongAns: 0,
  });
  const { user } = useSelector((state) => state.auth.value);

  useEffect(() => {
    const getUserProgress = async () => {
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, `${title}`)
      );
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setResult(doc.data());
      });
    };
    getUserProgress();
  }, []);

  const getPercentage = (actualValue, totalValue) => {
    const percentage = (actualValue / totalValue) * 100;
    return Math.round(percentage);
  };
  return (
    <div className="btn-right">
      {result.questions ? (
        <>
          {getPercentage(result.correctAns, result.questions.length) < 100 ? (
            <span className="pending">
              Pending{" "}
              {100 - getPercentage(result.correctAns, result.questions.length)}%
            </span>
          ) : (
            <span className="completed">
              Completed{" "}
              {getPercentage(result.correctAns, result.questions.length)}%
            </span>
          )}

          <span className="count">
            Corract: {result.correctAns}/{result.questions.length}
          </span>
        </>
      ) : (
        <span className="give-test">Give a test</span>
      )}
    </div>
  );
};

export default UserProgress;
