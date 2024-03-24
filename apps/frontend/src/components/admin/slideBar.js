import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box } from "@mui/material";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import KeyIcon from "@mui/icons-material/Key";
import BookIcon from "@mui/icons-material/Book";
import SellIcon from "@mui/icons-material/Sell";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    height: "100vh",
  },
}));

export default function SlideBar({ openDrawer, toggleDrawer }) {
  const navigate = useNavigate();
  const toggle = () => {
    toggleDrawer();
  };

  const slideBarList = [
    {
      name: "ProductManagement",
      path: "/product/product-management",
      label: "Sản phẩm",
      icon: <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>,
    },
    {
      name: "ProductComment",
      path: "/product/product-comment",
      label: "Bình luận đánh giá",
      icon: <CommentIcon></CommentIcon>,
    },
    {
      name: "OrderManagement",
      path: "/order-management",
      label: "Đơn hàng",
      icon: <SellIcon></SellIcon>,
    },
    {
      name: "Voucher",
      path: "/voucher",
      label: "Tạo voucher",
      icon: <BookIcon></BookIcon>,
    },
    {
      name: "AccessManagement",
      path: "/access-management",
      label: "Truy cập hệ thống",
      icon: <KeyIcon></KeyIcon>,
    },
  ];
  const renderSlideBar = () => {
    return slideBarList.map((item, index) => {
      return (
        <ListItemButton
          onClick={() => {
            navigate(`/admin${item.path}`);
          }}
          key={index}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      );
    });
  };
  return (
    <Box>
      <Drawer variant="permanent" open={openDrawer}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggle}>
            {/* <h1>Admin</h1> */}
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{renderSlideBar()}</List>
      </Drawer>
    </Box>
  );
}
