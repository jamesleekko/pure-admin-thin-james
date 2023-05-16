import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export const getImageTypes = () => {
  return http.request<any>("get", baseUrlApi("getImageTypes"));
};

export const updateImg = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateImg"), { data });
};

export const getImageList = (params?: object) => {
  return http.request<any>("post", baseUrlApi("imageList"), { params });
};

export const deleteImage = (id: number) => {
  return http.request<any>("delete", baseUrlApi("deleteImage"), {
    params: { id }
  });
};
