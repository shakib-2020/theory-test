import "./Quiz.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { next, prev, setRegAns, resetQuiz } from "./quizSlice";
import { useLocation, useNavigate } from "react-router-dom";

const initialTime = {
  min: 1,
  sec: 10,
};

const Quiz = () => {
  const location = useLocation();
  const [checked, setChecked] = useState("");
  const [time, setTime] = useState(initialTime);
  const [progressCount, setProgressCount] = useState(0);
  // variable and redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = location.state.title;
  const state = useSelector((state) => state.quiz.value);
  const { testState, questions, currentIndex, regAns } = state;
  const { question, answers, correctAnswer, mediaType, content } =
    questions[currentIndex];

  // timer
  let timerInterval;
  useEffect(() => {
    const updateCountDown = () => {
      let seconds = time.sec;
      let minutes = time.min;

      if (minutes <= 0 && seconds <= 1) {
        clearInterval(timerInterval);
        alert("times up");
        navigate("/quizResult", { replace: true });
      } else if (seconds <= 1) {
        setTime({
          ...time,
          min: minutes - 1,
          sec: 59,
        });
      } else {
        setTime({
          ...time,
          sec: seconds - 1,
        });
      }
    };

    switch (testState) {
      case "mock":
        timerInterval = setInterval(updateCountDown, 1000);
        break;
      case "practice":
        clearInterval(timerInterval);
        break;
      default:
        break;
    }
    return () => {
      clearInterval(timerInterval);
    };
  });

  // handle change after selecting an option
  const handleChange = (event) => {
    const { value } = event.target;
    const { style } = event.target.parentNode;
    setChecked(value);
    dispatch(setRegAns({ value, currentQues: currentIndex }));
    console.log({ correctAnswer, value });
    if (value === `${correctAnswer}`) {
      // here value is number,correctAnswer is char;
      style.outline = "1px solid green";
    } else {
      style.outline = "1px solid #ff2929";
    }
    setTimeout(() => {
      style.outline = "";
      handleNext();
    }, 100);
  };
  // handle Next
  const handleNext = () => {
    if (questions.length > currentIndex + 1) {
      dispatch(next());
      if (!regAns[currentIndex + 1]) {
        setChecked("");
      } else {
        setChecked(regAns[currentIndex + 1]);
      }
    }
    setProgressCount((prev) => {
      return prev + 20;
    });

    if (currentIndex + 1 === question.length - 1) {
      setProgressCount((prev) => {
        return prev + 20;
      });
    }
    console.log(regAns);
  };
  // handle previous
  const handlePrev = () => {
    if (currentIndex !== 0) {
      dispatch(prev());
      setChecked(regAns[currentIndex - 1]);
      setProgressCount((prev) => {
        return prev - 20;
      });
    }
  };
  // handle submit
  const handleSubmit = () => {
    navigate("/quizResult", {
      state: { title: title },
      replace: true,
    });
  };
  // handle quit
  const handleQuit = () => {
    setChecked("");
    setProgressCount(0);
    dispatch(resetQuiz());
    navigate("/", { replace: true });
  };

  return (
    <>
      <div className="quiz-wrapper text-center">
        <div className="quiz-meta">
          <div className="timer">
            {testState !== "practice" && (
              <h6>
                Remaining time: {time.min < 10 ? "0" + time.min : time.min} :
                {time.sec < 10 ? "0" + time.sec : time.sec}
              </h6>
            )}
          </div>
          <div className="progressbar">
            <ProgressBar variant="warning" now={progressCount} />
          </div>
        </div>
        <div className="qus-title">
          <h5>
            Question: {currentIndex + 1} / {questions.length} :
          </h5>
          <h3>{question}</h3>
        </div>
        <div className="content text-center">
          {mediaType === "image" && <img src={content} alt="content" />}
          {mediaType === "video" && (
            <div className="player">
              <ReactPlayer
                url={`https://appsbreaking.com/parkingvideo.mp4`}
                controls={true}
                outline={true}
              ></ReactPlayer>
            </div>
          )}
        </div>
        <div className="options">
          <Row>
            <Col>
              <label
                htmlFor="option1"
                style={{ backgroundColor: checked === "0" && "palegoldenrod" }}
              >
                <input
                  id="option1"
                  type="radio"
                  value="0"
                  name="option"
                  checked={checked === "0"}
                  onChange={handleChange}
                />
                {answers[0]}
              </label>
            </Col>
            <Col>
              <label
                htmlFor="option2"
                style={{ backgroundColor: checked === "1" && "palegoldenrod" }}
              >
                <input
                  id="option2"
                  type="radio"
                  value="1"
                  name="option"
                  checked={checked === "1"}
                  onChange={handleChange}
                />
                {answers[1]}
              </label>
            </Col>
          </Row>
          <Row>
            <Col>
              <label
                htmlFor="option3"
                style={{ backgroundColor: checked === "2" && "palegoldenrod" }}
              >
                <input
                  id="option3"
                  type="radio"
                  value="2"
                  name="option"
                  checked={checked === "2"}
                  onChange={handleChange}
                />
                {answers[2]}
              </label>
            </Col>
            <Col>
              <label
                htmlFor="option4"
                style={{ backgroundColor: checked === "3" && "palegoldenrod" }}
              >
                <input
                  id="option4"
                  type="radio"
                  value="3"
                  name="option"
                  checked={checked === "3"}
                  onChange={handleChange}
                />
                {answers[3]}
              </label>
            </Col>
          </Row>
        </div>
        <div className="action-btn">
          <Button
            variant="info"
            disabled={currentIndex === 0}
            onClick={handlePrev}
          >
            Prev
          </Button>
          <Button
            variant="info"
            disabled={currentIndex === questions.length - 1}
            onClick={handleNext}
          >
            Next
          </Button>
          <Button
            variant="warning"
            disabled={currentIndex === questions.length - 1}
            onClick={handleNext}
          >
            Skip
          </Button>
        </div>
        <div className="action-btn">
          {currentIndex === questions.length - 1 && (
            <Button variant="success" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button variant="danger" onClick={handleQuit}>
            Quit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
