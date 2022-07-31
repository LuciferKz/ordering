import $cookie from "@/utils/cookie";

const state = () => ({
  cart: $cookie.get("cart") || {},
});

const mutations = {
  changeCart(state, cart) {
    state.cart = cart;
  },
};

const getters = {};

const actions = {
  changeCart({ commit }, cart) {
    commit("changeCart", cart);
  },
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
};
