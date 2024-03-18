import { Route, Routes } from "react-router-dom";
import SlideBarAdmin from "../../components/admin/slideBar";
import routesAdmin from "../../core/routes/routeAdmin";
import Login from "../auth/login";
import { useEffect } from "react";
import IsLoginAdmin from "../../components/auth/isLoginAdmin";

const AdminMaster = () => {
  const setRoutes = () => {
    const result = routesAdmin.map((route, index) => {
      const { path, exact, main } = route;
      return (
        <Route
          key={index}
          exact
          path="/"
          element={<IsLoginAdmin isLoggedIn={true}></IsLoginAdmin>}
        >
          <Route path={path} exact={exact} element={main}></Route>
        </Route>
      );
    });
    return result;
  };
  useEffect(() => {
    console.log("a");
  }, []);
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <IsLoginAdmin isLoggedIn={true} reverse={true}></IsLoginAdmin>
          }
        >
          <Route path="/login" exact={true} element={<Login></Login>}></Route>
        </Route>
      </Routes>
      <div
        v-title="'まなびボックス'"
        className="flex self-stretch h-screen overflow-y-auto"
      >
        <SlideBarAdmin />
        <div className="w-full w-content-admin pt-55px overflow-y-auto pb-30px">
          {/* <headerBar class="header-scroll fixed top-0" is-c-m-s /> */}
          <div className="mh-content-admin py-50px px-30px relative whitespace-pre-wrap">
            {/* <div v-if="isLoading" v-loading="true" class="loading-screen"></div> */}
            <Routes>{setRoutes()}</Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMaster;
