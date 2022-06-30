const state = () => ({
  menuTree: [],
  menuTreeMap: null,
  currentPath: '',
  buttons: {}
})

const mutations = {
  changeMenuTree(state: any, menuTree: []) {
    state.menuTree = menuTree
  },
  changeMenuTreeMap(state: any, menuTreeMap: {}) {
    state.menuTreeMap = menuTreeMap
  },
  changeCurrentPath(state: any, path: string) {
    state.currentPath = path
  }
}

// 菜单数据重要字段映射
const fieldMap: any = {
  seqNum: 'seqNum',
  name: 'name',
  path: 'href',
  children: 'subMenuList',
  icon: 'icon',
  code: 'code',
  type: 'type'
}

const rebuildData = function (data: any, map: any) {
  const newData: any = {}

  for (const key in fieldMap) {
    // if (key === 'code')
    newData[key] = data[fieldMap[key]]
  }

  if (newData.children) {
    newData.children = newData.children.map((item: any) => {
      const d = rebuildData(item, map)
      map[d.path] = d
      return d
    })
  }

  newData.collapse = false

  return newData
}

const getters = {
  menuTree(state: any) {
    return state.menuTree
  },
  menuItem(state: any) {
    let menuItem = null
    const currentPath = `${state.currentPath}/`
    Object.keys(state.menuTreeMap).find(path => {
      if (~currentPath.indexOf(`${path}/`)) {
        menuItem = state.menuTreeMap[path]
        return true
      }
      return false
    })
    return menuItem
  }
}

const actions = {
  changeMenuTree({ state, commit }: any, menuTree: []) {
    const menuTreeMap: any = {}
    const menuTreeList = menuTree.map((item: any) => {
      const d = rebuildData(item, menuTreeMap)
      menuTreeMap[d.path] = d
      return d
    })

    commit('changeMenuTree', menuTreeList)
    commit('changeMenuTreeMap', menuTreeMap)
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
