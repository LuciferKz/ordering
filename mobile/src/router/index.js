import { createRouter, createWebHistory } from "vue-router";
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
    path: "/order",
    name: "Order",
    meta: {
      title: "我的订单"
    },
    component: () => import("@/views/Order.vue"),
  }
  // {
  //   path: "/404",
  //   meta: {
  //     title: "404",
  //   },
  //   component: () => import("@/views/404.vue"),
  // },
  // { path: "/:pathMatch(.*)", redirect: "/404" },
];

console.log(process.env.NODE_ENV)
const router = createRouter({
  linkActiveClass: "current-link",
  history: createWebHistory("/ordering/mobile/"),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
});

export default router;
