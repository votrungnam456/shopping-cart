import { useState } from "react";
import "./productManagement.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatMoney } from "../../../core/common/function";
import Modal from "../../../components/common/modal";
const ProductManagement = () => {
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.admin).productList;
  const maxLengthCategory = () => {
    let temp = 0;
    listProduct.forEach((product) => {
      if (product.Category.length > temp) {
        temp = product.Category.length;
      }
    });
    return temp;
  };
  const renderCategory = (category) => {
    const temp = [];
    for (let index = 0; index < maxLengthCategory(); index++) {
      temp.push(<td key={index}>{category[index]?.categoryName ?? ""}</td>);
    }
    return temp;
  };
  const renderListProduct = () => {
    return listProduct.map((product, index) => {
      return (
        <tr key={index}>
          <td>{product.ProductName}</td>
          <td>{formatMoney(product.Price)}</td>
          <td>{product.StockQuantity}</td>
          {renderCategory(product.Category)}
          <td>
            <div className="flex justify-center">
              <img
                alt="icon-edit"
                src="/icon/iconPen.png"
                className="w-[30px] cursor-pointer"
                onClick={() => handleClick("editProduct", product.ProductID)}
              ></img>
              <img
                alt="icon-delete"
                src="/icon/iconDelete.png"
                className="w-[30px] cursor-pointer"
                onClick={() => handleClick("deleteProduct", product.ProductID)}
              ></img>
            </div>
          </td>
        </tr>
      );
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirmDelete = () => {
    // onDelete(product.id);
    setIsModalOpen(false);
  };
  const handleClick = (type, data) => {
    switch (type) {
      case "addProduct":
        navigate("/admin/product/product-management/add");
        break;
      case "editProduct":
        navigate(`/admin/product/product-management/edit/${data}`);
        break;

      case "deleteProduct":
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full">
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
                      <th className="w-[150px]">Giá</th>
                      <th className="w-[130px]">Số lượng tồn</th>
                      <th colSpan={maxLengthCategory()}>Loại sản phẩm</th>
                      <th className="w-[100px]"></th>
                    </tr>
                  </thead>
                  <tbody>{renderListProduct()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default ProductManagement;
