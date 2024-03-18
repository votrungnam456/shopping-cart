import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsLoginAdmin = ({ isLoggedIn, reverse = false }) => {
  let result;
  if (isLoggedIn) {
    result = reverse ? <Navigate to="/admin" /> : <Outlet></Outlet>;
  } else {
    result = reverse ? <Outlet></Outlet> : <Navigate to="/admin/login" />;
  }
  return result;
};

export default IsLoginAdmin;
