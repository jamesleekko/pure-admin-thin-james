import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type Result = {
  success: boolean;
  data: Array<any>;
};

export const getImageTypes = () => {
  return http.request<Result>("get", baseUrlApi("getImageTypes"));
};
