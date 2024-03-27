import { Route, Routes } from "react-router-dom";
import SlideBarAdmin from "../../components/admin/slideBar";
import routesAdmin from "../../core/routes/routeAdmin";
import Login from "../auth/login";
import { useState } from "react";
import IsLoginAdmin from "../../components/auth/isLoginAdmin";
import { Box, Toolbar } from "@mui/material";
import HeaderAdmin from "../../components/admin/header";

const AdminMaster = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [open, setOpen] = useState(true);
  const setRoutes = () => {
    const result = routesAdmin.map((route, index) => {
      const { path, exact, main } = route;
      return (
        <Route
          key={index}
          exact
          path="/"
          element={<IsLoginAdmin isLoggedIn={isLoggedIn}></IsLoginAdmin>}
        >
          <Route path={path} exact={exact} element={main}></Route>
        </Route>
      );
    });
    return result;
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <IsLoginAdmin isLoggedIn={isLoggedIn} reverse={true}></IsLoginAdmin>
          }
        >
          <Route path="/login" exact={true} element={<Login></Login>}></Route>
        </Route>
      </Routes>
      <div className={!isLoggedIn ? "hidden" : ""}>
        <Box sx={{ display: "flex" }}>
          <HeaderAdmin openDrawer={open} toggleDrawer={toggleDrawer} />
          <SlideBarAdmin openDrawer={open} toggleDrawer={toggleDrawer} />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Routes>{setRoutes()}</Routes>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default AdminMaster;
