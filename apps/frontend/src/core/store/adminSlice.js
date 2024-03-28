import { createSlice } from "@reduxjs/toolkit";
import { notification, sessionStorageHandle } from "../common/function";

export const adminSlice = createSlice({
  name: "auth",
  initialState: {
    productList: [
      {
        productId: "1",
        productName: "Hamburger",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "200000",
        stockQuantity: 100,
        category: [
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
        productId: "2",
        productName: "Gà rán",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "100000",
        stockQuantity: 100,
        category: [
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
        productId: "3",
        productName: "Coca cola",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "150000",
        stockQuantity: 100,
        category: [
          {
            categoryId: "2",
            categoryName: "Nước uống",
          },
        ],
      },

      {
        productId: "4",
        productName: "Hamburger 2",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "200000",
        stockQuantity: 100,
        category: [
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
        productId: "5",
        productName: "Gà rán 2",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "100000",
        stockQuantity: 100,
        category: [
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
        productId: "6",
        productName: "Coca cola 2",
        description:
          "Áo thun nam dài tay, chất liệu cotton, phong cách trẻ trung và thoải mái.",
        price: "150000",
        stockQuantity: 100,
        category: [
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
        description: "description Combo 1",
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
        description: "description Combo 2",
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
    reviewsList: [
      {
        productId: "1",
        productName: "Hamburger",
        reviews: [
          {
            id: "1",
            userId: "1",
            name: "John Doe",
            rating: 5,
            comment: "Bánh này ngon",
            date: "2024-03-27",
            hidden: false,
          },
          {
            id: "2",
            userId: "2",
            name: "NamVT",
            rating: 4,
            comment: "Bánh này ổn, riêng thịt thì hơi mặn",
            date: "2024-03-27",
            hidden: false,
          },
        ],
      },
      {
        productId: "2",
        productName: "Gà rán",
        reviews: [
          {
            id: "1",
            userId: "1",
            name: "John Doe",
            rating: 3,
            comment: "Món này ở mức tạm thôi",
            date: "2024-03-27",
            hidden: false,
          },
          {
            id: "2",
            userId: "3",
            name: "DatQNT",
            rating: 1,
            comment: "Nhiều dầu quá, cắn vào dầu chạy nhiều",
            date: "2024-03-27",
            hidden: false,
          },
          {
            id: "2",
            userId: "1",
            name: "NamVT",
            rating: 5,
            comment: "Comment này màn tính chất nhận xu",
            date: "2024-03-27",
            hidden: false,
          },
        ],
      },
      {
        productId: "3",
        productName: "Coca cola",
        reviews: [
          {
            id: "1",
            userId: "1",
            name: "John Doe",
            rating: 2,
            comment: "Món này ở mức tạm thôi",
            date: "2024-03-27",
            hidden: false,
          },
          {
            id: "2",
            userId: "3",
            name: "DatQNT",
            rating: 4,
            comment: "Ợ Ợ",
            date: "2024-03-27",
            hidden: false,
          },
          {
            id: "2",
            userId: "1",
            name: "NamVT",
            rating: 5,
            comment: "Comment này màn tính chất nhận xu",
            date: "2024-03-27",
            hidden: false,
          },
        ],
      },
      {
        productId: "4",
        productName: "Hamburger 2",
        reviews: [],
      },
      {
        productId: "5",
        productName: "Gà rán 2",
        reviews: [],
      },
      {
        productId: "6",
        productName: "Coca cola 2",
        reviews: [],
      },
    ],
    isAddProductSuccess: false,
    isEditProductSuccess: false,
  },
  reducers: {
    addProduct: (state, action) => {
      const product = {
        productId: state.productList.length + "",
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
        (product) => product.productId === action.payload.productId
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
        (product) => product.productId === action.payload
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
        (item) => !action.payload.includes(item.productId)
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
