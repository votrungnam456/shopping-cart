import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "auth",
  initialState: {
    productList: [
      {
        ProductID: 1,
        ProductName: "Áo thun nam",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 200000,
        StockQuantity: 100,
        CategoryID: 1,
      },
      {
        ProductID: 1,
        ProductName: "Áo thun nữ",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 100000,
        StockQuantity: 100,
        CategoryID: 1,
      },
      {
        ProductID: 1,
        ProductName: "Áo thun nam dài",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: 150000,
        StockQuantity: 100,
        CategoryID: 1,
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
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct } = adminSlice.actions;

export default adminSlice.reducer;
