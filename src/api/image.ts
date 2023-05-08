import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getImageTypes = () => {
  return http.request<Result>("get", baseUrlApi("getImageTypes"));
};

export const updateImg = (data?: object) => {
  return http.request<Result>("post", baseUrlApi("updateImg"), { data });
};

export const getImageList = (params?: object) => {
  return http.request<Result>("post", baseUrlApi("imageList"), { params });
};

export const deleteImage = (id: number) => {
  return http.request<Result>("delete", baseUrlApi("deleteImage"), {
    params: { id }
  });
};
