import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import QuizMenu from "./components/feature/quiz/Quiz_menu";
import QuizResult from "./components/feature/quiz/Quiz_result";
import Quiz from "./components/feature/quiz/Quiz";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/quizmenu" element={<QuizMenu />}></Route>
          <Route exact path="/quiz" element={<Quiz />}></Route>
          <Route exact path="/quizResult" element={<QuizResult />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
