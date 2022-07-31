import { createStore } from "vuex";
import user from "./modules/user";
import shoppingCart from "./modules/shoppingCart";

export default createStore({
  modules: {
    user,
    shoppingCart
  },
})