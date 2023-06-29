export default {
  path: "/comment",
  name: "Comment",
  component: () => import("@/views/comments/list.vue"),
  meta: {
    title: "评论",
    icon: "gallery",
    rank: 2
  }
} as RouteConfigsTable;
