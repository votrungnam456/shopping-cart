import { createSlice } from "@reduxjs/toolkit";
import { notification, sessionStorageHandle } from "../common/function";

export const adminSlice = createSlice({
  name: "auth",
  initialState: {
    productList: [
      {
        ProductID: "1",
        ProductName: "Hamburger",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 200000,
        StockQuantity: 100,
        Category: [
          {
            categoryId: "1",
            categoryName: "Bánh",
          },
          {
            categoryId: "3",
            categoryName: "Đồ chiên",
          },
          {
            categoryId: "5",
            categoryName: "Thịt",
          },
        ],
      },
      {
        ProductID: "2",
        ProductName: "Gà rán",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 100000,
        StockQuantity: 100,
        Category: [
          {
            categoryId: "3",
            categoryName: "Đồ chiên",
          },
          {
            categoryId: "5",
            categoryName: "Thịt",
          },
        ],
      },
      {
        ProductID: "3",
        ProductName: "Coca cola",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 150000,
        StockQuantity: 100,
        Category: [
          {
            categoryId: "2",
            categoryName: "Nước uống",
          },
        ],
      },
    ],
  },
  reducers: {
    addProduct: (state, action) => {
      const product = {
        ProductID: state.productList.length,
        ...action.payload,
      };
      state.productList.push(product);
      notification({
        type: "success",
        message: "Thêm sản phẩm thành công",
        duration: 3000,
      });
    },
    editProduct: (state, action) => {
      const index = state.productList.findIndex(
        (product) => product.ProductID === action.payload.ProductID
      );
      if (index !== -1) {
        state.productList[index] = action.payload;
      } else {
        notification({
          type: "error",
          message: "Sửa sản phẩm thất bại",
          duration: 3000,
        });
      }
    },
    deleteProduct: (state, action) => {
      const index = state.productList.findIndex(
        (product) => product.ProductID === action.payload
      );
      if (index !== -1) {
        state.productList.splice(index, 1);
        notification({
          message: "Xoá sản phẩm thành công",
          duration: 3000,
        });
        sessionStorageHandle("remove", "productId");
      } else {
        notification({
          type: "error",
          message: "Xoá sản phẩm thất bại",
          duration: 3000,
        });
      }
    },
    deleteManyProduct: (state, action) => {
      const filter = state.productList.filter(
        (item) => !action.payload.includes(item.ProductID)
      );
      state.productList = filter;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, editProduct, deleteProduct, deleteManyProduct } =
  adminSlice.actions;

export default adminSlice.reducer;
