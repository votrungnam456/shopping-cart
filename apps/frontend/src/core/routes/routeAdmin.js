import AdminHomePage from "../../view/admin/home";
import ProductManagement from "../../view/admin/products/productManagement";
import AddProduct from "../../view/admin/products/add";
import EditProduct from "../../view/admin/products/edit";

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
  {
    path: "/product/product-management/edit/:id",
    exact: true,
    main: <EditProduct></EditProduct>,
  },
];

export default routesAdmin;
