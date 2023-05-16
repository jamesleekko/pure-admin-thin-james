import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getArticleCategory = () => {
  return http.request<Result>("get", baseUrlApi("getArticleCategory"));
};

export const updateArticle = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateArticle"), { data });
};

export const getArticleList = (params?: object) => {
  return http.request<any>("post", baseUrlApi("articleList"), { params });
};

export const getArticleContent = (id: number) => {
  return http.request<any>("post", baseUrlApi("getArticleContent"), {
    params: { id }
  });
};

export const deleteArticle = (id: number) => {
  return http.request<any>("delete", baseUrlApi("deleteArticle"), {
    params: { id }
  });
};
