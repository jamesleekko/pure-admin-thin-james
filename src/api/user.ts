import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: number;
  };
};

/** mock登录 */
// export const getLogin = (data?: object) => {
//   return http.request<UserResult>("post", "/login", { data });
// };

/** 正式登录 */
export const getLogin = (data?: object) => {
  return http.request<any>("post", baseUrlApi("login"), { data });
};

// /** mock刷新token */
// export const refreshTokenApi = (data?: object) => {
//   return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
// };

/** 后端刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refreshToken"), {
    data
  });
};
