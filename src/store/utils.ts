import { getArticleCategory } from "@/api/article";

//准备好各项全局数据
function initGlobalData() {
  getArticleCategory().then(res => {
    console.log(res);
    // if (res.success) {
    //   useArticleStoreHook().SET_ARTICLE_CATEGORY(res.data);
    // }
  });
}

export { initGlobalData };
