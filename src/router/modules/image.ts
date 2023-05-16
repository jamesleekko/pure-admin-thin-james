export default {
  path: "/image",
  redirect: "/image/list",
  meta: {
    title: "图片",
    icon: "gallery",
    rank: 1
  },
  children: [
    {
      path: "/image/list",
      name: "ImageList",
      component: () => import("@/views/images/list.vue"),
      meta: {
        title: "图片列表"
      }
    },
    {
      path: "/image/edit",
      name: "ImageEdit",
      component: () => import("@/views/images/edit.vue"),
      meta: {
        title: "编辑图片"
      }
    }
  ]
} as RouteConfigsTable;
