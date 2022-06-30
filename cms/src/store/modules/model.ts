const state = () => ({
  tenantItem: {},
  tenantDictItem: {},
  tenantEventItem: {}
})

const mutations = {
  REMOVE_ITEM(state: any) {
    state.tenantItem = {}
  },

  SET_ITEM(state: any, data: any) {
    state.tenantItem = data
  },

  REMOVE_DICT_ITEM(state: any) {
    state.tenantDictItem = {}
  },

  SET_DICT_ITEM(state: any, data: any) {
    state.tenantDictItem = data
  },

  REMOVE_EVENT_ITEM(state: any) {
    state.tenantEventItem = {}
  },

  SET_EVENT_ITEM(state: any, data: any) {
    state.tenantEventItem = data
  }
}

const actions = {
  removeTenantItem({ commit }: any) {
    commit('REMOVE_ITEM')
  },
  setTenantItem({ commit }: any, data: any) {
    commit('SET_ITEM', data)
  },
  removeTenantDictItem({ commit }: any) {
    commit('REMOVE_DICT_ITEM')
  },
  setTenantDictItem({ commit }: any, data: any) {
    commit('SET_DICT_ITEM', data)
  },
  removeTenantEventItem({ commit }: any) {
    commit('REMOVE_EVENT_ITEM')
  },
  setTenantEventItem({ commit }: any, data: any) {
    commit('SET_EVENT_ITEM', data)
  }
}

export default {
  state,
  mutations,
  actions
}
