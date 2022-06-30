import $cookie from '@/utils/cookie'

const state = () => ({
  info: $cookie.get('info') || { userName: 'User Name' },
  token: $cookie.get('token'),
  permissions: {}
})

const mutations = {
  changeUser(state: any, info: any) {
    state.info = info
  },

  changeToken(state: any, token: any) {
    state.token = token
  },

  changePermissions(state: any, permissions: any) {
    Object.assign(state.permissions, permissions)
  }
}

const getters = {}

const actions = {
  async login({ commit }: any, data: any) {
    const token = data.accessToken
    commit('changeToken', token)
    $cookie.set('token', token)
    $cookie.set('tenantId', data.userInfo.tenantId)
  },

  logout({ commit }: any) {
    commit('changeUser', { userName: 'User Name' })
    commit('changeToken', null)
    $cookie.del('token')
    $cookie.del('tenantId')
  },

  changeUser({ commit }: any, info: any) {
    commit('changeUser', info)
  },

  updatePermissions({ commit }: any, permissions: any) {
    commit('changePermissions', permissions)
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
