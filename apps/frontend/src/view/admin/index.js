import { Route, Routes, useNavigate } from "react-router-dom";
import SlideBarAdmin from "../../components/admin/slideBar";
import routesAdmin from "../../core/routes/routeAdmin";
import { useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import HeaderAdmin from "../../components/admin/header";
import { localStorageHandle } from "../../core/common/function";

const AdminMaster = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const setRoutes = () => {
    const result = routesAdmin.map((route, index) => {
      const { path, exact, main } = route;
      return (
        <Route key={index} path={path} exact={exact} element={main}></Route>
      );
    });
    return result;
  };
  useEffect(() => {
    const isLogin = localStorageHandle("get", "loginAdmin");
    if (!isLogin) {
      navigate("/admin/login");
    }
  }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div>
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
