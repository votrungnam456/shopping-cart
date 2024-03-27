import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: "",
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      // state.value = "";
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
