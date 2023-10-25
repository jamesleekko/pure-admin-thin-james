import { getConfig } from "@/config";
import { routerArrays } from "@/layout/types";
import router, { resetRouter } from "@/router";
import { useAppStoreHook } from "@/store/modules/app";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { removeToken } from "@/utils/auth";
import { storageLocal, storageSession, toggleClass } from "@pureadmin/utils";

export const baseUrlApi = (url: string) =>
  process.env.NODE_ENV === "development"
    ? `/api/${url}`
    : `http://localhost:3000/${url}`;

/** 清空缓存并返回登录页 */
export function reset() {
  removeToken();
  storageLocal().clear();
  storageSession().clear();
  const { Grey, Weak, MultiTagsCache, Layout } = getConfig();
  useAppStoreHook().setLayout(Layout);
  useMultiTagsStoreHook().multiTagsCacheChange(MultiTagsCache);
  toggleClass(Grey, "html-grey", document.querySelector("html"));
  toggleClass(Weak, "html-weakness", document.querySelector("html"));
  router.push("/login");
  useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
  resetRouter();
}
