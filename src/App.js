import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import QuizMenu from "./components/feature/quiz/QuizMenu";
import QuizResult from "./components/feature/quiz/QuizResult";
import Quiz from "./components/feature/quiz/Quiz";
import Register from "./components/feature/auth/Register";
import Login from "./components/feature/auth/Login";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUser } from "./components/feature/auth/authSlice";
import { setQuestionsDB } from "./dbSlice";
import { ref, get, child } from "firebase/database";
import { ques_db } from "./config/firebase";
function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth.value);
  useEffect(() => {
    // check if there is any user login
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is ------> ", authUser);
      if (authUser) {
        //the user just logged in/was logged in
        console.log(authUser);
        console.log(authUser.displayName);
        dispatch(setLogin(true));
        dispatch(
          setUser({
            ...authUser,
          })
        );
      } else {
        //the user is logged out
        dispatch(setUser(null));
      }
    });
    // get question form firebase db
    const getQuestions = async () => {
      const dbRef = ref(ques_db);
      let snapshot = await get(child(dbRef, `questions`));
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch(setQuestionsDB(snapshot.val()));
      } else {
        console.log("no data found");
      }
    };
    getQuestions();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/quizmenu" element={<QuizMenu />}></Route>
          <Route exact path="/quiz" element={<Quiz />}></Route>
          <Route exact path="/quizResult" element={<QuizResult />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
