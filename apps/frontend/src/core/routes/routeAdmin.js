import AdminHomePage from "../../view/admin/home";
import ProductManagement from "../../view/admin/products/productManagement";

const routesAdmin = [
  {
    path: "/",
    exact: true,
    main: <AdminHomePage></AdminHomePage>,
  },
  {
    path: "/product/product-management",
    exact: true,
    main: <ProductManagement></ProductManagement>,
  },
];

export default routesAdmin;
