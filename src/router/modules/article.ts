export default {
  path: "/article",
  redirect: "/article/list",
  meta: {
    title: "文章",
    icon: "article",
    rank: 1
  },
  children: [
    {
      path: "/article/list",
      name: "ArticleList",
      component: () => import("@/views/article/list.vue"),
      meta: {
        title: "文章列表"
      }
    },
    {
      path: "/article/new",
      name: "ArticleNew",
      component: () => import("@/views/article/edit.vue"),
      meta: {
        title: "新建文章"
      }
    },
    {
      path: "/article/edit",
      name: "ArticleEdit",
      component: () => import("@/views/article/edit.vue"),
      meta: {
        title: "编辑文章",
        showLink: false
      }
    }
  ]
} as RouteConfigsTable;
