import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isNumber, notification } from "../../../../core/common/function";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../../core/store/adminSlice";
import Select from "react-select";
const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = [
    { value: 1, label: "Áo" },
    { value: 2, label: "Đồ nam" },
    { value: 3, label: "Đồ nữ" },
    { value: 4, label: "Áo thun" },
    { value: 5, label: "Áo tay dài" },
  ];
  const colorSelectStyle = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "var(--dark-electric-blue)",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: "#567086",
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "var(--color-marigold)",
      };
    },
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState([]);

  const onlyInputNumber = (ev) => {
    const dataInput = ev.target.value;
    if (isNumber(dataInput)) {
      setPrice(dataInput);
    }
  };
  const checkValidate = () => {
    return !(
      name === "" ||
      price === "" ||
      quantity === 0 ||
      category.length === 0
    );
  };
  const handleClick = (type) => {
    switch (type) {
      case "backProduct":
        navigate("/admin/product/product-management");
        break;
      case "addProduct": {
        if (checkValidate()) {
          const convertDataCategory = category.map((data) => {
            return {
              categoryId: data.value,
              categoryName: data.label,
            };
          });
          const params = {
            ProductName: name,
            Description: description,
            Price: price,
            StockQuantity: quantity,
            Category: convertDataCategory,
          };
          dispatch(addProduct(params));
          navigate("/admin/product/product-management");
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin",
            duration: 3000,
          });
        }
        break;
      }
      default:
        break;
    }
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
                  {/* <select
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
                  </select> */}
                  <Select
                    options={options}
                    styles={colorSelectStyle}
                    isMulti
                    closeMenuOnSelect={false}
                    value={category}
                    placeholder={"Loại sản phẩm"}
                    onChange={(data) => setCategory(data)}
                  />
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
