import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
    children: [
      {
        path: "",
        name: "Index",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/index/index.vue")
      },
      {
        path: "/qa",
        name: "qa",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/qa/index.vue")
      },
      {
        path: "/video",
        name: "video",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/video/index.vue")
      },
      {
        path: "/my",
        name: "my",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/my/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/index.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
