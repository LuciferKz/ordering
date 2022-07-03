import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "@/layout/templates/template.scss";

import router from "./router";
import store from "./store";

import useComponents from "@/utils/components";

import "@/styles/element/index.scss";
// import "@/layout/templates/template.scss";
import "@/styles/index.scss"; // global css

const app = createApp(App);

useComponents(app);
// .use(router).use(store)
app
  .use(ElementPlus, {
    locale: zhCn,
  })
  .use(router)
  .use(store)
  .mount("#app");
