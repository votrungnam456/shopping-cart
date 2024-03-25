import Cookies from "js-cookie";
const localStorageHandle = (type, itemName, value) => {
  switch (type) {
    case "get": {
      const getItem = localStorage.getItem(itemName);
      return getItem && getItem !== "undefined" ? JSON.parse(getItem) : null;
    }
    case "set":
      return localStorage.setItem(itemName, JSON.stringify(value));
    case "remove":
      return localStorage.removeItem(itemName);
    default:
      break;
  }
};
const sessionStorageHandle = (type, itemName, value) => {
  switch (type) {
    case "get": {
      const getItem = sessionStorage.getItem(itemName);
      return getItem && getItem !== "undefined" ? JSON.parse(getItem) : null;
    }
    case "set":
      return sessionStorage.setItem(itemName, JSON.stringify(value));
    case "remove":
      return sessionStorage.removeItem(itemName);
    default:
      break;
  }
};

const cookies = (type, name, value, days = 30) => {
  if (type === "set") {
    Cookies.set(name, JSON.stringify(value), { expires: days });
  }
  if (type === "get") {
    return JSON.parse(Cookies.get(name) || "null");
  }
  if (type === "delete") {
    Cookies.remove(name);
  }
};
const scrollToTop = () => {
  window.scrollTo(0, 0);
};
const notification = async ({
  type = "success",
  message = "",
  duration = 1000,
  className = "",
}) => {
  const rndInt = Math.floor(Math.random() * 600) + 1;
  const typeClass =
    type === "success"
      ? "border-royal-green !text-royal-green"
      : "border-royal-red !text-royal-red";
  const renderCompont = `
  <div class="message-box message-dialog right-[25px] border-2 bg-white px-[20px] py-[5px] rounded fixed text-white align-middle ${typeClass} ${className} notification-${rndInt}">
    ${message}
  </div>
  `;
  const nodeRender = document.createElement("div");
  document.querySelector("#root")?.appendChild(nodeRender);
  nodeRender.innerHTML = renderCompont;
  const elementItem = document.getElementsByClassName(
    `notification-${rndInt}`
  )[0];

  if (elementItem !== null) {
    await setTimeout(() => {
      elementItem.classList.add("show");
    }, 200);
    await setTimeout(async () => {
      elementItem.classList.remove("show");
    }, duration);
    await setTimeout(() => {
      elementItem?.parentNode?.removeChild(elementItem);
    }, duration + 500);
    await setTimeout(() => {
      nodeRender.remove();
    }, duration + 600);
  }
};

const isNumber = (data) => {
  return !isNaN(data);
};
const formatMoney = (value) => {
  return isNaN(parseInt(value))
    ? 0
    : parseInt(value).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
};
const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
export {
  localStorageHandle,
  sessionStorageHandle,
  notification,
  scrollToTop,
  isNumber,
  formatMoney,
  isObjectEmpty,
  cookies,
};
