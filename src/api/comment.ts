import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export const getCommentList = (params?: object) => {
  return http.request<any>("get", baseUrlApi("getCommentList"), { params });
};

export const deleteComment = (idList: number[]) => {
  return http.request<any>("delete", baseUrlApi("deleteComment"), {
    params: { idList }
  });
};
