import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import adminSlice from "./adminSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    admin: adminSlice,
  },
});
