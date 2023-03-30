import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getArticleCategory = () => {
  return http.request<Result>("get", baseUrlApi("getArticleCategory"));
};
