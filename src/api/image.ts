import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import { AxiosRequestConfig } from "axios";

const formDataConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "multipart/form-data",
    "X-Requested-With": "XMLHttpRequest"
  }
};

export const getImageTypes = () => {
  return http.request<any>("get", baseUrlApi("getImageTypes"));
};

export const uploadFile = (files: object | Blob[], type?: string) => {
  //参数以formdata形式传递
  const formData = new FormData();
  formData.append("file_type", type + "");
  formData.append("file", files[0]);

  return http.request<any>(
    "post",
    baseUrlApi("upload"),
    {
      data: formData
    },
    formDataConfig
  );
};

export const updateImg = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateImg"), { data });
};

export const getImageList = (params?: object) => {
  return http.request<any>("post", baseUrlApi("imageList"), { params });
};

export const deleteImage = (idList: number[]) => {
  return http.request<any>("delete", baseUrlApi("deleteImage"), {
    params: { idList }
  });
};
