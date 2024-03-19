import { useState } from "react";
import "./productManagement.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProductManagement = () => {
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.admin).productList;
  console.log(listProduct);
  const renderListProduct = () => {
    return listProduct.map((product, index) => {
      return (
        <tr key={index}>
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

  const handleClick = (type) => {
    switch (type) {
      case "addProduct":
        navigate("/admin/product/product-management/add");
        break;

      default:
        break;
    }
  };
  return (
    <div className="flex justify-center">
      <div className="bg-dark-electric-blue-2 w-full h-full">
        <div className=" mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white">
            Quản lý Sản phẩm
          </h1>
          <div className="flex p-[10px]">
            <button
              id="add-product"
              className="border-[1px] border-marigold border-solid px-4 py-2 bg-marigold text-white rounded-md font-bold hover:bg-deep-space-sparkle hover:text-marigold mr-4"
              onClick={() => handleClick("addProduct")}
            >
              Thêm Sản phẩm
            </button>
            <button
              id="add-product"
              className="border-[1px] border-marigold border-solid px-4 py-2 bg-marigold text-white rounded-md font-bold hover:bg-deep-space-sparkle hover:text-marigold"
            >
              Xoá sản phẩm đã chọn
            </button>
          </div>
          <div className="p-[20px] bg-deep-space-sparkle text-white ">
            <div className="max-h-[500px] overflow-y-scroll">
              <table className="border-collapse w-full ">
                <thead className="sticky top-[-1px]">
                  <tr>
                    <th className="w-[200px]">Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Giá</th>
                    <th>Số lượng tồn</th>
                    <th>Loại sản phẩm</th>
                    <th className="w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {renderListProduct()}
                  {renderListProduct()}
                  {renderListProduct()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
