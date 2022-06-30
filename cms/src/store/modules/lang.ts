const state = () => ({
  lang: 'zh_CN'
})
const mutations = {
  changeLang(state: any, lang: string) {
    state.lang = lang
  }
}

const actions = {
  changeLang({ commit }: any, lang: string) {
    commit('changeLang', lang)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
