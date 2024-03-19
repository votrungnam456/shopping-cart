import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNumber } from "../../../../core/common/function";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../core/store/adminSlice";
const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = (type) => {
    switch (type) {
      case "backProduct":
        navigate("/admin/product/product-management");
        break;
      case "addProduct": {
        if (checkValidate()) {
          const params = {
            ProductName: name,
            Description: description,
            Price: price,
            StockQuantity: quantity,
            CategoryID: type,
          };
          dispatch(addProduct(params));
        } else {
          console.log("k du data");
        }
        break;
      }
      default:
        break;
    }
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("");

  const onlyInputNumber = (ev) => {
    const dataInput = ev.target.value;
    if (isNumber(dataInput)) {
      setPrice(dataInput);
    }
  };
  const checkValidate = () => {
    return !(name === "" || price === "" || quantity === 0 || type === "");
  };
  return (
    <div className="flex justify-center">
      <div className="bg-dark-electric-blue-2 w-full h-full">
        <div className=" mx-auto py-8">
          <h1 className="text-3xl font-semibold text-center mb-8 text-white">
            Thêm sản phẩm
          </h1>
          <div className="flex p-[10px]">
            <button
              className="border-[1px] border-marigold border-solid px-4 py-2 bg-marigold text-white rounded-md font-bold hover:bg-deep-space-sparkle hover:text-marigold mr-4"
              onClick={() => handleClick("backProduct")}
            >
              Trở lại quản lý
            </button>
          </div>

          <div className="flex justify-center items-center">
            <div className="p-[20px] bg-deep-space-sparkle text-white w-[600px]">
              <div className="">
                <div className="mb-[5px]">
                  <p className="mb-[10px]">Tên Sản Phẩm *</p>
                  <input
                    className="bg-dark-electric-blue h-[50px] w-full p-[18px]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div>
                  <p className="mb-[10px]">Mô Tả</p>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-dark-electric-blue h-[120x] w-full p-[18px]"
                  ></textarea>
                </div>
                <div className="mb-[5px]">
                  <p className="mb-[10px]">Giá *</p>
                  <input
                    value={price}
                    onChange={(e) => onlyInputNumber(e)}
                    className="bg-dark-electric-blue h-[50px] w-full p-[18px]"
                  ></input>
                </div>
                <div className="mb-[5px]">
                  <p className="mb-[10px]">Số lượng *</p>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="bg-dark-electric-blue h-[50px] w-full p-[18px]"
                  ></input>
                </div>
                <div className="mb-[30px]">
                  <p className="mb-[10px]">Loại Sản Phẩm *</p>
                  <select
                    id="category"
                    className="bg-dark-electric-blue w-full px-4 py-2 "
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Loại sản phẩm</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="toys">Toys</option>
                  </select>
                </div>
                <div>
                  <button
                    id="add-product"
                    className="border-[1px] border-marigold border-solid px-4 py-2 bg-marigold text-white font-bold hover:bg-deep-space-sparkle hover:text-marigold mr-4 w-full"
                    onClick={() => handleClick("addProduct")}
                  >
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
