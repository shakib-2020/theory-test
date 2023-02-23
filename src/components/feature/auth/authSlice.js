import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: null,
    isLogedin: false,
  },
};

export const authSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    setLogin: (state, action) => {
      state.value.isLogedin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLogin } = authSlice.actions;

export default authSlice.reducer;
