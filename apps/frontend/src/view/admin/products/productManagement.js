import { useEffect, useState } from "react";
import "./productManagement.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formatMoney,
  notification,
  sessionStorageHandle,
} from "../../../core/common/function";
import Modal from "../../../components/modal/modal";
import {
  deleteCategory,
  deleteCombo,
  deleteManyCategory,
  deleteManyCombo,
  deleteManyProduct,
  deleteProduct,
} from "../../../core/store/adminSlice";
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Title from "../../../components/dashboard/Title";
import ModalAddEditProduct from "../../../components/modal/modalAddEditProduct";
const ProductManagement = () => {
  const dispatch = useDispatch();
  const storeAdmin = useSelector((state) => state.admin);
  const listProduct = storeAdmin.productList;
  const listCategory = storeAdmin.categoryList;
  const listCombo = storeAdmin.comboList;
  const [listCheckbox, setListCheckbox] = useState([]);
  const [listCheckboxCategory, setListCheckboxCategory] = useState([]);
  const [listCheckboxCombo, setListCheckboxCombo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddEditOpen, setIsModalAddEditOpen] = useState(false);
  const [modalText, setModalText] = useState({
    headerTitle: "",
    bodyTitle: "",
    buttonAction: "",
    buttonCancel: "",
    typeConfirm: "",
  });

  const [typeAction, setTypeAction] = useState(1);
  useEffect(() => {
    sessionStorageHandle("remove", "productId");
    sessionStorageHandle("remove", "editProductId");
    sessionStorageHandle("remove", "categoryId");
    sessionStorageHandle("remove", "editCategoryId");
    sessionStorageHandle("remove", "comboId");
    sessionStorageHandle("remove", "editComboId");
  }, []);
  const maxLengthCategory = () => {
    let temp = 0;
    listProduct.forEach((product) => {
      if (product.Category.length > temp) {
        temp = product.Category.length;
      }
    });
    return temp;
  };
  const maxLengthProductCombo = () => {
    let temp = 0;
    listCombo.forEach((combo) => {
      if (combo.products.length > temp) {
        temp = combo.products.length;
      }
    });
    return temp;
  };
  const renderCategory = (category) => {
    const temp = [];
    for (let index = 0; index < maxLengthCategory(); index++) {
      temp.push(
        <TableCell key={index}>{category[index]?.categoryName ?? ""}</TableCell>
      );
    }
    return temp;
  };
  const renderProductCombo = (products) => {
    const temp = [];
    for (let index = 0; index < maxLengthProductCombo(); index++) {
      temp.push(
        <TableCell key={index}>
          {products[index]?.productName ?? ""}
          <br />
          {"Số lượng: " + products[index]?.quantity ?? ""}
        </TableCell>
      );
    }
    return temp;
  };
  const handleCheckboxChange = (ev, value) => {
    const selectedIndex = listCheckbox.indexOf(value);
    if (selectedIndex === -1) {
      setListCheckbox([...listCheckbox, value]);
    } else {
      setListCheckbox(listCheckbox.filter((item) => item !== value));
    }
  };
  const handleCheckboxCategoryChange = (ev, value) => {
    const selectedIndex = listCheckboxCategory.indexOf(value);
    if (selectedIndex === -1) {
      setListCheckboxCategory([...listCheckboxCategory, value]);
    } else {
      setListCheckboxCategory(
        listCheckboxCategory.filter((item) => item !== value)
      );
    }
  };
  const handleCheckboxComboChange = (ev, value) => {
    const selectedIndex = listCheckboxCombo.indexOf(value);
    if (selectedIndex === -1) {
      setListCheckboxCombo([...listCheckboxCombo, value]);
    } else {
      setListCheckboxCombo(listCheckboxCombo.filter((item) => item !== value));
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalAddEditOpen(false);
    sessionStorageHandle("remove", "productId");
    sessionStorageHandle("remove", "editProductId");
    sessionStorageHandle("remove", "categoryId");
    sessionStorageHandle("remove", "editCategoryId");
    sessionStorageHandle("remove", "comboId");
    sessionStorageHandle("remove", "editComboId");
  };
  const handleConfirm = () => {
    switch (modalText.typeConfirm) {
      case "DeleteProduct":
        handleClick("deleteProduct");
        break;
      case "DeleteManyProduct":
        handleClick("deleteManyProduct");
        break;
      case "DeleteCategory":
        handleClick("deleteCategory");
        break;
      case "DeleteManyCategory":
        handleClick("deleteManyCategory");
        break;
      case "DeleteCombo":
        handleClick("deleteCombo");
        break;
      case "DeleteManyCombo":
        handleClick("deleteManyCombo");
        break;
      default:
        break;
    }

    setIsModalOpen(false);
  };
  const handleClick = async (type, data) => {
    switch (type) {
      case "deleteProductConfirm": {
        setModalText({
          headerTitle: "Xoá sản phẩm",
          bodyTitle: "Bạn muốn xoá sản phẩm này",
          buttonAction: "Xoá",
          buttonCancel: "Huỷ",
          typeConfirm: "DeleteProduct",
        });
        sessionStorageHandle("set", "productId", data);
        setIsModalOpen(true);
        break;
      }
      case "deleteProduct": {
        const productId = sessionStorageHandle("get", "productId");
        await dispatch(deleteProduct(productId));
        break;
      }
      case "deleteManyProductConfirm": {
        if (listCheckbox.length === 0) {
          notification({
            type: "error",
            message: "Vui lòng chọn sản phẩm muốn xoá",
            duration: 3000,
          });
        } else {
          setModalText({
            headerTitle: "Xoá sản phẩm",
            bodyTitle: "Bạn muốn xoá các sản phẩm này",
            buttonAction: "Xoá",
            buttonCancel: "Huỷ",
            typeConfirm: "DeleteManyProduct",
          });
          setIsModalOpen(true);
        }
        break;
      }
      case "deleteManyProduct": {
        await dispatch(deleteManyProduct(listCheckbox));
        setListCheckbox([]);
        break;
      }
      case "addProduct": {
        setIsModalAddEditOpen(true);
        setTypeAction(1);
        break;
      }
      case "editProduct": {
        setIsModalAddEditOpen(true);
        setTypeAction(2);
        sessionStorageHandle("set", "editProductId", data);
        break;
      }
      case "deleteCategoryConfirm": {
        setModalText({
          headerTitle: "Xoá loại sản phẩm",
          bodyTitle: "Bạn muốn xoá loại sản phẩm này",
          buttonAction: "Xoá",
          buttonCancel: "Huỷ",
          typeConfirm: "DeleteCategory",
        });
        sessionStorageHandle("set", "categoryId", data);
        setIsModalOpen(true);
        break;
      }
      case "deleteCategory": {
        const productId = sessionStorageHandle("get", "categoryId");
        await dispatch(deleteCategory(productId));
        break;
      }
      case "deleteManyCategoryConfirm": {
        if (listCheckboxCategory.length === 0) {
          notification({
            type: "error",
            message: "Vui lòng chọn loại sản phẩm muốn xoá",
            duration: 3000,
          });
        } else {
          setModalText({
            headerTitle: "Xoá các loại sản phẩm",
            bodyTitle: "Bạn muốn xoá các loại sản phẩm này",
            buttonAction: "Xoá",
            buttonCancel: "Huỷ",
            typeConfirm: "DeleteManyCategory",
          });
          setIsModalOpen(true);
        }
        break;
      }
      case "deleteManyCategory": {
        await dispatch(deleteManyCategory(listCheckboxCategory));
        setListCheckbox([]);
        break;
      }
      case "addCategory": {
        setIsModalAddEditOpen(true);
        setTypeAction(3);
        break;
      }
      case "editCategory": {
        setIsModalAddEditOpen(true);
        setTypeAction(4);
        sessionStorageHandle("set", "editCategoryId", data);
        break;
      }

      case "deleteComboConfirm": {
        setModalText({
          headerTitle: "Xoá combo",
          bodyTitle: "Bạn muốn xoá combo này",
          buttonAction: "Xoá",
          buttonCancel: "Huỷ",
          typeConfirm: "DeleteCombo",
        });
        sessionStorageHandle("set", "comboId", data);
        setIsModalOpen(true);
        break;
      }
      case "deleteCombo": {
        const productId = sessionStorageHandle("get", "comboId");
        await dispatch(deleteCombo(productId));
        break;
      }
      case "deleteManyComboConfirm": {
        if (listCheckboxCombo.length === 0) {
          notification({
            type: "error",
            message: "Vui lòng chọn combo muốn xoá",
            duration: 3000,
          });
        } else {
          setModalText({
            headerTitle: "Xoá combo",
            bodyTitle: "Bạn muốn xoá các combo này",
            buttonAction: "Xoá",
            buttonCancel: "Huỷ",
            typeConfirm: "DeleteManyCombo",
          });
          setIsModalOpen(true);
        }
        break;
      }
      case "deleteManyCombo": {
        await dispatch(deleteManyCombo(listCheckboxCombo));
        setListCheckbox([]);
        break;
      }
      case "addCombo": {
        setIsModalAddEditOpen(true);
        setTypeAction(5);
        break;
      }
      case "editCombo": {
        setIsModalAddEditOpen(true);
        setTypeAction(6);
        sessionStorageHandle("set", "editComboId", data);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 0 }} className="!max-w-none">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Quản lý sản phẩm</Title>
                <div className="overflow-y-scroll max-h-[250px]">
                  <Table size="small">
                    <TableHead className="sticky top-0">
                      <TableRow>
                        <TableCell className="min-w-[30px]"></TableCell>
                        <TableCell className="min-w-[125px]">
                          Tên sản phẩm
                        </TableCell>
                        <TableCell className="min-w-[60px]">Giá</TableCell>
                        <TableCell className="min-w-[125px]">
                          Số lượng tồn
                        </TableCell>
                        <TableCell
                          className="min-w-[125px]"
                          align="center"
                          colSpan={maxLengthCategory()}
                        >
                          Loại sản phẩm
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listProduct?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <input
                              className="checkbox"
                              type="checkbox"
                              onChange={(ev) =>
                                handleCheckboxChange(ev, product.ProductID)
                              }
                              checked={listCheckbox.includes(product.ProductID)}
                              value={product.ProductID}
                            />
                          </TableCell>
                          <TableCell>{product.ProductName}</TableCell>
                          <TableCell>{formatMoney(product.Price)}</TableCell>
                          <TableCell>{product.StockQuantity}</TableCell>
                          {renderCategory(product.Category)}
                          <TableCell>
                            {" "}
                            <div className="flex justify-center">
                              <img
                                alt="icon-edit"
                                src="/icon/iconPen.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick("editProduct", product.ProductID)
                                }
                              ></img>
                              <img
                                alt="icon-delete"
                                src="/icon/iconDelete.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick(
                                    "deleteProductConfirm",
                                    product.ProductID
                                  )
                                }
                              ></img>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex mt-[10px]">
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("addProduct")}
                    >
                      Thêm sản phẩm
                    </Button>
                  </div>
                  <div className="ml-[5px]">
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("deleteManyProductConfirm")}
                    >
                      Xoá sản phẩm đã chọn
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* <div className="flex">
          <div className="w-1/2"> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 0 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Loại sản phẩm</Title>
                <div className="overflow-y-scroll max-h-[250px]">
                  <Table size="small">
                    <TableHead className="sticky top-0">
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell className="min-w-[60px]">ID</TableCell>
                        <TableCell className="min-w-[110px]">
                          Loại sản phẩm
                        </TableCell>
                        <TableCell className="min-w-[50px]"></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listCategory?.map((category, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <input
                              className="checkbox"
                              type="checkbox"
                              onChange={(ev) =>
                                handleCheckboxCategoryChange(
                                  ev,
                                  category.categoryId
                                )
                              }
                              checked={listCheckboxCategory.includes(
                                category.categoryId
                              )}
                              value={category.categoryId}
                            />
                          </TableCell>
                          <TableCell>{category.categoryId}</TableCell>
                          <TableCell>{category.categoryName}</TableCell>
                          <TableCell>
                            {" "}
                            <div className="flex justify-center">
                              <img
                                alt="icon-edit"
                                src="/icon/iconPen.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick(
                                    "editCategory",
                                    category.categoryId
                                  )
                                }
                              ></img>
                              <img
                                alt="icon-delete"
                                src="/icon/iconDelete.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick(
                                    "deleteCategoryConfirm",
                                    category.categoryId
                                  )
                                }
                              ></img>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex mt-[10px]">
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("addCategory")}
                    >
                      Thêm loại sản phẩm
                    </Button>
                  </div>
                  <div className="ml-[5px]">
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("deleteManyCategoryConfirm")}
                    >
                      Xoá loại sản phẩm đã chọn
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* </div> */}

        {/* <div className="w-1/2"> */}
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Combo sản phẩm</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Tên Combo</TableCell>
                      <TableCell>Phần trăm giảm</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell
                        align="center"
                        colSpan={maxLengthProductCombo()}
                      >
                        Sản phẩm
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listCombo?.map((combo, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <input
                            className="checkbox"
                            type="checkbox"
                            onChange={(ev) =>
                              handleCheckboxComboChange(ev, combo.comboId)
                            }
                            checked={listCheckboxCombo.includes(combo.comboId)}
                            value={combo.comboId}
                          />
                        </TableCell>
                        <TableCell>{combo.comboName}</TableCell>
                        <TableCell>{combo.discountPercentage}</TableCell>
                        <TableCell>{formatMoney(combo.price)}</TableCell>
                        {renderProductCombo(combo.products)}
                        <TableCell>
                          {" "}
                          <div className="flex justify-center">
                            <img
                              alt="icon-edit"
                              src="/icon/iconPen.png"
                              className="w-[30px] cursor-pointer"
                              onClick={() =>
                                handleClick("editCombo", combo.comboId)
                              }
                            ></img>
                            <img
                              alt="icon-delete"
                              src="/icon/iconDelete.png"
                              className="w-[30px] cursor-pointer"
                              onClick={() =>
                                handleClick("deleteComboConfirm", combo.comboId)
                              }
                            ></img>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex mt-[10px]">
                  <div>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("addCombo")}
                    >
                      Thêm combo
                    </Button>
                  </div>
                  <div className="ml-[5px]">
                    <Button
                      variant="outlined"
                      onClick={() => handleClick("deleteManyComboConfirm")}
                    >
                      Xoá combo đã chọn
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {/* </div> */}
        {/* </div> */}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        headerTitle={modalText.headerTitle}
        bodyTitle={modalText.bodyTitle}
        buttonAction={modalText.buttonAction}
        buttonCancel={modalText.buttonCancel}
      />
      <ModalAddEditProduct
        isOpen={isModalAddEditOpen}
        buttonAction="Xác nhận"
        buttonCancel="Huỷ"
        onClose={handleCloseModal}
        typeAction={typeAction}
      />
    </>
  );
};

export default ProductManagement;
