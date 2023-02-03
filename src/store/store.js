import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../components/feature/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});
