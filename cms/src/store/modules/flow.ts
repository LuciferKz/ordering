import clone from '@/utils/index'

const flow = {
  state: {
    // graph画布绘制服务
    graph: null,
    // 所有模块
    modules: null,
    // 当前节点类型
    moduleName: 'global',
    // 当前节点ID
    moduleId: 'global',
    // 节点配置
    moduleCfg: {
      type: 'config',
      data: {
        form: {},
        formItems: {},
        rules: {},
        urls: {},
        props: {}
      }
    },
    // global form
    globalForm: {
      spiderName: '',
      threatCount: '',
      cron: '',
      enabled: 0
    },
    // 当前选中节点
    currentNode: null,
    // 当前tab
    activeTab: 'attribute',
    // 侧边栏是否展开
    unfold: false
  },
  getters: {
    graphData(state: any) {
      const data = state.graph.getData()

      const d = [
        {
          id: '0',
          JsonProperty: {
            spiderName: state.globalForm.spiderName,
            threadCount: state.globalForm.threadCount,
            cron: state.globalForm.cron,
            enabled: state.globalForm.enabled
          }
        },
        { id: '1', parent: '0' }
      ]

      /**
       * {
       *   id: id,
       *   value: label,
       *   parent: '1'
       *   JsonProperty: props.model
       * }
       */

      const nodes = data.nodes.map((item: any) => {
        const props = item.props || {}
        const form = props.form || {}
        form.shape = props.key
        form.value = form.remark
        return {
          id: item.id,
          value: item.label,
          parent: '1',
          JsonProperty: form
        }
      })

      /**
       * {
       *   id: id,
       *   value: '',
       *   parent: '1',
       *   source: source,
       *   target: target,
       *   edge: '1',
       *   JsonProperty: {  }
       * }
       */

      const relations = data.edges.map((item: any) => {
        return {
          id: item.id,
          value: '',
          parent: '1',
          source: item.source,
          target: item.target,
          edge: '1',
          JsonProperty: {}
        }
      })

      return JSON.stringify(d.concat(nodes, relations))
    }
  },
  mutations: {
    setGraph(state: any, graph: any) {
      state.graph = graph
    },
    setModuleCfg(state: any, moduleCfg: any) {
      state.moduleCfg = moduleCfg
    },
    setActiveTab(state: any, name: string) {
      state.activeTab = name
    },
    setUnfold(state: any, unfold: any) {
      state.unfold = unfold
    },
    setModuleName(state: any, name: string) {
      state.moduleName = name
    },
    setModuleId(state: any, id: string) {
      state.moduleId = id
    },
    setCurrentNode(state: any, node: {}) {
      state.currentNode = node
    },
    setGlobalForm(state: any, form: {}) {
      state.globalForm = form
    },
    setModules(state: any, modules: any) {
      state.modules = modules
    }
  },
  actions: {
    changeModuleName({ state, commit }: any, moduleName: string) {
      commit('setModuleName', moduleName)

      // const component =
      const moduleCfg = state.modules[moduleName === 'global' ? 'global' : state.moduleName]
      if (!moduleCfg) return
      commit('setModuleCfg', moduleCfg.component ? moduleCfg : clone(moduleCfg))
    },
    changeModule({ commit }: any, moduleCfg: any) {
      commit('setModuleCfg', moduleCfg)
    },
    switchTab({ commit }: any, name: string) {
      commit('setActiveTab', name)
    },
    resetFlow({ commit }: any) {
      commit('setGraph', null)
      commit('setModuleCfg', {
        type: 'config',
        data: {
          form: {},
          formItems: {},
          rules: {},
          urls: {},
          props: {}
        }
      })
      commit('setActiveTab', 'attribute')
      commit('setUnfold', true)
      commit('setModuleName', 'global')
      commit('setModuleId', 'global')
      commit('setCurrentNode', null)
      commit('setGlobalForm', {
        spiderName: '',
        threatCount: '',
        cron: '',
        enabled: 0
      })
    }
  }
}

export default flow
