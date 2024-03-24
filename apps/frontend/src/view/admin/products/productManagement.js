import { useEffect, useState } from "react";
import "./productManagement.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  formatMoney,
  notification,
  sessionStorageHandle,
} from "../../../core/common/function";
import Modal from "../../../components/common/modal";
import {
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
const ProductManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.admin).productList;
  const [listCheckbox, setListCheckbox] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState({
    headerTitle: "",
    bodyTitle: "",
    buttonAction: "",
    buttonCancel: "",
    typeConfirm: "",
  });
  useEffect(() => {
    sessionStorageHandle("remove", "productId");
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
  const renderCategory = (category) => {
    const temp = [];
    for (let index = 0; index < maxLengthCategory(); index++) {
      temp.push(
        <TableCell key={index}>{category[index]?.categoryName ?? ""}</TableCell>
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
  const handleCloseModal = () => {
    setIsModalOpen(false);
    sessionStorageHandle("remove", "productId");
  };
  const handleConfirm = () => {
    switch (modalText.typeConfirm) {
      case "DeleteProduct":
        handleClick("deleteProduct");
        break;
      case "DeleteManyProduct":
        handleClick("deleteManyProduct");
        break;
      default:
        break;
    }

    setIsModalOpen(false);
  };
  const handleClick = async (type, data) => {
    switch (type) {
      case "addProduct":
        navigate("/admin/product/product-management/add");
        break;
      case "editProduct":
        navigate(`/admin/product/product-management/edit/${data}`);
        break;
      case "deleteProductConfirm":
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
      case "deleteProduct": {
        const productId = sessionStorageHandle("get", "productId");
        await dispatch(deleteProduct(productId));
        break;
      }

      case "deleteManyProductConfirm":
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
      case "deleteManyProduct":
        await dispatch(deleteManyProduct(listCheckbox));
        setListCheckbox([]);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Title>Quản lý sản phẩm</Title>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell>Số lượng tồn</TableCell>
                      <TableCell align="center" colSpan={maxLengthCategory()}>
                        Loại sản phẩm
                      </TableCell>
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
    </>
  );
};

export default ProductManagement;
