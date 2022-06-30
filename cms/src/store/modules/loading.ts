import { ElLoading } from 'element-plus'

const state = {
  instance: [],
  duration: 2000,
  timeout: null,
  count: 0,
  autoLoading: true,
  loading: {}
}

const mutations = {
  addInstance(state: any, instance: any) {
    state.instance.push(instance)
  },
  clearInstance(state: any) {
    state.instance = []
  },
  changeInstance(state: any, instance: any) {
    state.instance = instance
  },
  changeTimeout(state: any, timeout: any) {
    state.timeout = timeout
  },
  changeAutoLoading(state: any, autoLoading: boolean) {
    state.autoLoading = autoLoading
  }
}

const actions = {
  openLoading({ state, commit }: any, payload: any) {
    if (!payload || payload.type === 'system') {
      state.count++
      if (state.instance.length < 1) {
        commit('addInstance', ElLoading.service())
      }
      if (state.timeout) clearTimeout(state.timeout)
      commit(
        'changeTimeout',
        setTimeout(() => {
          state.instance.forEach((instance: any) => {
            instance.close()
          })
          commit('clearInstance')
          commit('changeTimeout', null)
        }, 30000)
      )
    } else {
      if (!state.loading[payload.type]) {
        state.loading[payload.type] = 1
      } else {
        state.loading[payload.type]++
      }
    }
  },

  closeLoading({ state, commit }: any) {
    state.count--
    if (state.count === 0) {
      state.instance.forEach((instance: any) => {
        instance.close()
      })
      commit('clearInstance')
      commit('changeTimeout', null)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
