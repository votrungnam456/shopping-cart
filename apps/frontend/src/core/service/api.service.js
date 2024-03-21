import axios from "axios";
import { cookies } from "@/core/helper/commonFunction";
// import router from "@/core/router";
// import { genderController } from "@/core/service/tokenAxios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_PATH,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc chỗ khác
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const deleteCookie = async () => {
  await cookies("delete", "token");
  await cookies("delete", "info");
};
// Add a response interceptor
instance.interceptors.response.use(
  async (response) => {
    // const temp = response.data?.errors;
    // if (temp && temp[0]) {
    //   if (temp[0].code === 401) {
    //     const role = cookies("get", "info")?.role;
    //     switch (role) {
    //       case "student":
    //         await deleteCookie();
    //         localStorageHandle("set", "studentError", true);
    //         localStorageHandle("remove", "userKey");
    //         localStorageHandle("remove", "noPassword");
    //         sessionStorageHandle("remove", "gradeId");
    //         sessionStorageHandle("remove", "appid");
    //         router.push({
    //           name: "LogoutPage",
    //         });
    //         break;
    //       case "teacher":
    //         await deleteCookie();
    //         router.push({
    //           name: "Login",
    //         });
    //         break;
    //       case "admin":
    //         await deleteCookie();
    //         router.push({
    //           name: "CMSLogin",
    //         });
    //         break;
    //       default:
    //         router.push({
    //           name: "ErrorPage",
    //           query: { status: temp[0].code },
    //         });
    //         break;
    //     }
    //     return Promise.reject(response);
    //   }
    // }
    // return response;
  },
  (error) => {}
);

export const getData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const putData = async (url, data) => {
  try {
    const response = await axios.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
