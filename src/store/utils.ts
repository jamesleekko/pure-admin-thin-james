import { getArticleCategory } from "@/api/article";
import { useArticleStoreHook } from "./modules/article";

//准备好各项全局数据
function initGlobalData() {
  getArticleCategory().then(res => {
    if (res.success) {
      useArticleStoreHook().SET_CATEGORIES(res.data);
    }
  });
}

export { initGlobalData };
