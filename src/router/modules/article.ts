export default {
  path: "/article",
  meta: {
    title: "文章列表",
    icon: "article"
  },
  children: [
    {
      path: "/article/list",
      name: "Article",
      component: () => import("@/views/article/index.vue"),
      meta: {
        title: "文章列表"
      }
    }
  ]
};
