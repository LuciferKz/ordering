import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";

import router from "./router";
import store from "./store";

import useComponents from "@/utils/components";

import "@/styles/index.scss"; // global css

const app = createApp(App);
// useComponents(app);
// .use(router).use(store)
app.use(ElementPlus).use(router).use(store).mount("#app");
