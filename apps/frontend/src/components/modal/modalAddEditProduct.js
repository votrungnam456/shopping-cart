/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  isNumber,
  notification,
  sessionStorageHandle,
} from "../../core/common/function";
import {
  addCategory,
  addCombo,
  addProduct,
  editCategory,
  editCombo,
  editProduct,
} from "../../core/store/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Select as MuiSelect } from "@mui/material";
import Select from "react-select";

const ModalAddEditProduct = ({
  isOpen,
  onClose,
  // onConfirm,
  buttonAction,
  buttonCancel,
  // children,
  typeAction,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState([]);
  const [options, setOptions] = useState([]);
  const [productListCombo, setProductListCombo] = useState([{}]);
  const [numberProductList, setnumberProductList] = useState(1);
  const [percent, setPercent] = useState("");
  const storeAdmin = useSelector((state) => state.admin);
  const clearData = () => {
    setName("");
    setDescription("");
    setPrice("");
    setQuantity(0);
    setCategory([]);
    setProductListCombo([{}]);
    setnumberProductList(1);
    setPercent("");
  };

  const confirmAction = async (type, data) => {
    switch (type) {
      case 1: {
        // add product
        if (checkValidate(type)) {
          const convertDataCategory = category.map((data) => {
            return {
              categoryId: data.value,
              categoryName: data.label,
            };
          });
          const params = {
            productName: name,
            description: description,
            price: price,
            stockQuantity: quantity,
            category: convertDataCategory,
          };
          await dispatch(addProduct(params));
          // if (storeAdmin.isAddProductSuccess) {
          clearData();
          onClose();
          // }
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin",
            duration: 3000,
          });
        }
        break;
      }
      case 2: {
        // edit product
        if (checkValidate(type)) {
          const id = sessionStorageHandle("get", "editProductId");
          const convertDataCategory = category.map((data) => {
            return {
              categoryId: data.value,
              categoryName: data.label,
            };
          });
          const params = {
            productId: id,
            productName: name,
            description: description,
            price: price,
            stockQuantity: quantity,
            category: convertDataCategory,
          };
          await dispatch(editProduct(params));
          // if (storeAdmin.isEditProductSuccess) {
          clearData();
          onClose();
          // }
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin",
            duration: 3000,
          });
        }
        break;
      }
      case 3: {
        // add category
        if (checkValidate(type)) {
          const params = {
            categoryName: name,
          };
          await dispatch(addCategory(params));
          clearData();
          onClose();
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin",
            duration: 3000,
          });
        }
        break;
      }
      case 4: {
        // edit category
        if (checkValidate(type)) {
          const id = sessionStorageHandle("get", "editCategoryId");
          const params = {
            categoryId: id,
            categoryName: name,
          };
          await dispatch(editCategory(params));
          clearData();
          onClose();
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin",
            duration: 3000,
          });
        }
        break;
      }
      case 5: {
        // add combo
        if (checkValidate(type)) {
          const filteredInput = productListCombo.filter(
            (obj) =>
              obj.productId &&
              obj.productId !== undefined &&
              obj.productId !== "" &&
              obj.quantity
          );
          const productListTemp = filteredInput.reduce(
            (accumulator, currentValue) => {
              const productId = currentValue.productId;
              const quantity = currentValue.quantity;
              if (accumulator[productId]) {
                accumulator[productId].quantity += quantity;
              } else {
                accumulator[productId] = {
                  productId: productId,
                  quantity: quantity,
                };
              }
              return accumulator;
            },
            {}
          );
          Object.values(productListTemp).forEach((product) => {
            const found = storeAdmin.productList.find(
              (item) => item.productId === product.productId
            );
            if (found) {
              product.productName = found.productName;
            }
          });
          const params = {
            comboName: name,
            description: description,
            price: price,
            discountPercentage: percent,
            products: Object.values(productListTemp),
          };
          await dispatch(addCombo(params));
          clearData();
          onClose();
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin và có ít nhất 1 sản phẩm",
            duration: 3000,
          });
        }
        break;
      }

      case 6: {
        // edit combo
        if (checkValidate(type)) {
          const id = sessionStorageHandle("get", "editComboId");
          const filteredInput = productListCombo.filter(
            (obj) =>
              obj.productId &&
              obj.productId !== undefined &&
              obj.productId !== "" &&
              obj.quantity
          );
          const productListTemp = filteredInput.reduce(
            (accumulator, currentValue) => {
              const productId = currentValue.productId;
              const quantity = currentValue.quantity;
              if (accumulator[productId]) {
                accumulator[productId].quantity += quantity;
              } else {
                accumulator[productId] = {
                  productId: productId,
                  quantity: quantity,
                };
              }
              return accumulator;
            },
            {}
          );
          Object.values(productListTemp).forEach((product) => {
            const found = storeAdmin.productList.find(
              (item) => item.productId === product.productId
            );
            if (found) {
              product.productName = found.productName;
            }
          });
          const params = {
            comboId: id,
            comboName: name,
            description: description,
            price: price,
            discountPercentage: percent,
            products: Object.values(productListTemp),
          };
          await dispatch(editCombo(params));
          clearData();
          onClose();
        } else {
          notification({
            type: "error",
            message: "Vui lòng nhập đầy đủ thông tin và có ít nhất 1 sản phẩm",
            duration: 3000,
          });
        }
        break;
      }
      default:
        break;
    }
  };
  const colorSelectStyle = {
    control: (styles) => ({
      ...styles,
      // backgroundColor: "var(--dark-electric-blue)",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        // backgroundColor: "#567086",
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        // backgroundColor: "var(--color-marigold)",
      };
    },
  };
  useEffect(() => {
    if (isOpen && typeAction === 2) {
      const id = sessionStorageHandle("get", "editProductId");
      const filter = storeAdmin.productList?.filter(
        (product) => product.productId === id
      );
      if (filter) {
        setName(filter[0].productName);
        setDescription(filter[0].description);
        setPrice(filter[0].price);
        setQuantity(filter[0].stockQuantity);
        setCategory(
          filter[0].category.map((item) => {
            return {
              value: item.categoryId,
              label: item.categoryName,
            };
          })
        );
      } else {
        notification({
          type: "error",
          message: "Không tìm thấy thông tin sản phẩm",
          duration: 3000,
        });
      }
    }
    if (isOpen && [1, 2].includes(typeAction)) {
      const temp = storeAdmin.categoryList.map((item) => ({
        value: item.categoryId,
        label: item.categoryName,
      }));
      setOptions(temp);
    }
    if (isOpen && typeAction === 4) {
      const id = sessionStorageHandle("get", "editCategoryId");
      const filter = storeAdmin.categoryList?.filter(
        (category) => category.categoryId === id
      );
      if (filter) {
        setName(filter[0].categoryName);
      } else {
        notification({
          type: "error",
          message: "Không tìm thấy thông tin loại sản phẩm này",
          duration: 3000,
        });
      }
    }
    if (isOpen && typeAction === 6) {
      const id = sessionStorageHandle("get", "editComboId");
      const filter = storeAdmin.comboList?.filter(
        (combo) => combo.comboId === id
      );
      if (filter) {
        setName(filter[0].comboName);
        setPercent(filter[0].discountPercentage);
        setDescription(filter[0].description);
        setPrice(filter[0].price);
        const temp = filter[0].products.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        setProductListCombo(temp);
        setnumberProductList(filter[0].products.length);
      } else {
        notification({
          type: "error",
          message: "Không tìm thấy thông tin combo này",
          duration: 3000,
        });
      }
    }
  }, [typeAction, isOpen]);
  useEffect(() => {
    const temp = storeAdmin.categoryList.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
    }));
    setOptions(temp);
  }, []);
  const onlyInputNumber = (ev, type, anotherData) => {
    const dataInput = ev.target.value;
    if (isNumber(dataInput)) {
      if (type === "price") {
        setPrice(dataInput);
      } else if (type === "quantity") {
        setQuantity(isNaN(parseInt(dataInput)) ? 0 : parseInt(dataInput));
      } else if (type === "percent") {
        if (!isNaN(parseInt(dataInput))) {
          if (parseInt(dataInput) > 100) {
            setPercent("100");
            return;
          } else if (parseInt(dataInput) < 0) {
            setPercent("0");
            return;
          } else {
            setPercent(dataInput);
          }
        } else {
          setPercent("0");
        }
      } else if (type === "productQuantity") {
        // anotherData is index of productList
        const temp = isNaN(parseInt(dataInput)) ? 0 : parseInt(dataInput);
        const tempList = [...productListCombo];
        tempList[anotherData].quantity = temp;
        setProductListCombo(tempList);
      }
    }
  };
  const checkValidate = (type) => {
    switch (type) {
      case 1:
      case 2: {
        return (
          name !== "" && price !== "" && quantity !== 0 && category.length !== 0
        );
      }
      case 3:
      case 4: {
        return name !== "";
      }
      case 5:
      case 6: {
        const filteredInput = productListCombo.filter(
          (obj) =>
            obj.productId &&
            obj.productId !== undefined &&
            obj.productId !== "" &&
            obj.quantity
        );
        return (
          name !== "" &&
          price !== "" &&
          percent !== "" &&
          filteredInput.length > 0
        );
      }
      default:
        return false;
    }
  };
  const handleChange = (event, index) => {
    const temp = [...productListCombo];
    temp[index].productId = event.target.value;
    setProductListCombo(temp);
  };
  const renderNumberProductList = () => {
    const result = [];
    for (let i = 0; i < numberProductList; i++) {
      result.push(
        <div key={i}>
          <div className="flex">
            <div className="mb-[5px] w-1/2">
              <p className="mb-[10px]">
                Sản phẩm <span className="text-red">*</span>
              </p>
              <MuiSelect
                className="w-[249px] h-[50px] border-dark-electric-blue border-[1px] border-solid"
                value={productListCombo[i]?.productId ?? ""}
                onChange={(ev) => handleChange(ev, i)}
              >
                <MenuItem className="h-[36px]" value=""></MenuItem>
                {storeAdmin.productList.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.productId}>
                      {item.productName}
                    </MenuItem>
                  );
                })}
              </MuiSelect>
            </div>

            <div className="mb-[5px] ml-[5px]  w-1/2">
              <p className="mb-[10px]">
                Số lượng <span className="text-red">*</span>
              </p>
              <input
                value={productListCombo[i]?.quantity ?? 0}
                onChange={(e) => onlyInputNumber(e, "productQuantity", i)}
                className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px]"
              ></input>
            </div>
          </div>
        </div>
      );
    }
    return result;
  };
  const renderUI = () => {
    if ([1, 2].includes(typeAction)) {
      return (
        <div className="flex justify-center">
          <div className="w-full h-full">
            <div className=" mx-auto">
              <h1 className="text-3xl font-semibold text-center my-[10px]">
                {typeAction === 1 ? "Thêm sản phẩm" : "Sửa sản phẩm"}
              </h1>
              <div className="flex justify-center items-center">
                <div className="p-[20px] w-[600px]">
                  <div className="">
                    <div className="mb-[5px]">
                      <p className="mb-[10px]">
                        Tên Sản Phẩm <span className="text-red">*</span>
                      </p>
                      <input
                        className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px] focus:border-red focus:border-[1px] focus:border-solid"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div className="mb-[5px]">
                      <p className="mb-[10px]">
                        Loại Sản Phẩm <span className="text-red">*</span>
                      </p>
                      <Select
                        className="border-dark-electric-blue border-[1px] border-solid"
                        options={options}
                        styles={colorSelectStyle}
                        isMulti
                        closeMenuOnSelect={false}
                        value={category}
                        placeholder={"Loại sản phẩm"}
                        onChange={(data) => setCategory(data)}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary: "black",
                          },
                        })}
                      />
                    </div>
                    <div>
                      <p className="mb-[10px]">Mô Tả</p>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-dark-electric-blue border-[1px] border-solid h-[120x] w-full p-[18px]"
                      ></textarea>
                    </div>
                    <div className="flex">
                      <div className="mb-[5px] w-1/2">
                        <p className="mb-[10px]">
                          Giá <span className="text-red">*</span>
                        </p>
                        <input
                          value={price}
                          onChange={(e) => onlyInputNumber(e, "price")}
                          className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px]"
                        ></input>
                      </div>

                      <div className="mb-[5px] ml-[5px]  w-1/2">
                        <p className="mb-[10px]">
                          Số lượng <span className="text-red">*</span>
                        </p>
                        <input
                          value={quantity}
                          onChange={(e) => onlyInputNumber(e, "quantity")}
                          className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px]"
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if ([3, 4].includes(typeAction)) {
      return (
        <div className="flex justify-center">
          <div className="w-full h-full">
            <div className=" mx-auto">
              <h1 className="text-3xl font-semibold text-center my-[10px]">
                {typeAction === 3 ? "Thêm loại sản phẩm" : "Sửa loại sản phẩm"}
              </h1>
              <div className="flex justify-center items-center">
                <div className="p-[20px] w-[600px]">
                  <div className="">
                    <div className="mb-[5px]">
                      <p className="mb-[10px]">
                        Tên Loại Sản Phẩm <span className="text-red">*</span>
                      </p>
                      <input
                        className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px] focus:border-red focus:border-[1px] focus:border-solid"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if ([5, 6].includes(typeAction)) {
      return (
        <div className="flex justify-center">
          <div className="w-full h-full">
            <div className=" mx-auto">
              <h1 className="text-3xl font-semibold text-center my-[10px]">
                {typeAction === 1 ? "Thêm combo" : "Sửa thông tin combo"}
              </h1>
              <div className="flex justify-center items-center">
                <div className="p-[20px] w-[600px] max-h-[470px] overflow-x-scroll">
                  <div className="">
                    <div className="mb-[5px]">
                      <p className="mb-[10px]">
                        Tên Combo <span className="text-red">*</span>
                      </p>
                      <input
                        className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px] focus:border-red focus:border-[1px] focus:border-solid"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <p className="mb-[10px]">Mô Tả</p>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border-dark-electric-blue border-[1px] border-solid h-[120x] w-full p-[18px]"
                      ></textarea>
                    </div>
                    <div className="flex">
                      <div className="mb-[5px] w-1/2">
                        <p className="mb-[10px]">
                          Giá <span className="text-red">*</span>
                        </p>
                        <input
                          value={price}
                          onChange={(e) => onlyInputNumber(e, "price")}
                          className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px]"
                        ></input>
                      </div>

                      <div className="mb-[5px] ml-[5px]  w-1/2">
                        <p className="mb-[10px]">
                          Phần trăm giảm <span className="text-red">*</span>
                        </p>
                        <input
                          value={percent}
                          onChange={(e) => onlyInputNumber(e, "percent")}
                          className="border-dark-electric-blue border-[1px] border-solid h-[50px] w-full p-[18px]"
                        ></input>
                      </div>
                    </div>
                    <div>{renderNumberProductList()}</div>
                    <div className="text-center">
                      <span
                        className="text-cyan-blue-azure mt-[5px] underline cursor-pointer hover:text-blue-2"
                        onClick={() => handleClick("addProductForCombo")}
                      >
                        Thêm sản phẩm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
  const handleClick = (type) => {
    switch (type) {
      case "addProductForCombo": {
        setnumberProductList(numberProductList + 1);
        setProductListCombo([...productListCombo, {}]);
        break;
      }
      case "onClose": {
        clearData();
        onClose();
        break;
      }
      default:
        break;
    }
  };
  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:mt-8 sm:align-middle sm:max-w-[37rem] sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[550px]">
                {renderUI()}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => confirmAction(typeAction)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {buttonAction}
                </button>
                <button
                  onClick={() => handleClick("onClose")}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {buttonCancel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAddEditProduct;
