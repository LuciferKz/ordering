import { createRouter, createWebHashHistory } from "vue-router";
import $cookie from "@/utils/cookie";

const routes = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {
      title: "授权",
    },
    component: () => import("@/views/Auth.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    meta: {
      title: "菜单",
    },
    component: () => import("@/views/Menu.vue"),
  },
  {
    path: "/member",
    name: "Member",
    meta: {
      title: "会员中心",
    },
    component: () => import("@/views/Member.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {
      title: "",
    },
    component: () => import("@/views/Auth.vue"),
  },
  // {
  //   path: "/404",
  //   meta: {
  //     title: "404",
  //   },
  //   component: () => import("@/views/404.vue"),
  // },
  // { path: "/:pathMatch(.*)", redirect: "/404" },
];

const router = createRouter({
  linkActiveClass: "current-link",
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  // if (to.name !== "Auth" && !$cookie.get("token")) {
  //   // ElMessage.warning("请登录后在进行访问");
  //   // next("/login");
  // } else {
  // }
  next();
});

export default router;
