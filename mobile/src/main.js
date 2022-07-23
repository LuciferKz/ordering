import { createApp } from "vue";
import "./style.css";
import "./style/index.scss";
import App from "./App.vue";
import router from "./router/index";
import ElementPlus from "element-plus";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus).use(router).mount("#app");
