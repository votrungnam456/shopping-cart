import AdminMaster from "../../view/admin";

const routes = [
  {
    path: "/admin/*",
    exact: true,
    main: <AdminMaster></AdminMaster>,
  },
];

export default routes;
