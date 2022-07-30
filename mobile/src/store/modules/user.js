import $cookie from "@/utils/cookie";

const state = () => ({
  info: $cookie.get("info") || { userName: "User Name" },
  token: $cookie.get("token"),
});

const mutations = {
  changeUser(state, info) {
    state.info = info;
  },

  changeToken(state, token) {
    state.token = token;
  },
};

const getters = {};

const actions = {
  async login({ commit }, data) {
    const token = data.token;
    commit("changeToken", token);
    $cookie.set("token", token);
  },

  logout({ commit }) {
    commit("changeUser", { userName: "User Name" });
    commit("changeToken", null);
    $cookie.del("token");
  },

  changeUser({ commit }, info) {
    commit("changeUser", info);
  },
};

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions,
};
