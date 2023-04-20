export default [
  {
    path: "/",
    component: "@/layouts/index",
    routes: [
      { path: "/", component: "@/pages/index", title: "h5测试" },
      { path: "/child", component: "@/pages/child/index", title: "子页面" },
    ]
  },
];
