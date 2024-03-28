import { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
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
import Title from "../../../../components/dashboard/Title";
import { sessionStorageHandle } from "../../../../core/common/function";
const ProductReview = () => {
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
  const handleCheckboxChange = (ev, value) => {
    // const selectedIndex = listCheckbox.indexOf(value);
    // if (selectedIndex === -1) {
    //   setListCheckbox([...listCheckbox, value]);
    // } else {
    //   setListCheckbox(listCheckbox.filter((item) => item !== value));
    // }
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
  const handleConfirm = () => {};
  const handleClick = async (type, data) => {
    switch (type) {
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 0 }}>
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
                          Khách hàng
                        </TableCell>
                        <TableCell className="min-w-[125px]">
                          Bình luận
                        </TableCell>
                        <TableCell align="center">Đánh giá</TableCell>
                        <TableCell align="center">
                          Thời gian bình luận
                        </TableCell>
                        <TableCell align="center">Ẩn bình luận</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {listProduct?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <input
                              className="checkbox"
                              type="checkbox"
                              onChange={(ev) =>
                                handleCheckboxChange(ev, product.productId)
                              }
                              checked={listCheckbox.includes(product.productId)}
                              value={product.productId}
                            />
                          </TableCell>
                          <TableCell>{product.productName}</TableCell>
                          <TableCell>{formatMoney(product.price)}</TableCell>
                          <TableCell>{product.stockQuantity}</TableCell>
                          {renderCategory(product.category)}
                          <TableCell>
                            {" "}
                            <div className="flex justify-center">
                              <img
                                alt="icon-edit"
                                src="/icon/iconPen.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick("editProduct", product.productId)
                                }
                              ></img>
                              <img
                                alt="icon-delete"
                                src="/icon/iconDelete.png"
                                className="w-[30px] cursor-pointer"
                                onClick={() =>
                                  handleClick(
                                    "deleteProductConfirm",
                                    product.productId
                                  )
                                }
                              ></img>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))} */}
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
      </div>
      {/* 
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
      /> */}
    </>
  );
};

export default ProductReview;
