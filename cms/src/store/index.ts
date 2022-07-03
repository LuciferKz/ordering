import { createStore } from "vuex";
import menu from "./modules/menu";
import themes from "./modules/themes";
// import loading from "./modules/loading";
import user from "./modules/user";
import customer from "./modules/customer";

export default createStore({
  modules: {
    menu,
    themes,
    // loading,
    user,
    customer,
  },
}) as any;
