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
        Price: "200000",
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
        Price: "100000",
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
        Price: "150000",
        StockQuantity: 100,
        Category: [
          {
            categoryId: "2",
            categoryName: "Nước uống",
          },
        ],
      },

      {
        ProductID: "4",
        ProductName: "Hamburger",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: "200000",
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
        ProductID: "5",
        ProductName: "Gà rán",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: "100000",
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
        ProductID: "6",
        ProductName: "Coca cola",
        Description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        Price: "150000",
        StockQuantity: 100,
        Category: [
          {
            categoryId: "2",
            categoryName: "Nước uống",
          },
        ],
      },
    ],
    categoryList: [
      {
        categoryId: "1",
        categoryName: "Bánh",
      },
      {
        categoryId: "2",
        categoryName: "Nước uống",
      },
      {
        categoryId: "3",
        categoryName: "Đồ chiên",
      },
      {
        categoryId: "4",
        categoryName: "Kem",
      },
      {
        categoryId: "5",
        categoryName: "Thịt",
      },
    ],
    comboList: [
      {
        comboId: "1",
        comboName: "Combo 1",
        description: "Description Combo 1",
        discountPercentage: "10",
        price: "200000",
        products: [
          {
            productId: "1",
            productName: "Hamburger",
            quantity: 1,
          },
          {
            productId: "2",
            productName: "Gà rán",
            quantity: 1,
          },
          {
            productId: "3",
            productName: "Coca cola",
            quantity: 1,
          },
        ],
      },
      {
        comboId: "2",
        comboName: "Combo 2",
        description: "Description Combo 2",
        discountPercentage: "20",
        price: "300000",
        products: [
          {
            productId: "1",
            productName: "Hamburger",
            quantity: 1,
          },
          {
            productId: "2",
            productName: "Gà rán",
            quantity: 1,
          },
          {
            productId: "3",
            productName: "Coca cola",
            quantity: 2,
          },
        ],
      },
    ],
    isAddProductSuccess: false,
    isEditProductSuccess: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = {
        ProductID: state.productList.length + "",
        ...action.payload,
      };
      state.productList.push(product);
      notification({
        type: "success",
        message: "Thêm sản phẩm thành công",
        duration: 3000,
      });
      // state.isAddProductSuccess = true;
    },
    editProduct: (state, action) => {
      const index = state.productList.findIndex(
        (product) => product.ProductID === action.payload.ProductID
      );
      if (index !== -1) {
        state.productList[index] = action.payload;
        // state.isEditProductSuccess = true;
        notification({
          message: "Sửa sản phẩm thành công",
          duration: 3000,
        });
      } else {
        notification({
          type: "error",
          message: "Sửa sản phẩm thất bại",
          duration: 3000,
        });
        // state.isEditProductSuccess = false;
      }
    },
    deleteProduct: (state, action) => {
      const index = state.productList.findIndex(
        (product) => product.ProductID === action.payload
      );
      if (index !== -1) {
        state.productList.splice(index, 1);
        notification({
          message: "Xoá thành công",
          duration: 3000,
        });
        sessionStorageHandle("remove", "productId");
      } else {
        notification({
          type: "error",
          message: "Xoá thất bại",
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
    deleteCategory: (state, action) => {
      const index = state.categoryList.findIndex(
        (product) => product.categoryId === action.payload
      );
      if (index !== -1) {
        state.categoryList.splice(index, 1);
        notification({
          message: "Xoá thành công",
          duration: 3000,
        });
        sessionStorageHandle("remove", "categoryId");
      } else {
        notification({
          type: "error",
          message: "Xoá thất bại",
          duration: 3000,
        });
      }
    },
    deleteManyCategory: (state, action) => {
      const filter = state.categoryList.filter(
        (item) => !action.payload.includes(item.categoryId)
      );
      state.categoryList = filter;
      notification({
        message: "Xoá thành công",
        duration: 3000,
      });
    },
    addCategory: (state, action) => {
      const category = {
        categoryId: state.categoryList.length + "",
        ...action.payload,
      };
      state.categoryList.push(category);
      notification({
        type: "success",
        message: "Thêm loại sản phẩm thành công",
        duration: 3000,
      });
    },
    editCategory: (state, action) => {
      const index = state.categoryList.findIndex(
        (category) => category.categoryId === action.payload.categoryId
      );
      if (index !== -1) {
        state.categoryList[index] = action.payload;
        notification({
          message: "Sửa loại sản phẩm thành công",
          duration: 3000,
        });
      } else {
        notification({
          type: "error",
          message: "Sửa loại sản phẩm thất bại",
          duration: 3000,
        });
      }
    },

    deleteCombo: (state, action) => {
      const index = state.comboList.findIndex(
        (product) => product.comboId === action.payload
      );
      if (index !== -1) {
        state.comboList.splice(index, 1);
        notification({
          message: "Xoá thành công",
          duration: 3000,
        });
        sessionStorageHandle("remove", "comboId");
      } else {
        notification({
          type: "error",
          message: "Xoá thất bại",
          duration: 3000,
        });
      }
    },
    deleteManyCombo: (state, action) => {
      const filter = state.comboList.filter(
        (item) => !action.payload.includes(item.comboId)
      );
      state.comboList = filter;
      notification({
        message: "Xoá thành công",
        duration: 3000,
      });
    },
    addCombo: (state, action) => {
      const combo = {
        comboId: state.comboList.length + "",
        ...action.payload,
      };
      state.comboList.push(combo);
      notification({
        type: "success",
        message: "Thêm loại sản phẩm thành công",
        duration: 3000,
      });
    },
    editCombo: (state, action) => {
      const index = state.comboList.findIndex(
        (combo) => combo.comboId === action.payload.comboId
      );
      if (index !== -1) {
        state.comboList[index] = action.payload;
        notification({
          message: "Sửa combo thành công",
          duration: 3000,
        });
      } else {
        notification({
          type: "error",
          message: "Sửa combo thất bại",
          duration: 3000,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  editProduct,
  deleteProduct,
  deleteManyProduct,
  deleteCategory,
  deleteManyCategory,
  addCategory,
  editCategory,
  deleteCombo,
  deleteManyCombo,
  addCombo,
  editCombo,
} = adminSlice.actions;

export default adminSlice.reducer;
