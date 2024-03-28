import { createSlice } from "@reduxjs/toolkit";
import { localStorageHandle, notification } from "../common/function";
import { useNavigate } from "react-router-dom";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    activeLogin: 0,
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      const { payload } = action;
      const { userName, password } = payload;
      if (userName === "admin" && password === "123") {
        localStorageHandle("set", "loginAdmin", true);
        notification({
          message: "Đăng nhập thành công",
          duration: 3000,
        });
        state.loggedIn = true;
      } else {
        notification({
          type: "error",
          message: "Sai tài khoản hoặc mật khẩu, vui lòng thử lại",
          duration: 3000,
        });
        state.loggedIn = false;
      }
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
