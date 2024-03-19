import { useState } from "react";
import "./productManagement.css";
const ProductManagement = () => {
  const listProductTemp = [
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
  ];
  const [listProduct, setListProduct] = useState(listProductTemp);
  const renderListProduct = () => {
    return listProduct.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.ProductID}</td>
          <td>{product.ProductName}</td>
          <td>{product.Description}</td>
          <td>{product.Price}</td>
          <td>{product.StockQuantity}</td>
          <td>{product.CategoryID}</td>
          <td>
            <div className="flex justify-center">
              <img
                alt="icon-edit"
                src="/icon/iconPen.png"
                className="w-[30px] cursor-pointer"
              ></img>
              <img
                alt="icon-delete"
                src="/icon/iconDelete.png"
                className="w-[30px] cursor-pointer"
              ></img>
            </div>
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 w-full h-screen">
        <div className=" mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Quản lý Sản phẩm
          </h1>
          <div className="flex justify-center items-center mb-8 flex-wrap">
            <input
              type="text"
              id="name"
              placeholder="Tên Sản phẩm"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="text"
              id="price"
              placeholder="Mô tả"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="text"
              id="price"
              placeholder="Giá"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="number"
              id="price"
              placeholder="Số lượng"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <div className="mr-4">
              <select
                id="category"
                className="w-[150px] px-4 py-2 border-[1px] border-solid border-gray-300 rounded-[5px]"
              >
                <option value="" disabled hidden>
                  Loại sản phẩm
                </option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
                {/* <!-- Thêm các lựa chọn khác nếu cần --> */}
              </select>
            </div>
            <button
              id="add-product"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Thêm Sản phẩm
            </button>
          </div>
          <div className="flex justify-center items-center mb-8">
            <input
              type="text"
              id="name"
              placeholder="Tên Sản phẩm"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="text"
              id="price"
              placeholder="Mô tả"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="text"
              id="price"
              placeholder="Giá"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <input
              type="number"
              id="price"
              placeholder="Số lượng"
              className="px-4 py-2 border border-gray-300 rounded-[5px] mr-4"
            />
            <div className="mr-4">
              <select
                id="category"
                className="w-[150px] px-4 py-2 border-[1px] border-solid border-gray-300 rounded-[5px]"
              >
                <option value=""></option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="toys">Toys</option>
              </select>
            </div>
            <button
              id="add-product"
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-[148px]"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="p-[10px]">
            <table className="border-collapse w-full ">
              <thead>
                <tr>
                  <th className="w-[30px]">Id</th>
                  <th className="w-[300px]">Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Giá</th>
                  <th>Số lượng tồn</th>
                  <th>Loại sản phẩm</th>
                  <th className="w-[100px]"></th>
                </tr>
              </thead>
              <tbody>{renderListProduct()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
