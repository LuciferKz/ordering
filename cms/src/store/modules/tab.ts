import { IRoute } from '@/utils/interface'

const includes: any = {}

const state = () => ({
  tabs: [],
  currentTab: null,
  includes: [],
  excludes: []
})
const mutations = {
  changeTabs(state: any, tabs: IRoute[]) {
    state.tabs = tabs
  },
  changeIncludes(state: any, includes: []) {
    state.includes = includes
  },
  changeCurrentTab(state: any, tab: IRoute) {
    state.currentTab = tab
  }
}

const getters = {}

const actions = {
  changeTabs({ commit }: any, tabs: []) {
    commit('changeTabs', tabs)
  },
  changeCurrentTab({ commit }: any, tab: IRoute) {
    commit('changeCurrentTab', tab)
  },
  deleteTab({ state, commit }: any, index: number) {
    const delTab = state.tabs.splice(index, 1)[0]
    delete includes[delTab.path]
    commit('changeIncludes', Object.values(includes))
  },
  setInclude({ commit }: any, payload: any) {
    if (includes[payload.key]) return
    includes[payload.key] = payload.value
    commit('changeIncludes', Object.values(includes))
  },
  delInclude({ commit }: any, payload: any) {
    delete includes[payload.key]
    commit('changeIncludes', Object.values(includes))
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
