import { Route, Routes } from "react-router-dom";
import SlideBarAdmin from "../../components/admin/slideBar";
import routesAdmin from "../../core/routes/routeAdmin";
import Login from "../auth/login";
import { useEffect, useState } from "react";
import IsLoginAdmin from "../../components/auth/isLoginAdmin";

const AdminMaster = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
      <div className="flex self-stretch h-screen overflow-y-auto">
        <SlideBarAdmin />
        <div className="w-full w-content-admin pt-55px overflow-y-auto pb-[5px] bg-dark-electric-blue-2 ">
          <div className="mh-content-admin py-50px px-30px relative whitespace-pre-wrap">
            <Routes>{setRoutes()}</Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMaster;
