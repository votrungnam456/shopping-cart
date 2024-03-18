import React from "react";
import { Route, Redirect, Navigate, Outlet } from "react-router-dom";
import Login from "../../view/auth/login";

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
