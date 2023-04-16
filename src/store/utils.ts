import { getArticleCategory } from "@/api/article";
import { useArticleStoreHook } from "./modules/article";
import { getImageTypes } from "@/api/image";
import { useImageStoreHook } from "./modules/image";

//准备好各项全局数据
function initGlobalData() {
  getArticleCategory().then(res => {
    if (res.success) {
      useArticleStoreHook().SET_CATEGORIES(res.data);
    }
  });
  getImageTypes().then(res => {
    if (res.success) {
      useImageStoreHook().SET_IMAGETYPES(res.data);
    }
  });
}

export { initGlobalData };
