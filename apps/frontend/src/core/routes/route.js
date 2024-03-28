import AdminMaster from "../../view/admin";
import Login from "../../view/auth/login";
const routes = [
  {
    path: "/admin/login",
    exact: true,
    main: <Login></Login>,
  },
  {
    path: "/admin/*",
    exact: true,
    main: <AdminMaster></AdminMaster>,
  },
];

export default routes;
