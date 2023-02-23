import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/feature/auth/authSlice";
import quizReducer from "../components/feature/quiz/quizSlice";
import dbReducer from "../dbSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
    db: dbReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
