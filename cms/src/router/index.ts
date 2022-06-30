import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import { ElMessage } from "element-plus";
import $cookie from "@/utils/cookie";

const SISTEM_TYPE: any = import.meta.env.VITE_APP_SISTEM_TYPE;

const routes: any = [
  {
    path: "/",
    redirect: "/store",
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/",
    name: "",
    component: Layout,
    meta: {
      title: "基础布局",
    },
    children: [
      {
        path: "/store",
        name: "Store",
        meta: {
          title: "门店管理",
        },
        component: () => import("@/views/store/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    meta: {
      title: "404",
    },
    component: () => import("@/views/404.vue"),
  },
  { path: "/:pathMatch(.*)", redirect: "/404" },
];

const router = createRouter({
  linkActiveClass: "current-link",
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !$cookie.get("token")) {
    ElMessage.warning("请登录后在进行访问");
    next("/login");
  }
  document.title = `${to.meta.title}`;
  next();
});

export default router;
