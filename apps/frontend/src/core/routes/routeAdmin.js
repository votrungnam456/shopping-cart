import AdminHomePage from "../../view/admin/home";
import ProductManagement from "../../view/admin/products";
import ReviewManagement from "../../view/admin/reviews";
import ProductReview from "../../view/admin/reviews/productReview";
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
    path: "/product/product-comment",
    exact: true,
    main: <ReviewManagement></ReviewManagement>,
  },
  {
    path: "/product/product-comment/review/:id",
    exact: true,
    main: <ProductReview></ProductReview>,
  },
];

export default routesAdmin;
