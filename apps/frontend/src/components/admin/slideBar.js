import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const SlideBarAdmin = () => {
  const slideBarTemp = [
    {
      name: "Home",
      label: "Home",
      active: false,
      activeSub: false,
      router: "Home",
      // icon: "home",
      path: "/",
      // activeMenu: ["Home"],
      subMenu: null,
      // role: [1, 2],
    },
    {
      name: "ProductManagement",
      label: "Quản lý sản phẩm",
      active: false,
      activeSub: false,
      router: null,
      // icon: "settings",
      path: "",
      // role: [1, 2],
      subMenu: [
        {
          name: "Product",
          label: "Sản phẩm",
          router: "productManagement",
          path: "/product/product-management",
          // activeMenu: ["BookCreate"],
          active: false,
          // role: [1, 2],
        },
        {
          name: "ProductCombo",
          label: "Combo sản phẩm",
          router: "ProductCombo",
          path: "/product/product-combo",
          // activeMenu: ["BookEdit"],
          active: false,
          // role: [1, 2],
        },
        {
          name: "ProductType",
          label: "Loại sản phẩm",
          router: "BookExport",
          path: "/product/product-type",
          // activeMenu: ["BookExport"],
          active: false,
          // role: [1, 2],
        },
      ],
    },
    {
      name: "ProductComment",
      label: "Quản lý bình luận đánh giá",
      active: false,
      activeSub: false,
      router: "productComment",
      // icon: "home",
      path: "/product/product-comment",
      // activeMenu: ["Home"],
      subMenu: null,
      // role: [1, 2],
    },
    {
      name: "OrderManagement",
      label: "Quản lý đơn hàng",
      active: false,
      activeSub: false,
      router: "orderManagement",
      // icon: "home",
      path: "/order-management",
      // activeMenu: ["Home"],
      subMenu: null,
      // role: [1, 2],
    },
    {
      name: "Voucher",
      label: "Tạo voucher",
      active: false,
      activeSub: false,
      router: "voucher",
      // icon: "home",
      path: "/voucher",
      // activeMenu: ["Home"],
      subMenu: null,
      // role: [1, 2],
    },
    {
      name: "AccessManagement",
      label: "Quản lý truy cập hệ thống",
      active: false,
      activeSub: false,
      router: "AccessManagement",
      // icon: "home",
      path: "/access-management",
      // activeMenu: ["Home"],
      subMenu: null,
      // role: [1, 2],
    },
    {
      name: "Logout",
      label: "Đăng xuất",
      active: false,
      activeSub: false,
      router: "Logout",
      // icon: "logout",
      path: "/logout",
      // role: [1, 2],
    },
  ];
  const [slideBar, setSlideBar] = useState(slideBarTemp);
  const navigate = useNavigate();
  // index: number
  // name: string
  /**
   * @param {number} index
   * @param {string} name page name
   * @return {void}
   */
  const clickLink = async (path) => {
    console.log(path);
    if (path === "/logout") {
      // logout action
    } else {
      navigate(`/admin${path}`);
    }
  };
  /**
   * @param {string} name sub active
   * @return {void}
   */
  const onToggleSubMenu = (name) => {
    const temp = [...slideBar];
    temp.forEach((item) => {
      if (item?.name === name) {
        item.activeSub = !item.activeSub;
      }
    });
    setSlideBar(() => temp);
  };

  /**
   * render sildebar
   * @return {void}
   */
  const renderSlideBar = () => {
    const result = slideBar?.map((item, index) => {
      return (
        <div
          key={index}
          className={`py-[16px] px-0 flex items-start justify-center flex-col cursor-pointer ${
            item.active ? "bg-pale-cerulean text-cerulean-blue" : ""
          } ${
            !item.activeSub
              ? "hover:bg-pale-cerulean hover:text-cerulean-blue"
              : ""
          }`}
          onClick={!item?.subMenu ? () => clickLink(item.path) : () => {}}
        >
          <li
            className="flex items-center justify-start px-[15px] text-[14px] font-bold w-full"
            onClick={
              item?.subMenu ? () => onToggleSubMenu(item.name) : () => {}
            }
          >
            {item.label}
          </li>
          {item?.subMenu && (item.active || item.activeSub) ? (
            <ul className="text-[12px] mt-[8px] w-full">
              {item?.subMenu?.map((itemSub, indexSub) => {
                return (
                  <div key={indexSub}>
                    <li
                      className={`pl-[45px] py-[5px] text-left font-bold hover:bg-pale-cerulean hover:text-cerulean-blue cursor-pointer ${
                        itemSub.active
                          ? "bg-pale-cerulean text-cerulean-blue"
                          : ""
                      }`}
                      onClick={() => clickLink(itemSub.path)}
                    >
                      {itemSub?.label}
                    </li>
                  </div>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      );
    });
    return result;
  };
  return (
    <div className="bg-non-photo-blue min-w-[230px] h-full pt-[30px] flex flex-col justify-between overflow-y-auto">
      <div>
        <p className="font-bold text-[20px] text-black text-center">Admin</p>
        <ul className="pt-[20px]">{renderSlideBar()}</ul>
      </div>
    </div>
  );
};

export default SlideBarAdmin;
