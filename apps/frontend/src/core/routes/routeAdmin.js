import AdminHomePage from "../../view/admin/home";
import ProductManagement from "../../view/admin/products/productManagement";
import AddProduct from "../../view/admin/products/add";

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
  {
    path: "/product/product-management/add",
    exact: true,
    main: <AddProduct></AddProduct>,
  },
];

export default routesAdmin;
