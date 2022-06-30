import { reactive, computed, watch } from 'vue'
// import { useI18n } from 'vue-i18n'
import { ISimpleButton, IBaseButtonsParams } from '@/utils/interface'
// import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { queryButtons } from '@/api/auth/menu'
import baseButtonMaps from '@/utils/buttonMaps'

const baseButtonTemplates: ISimpleButton[] = [
  {
    key: 'add',
    label: '创建'
    // props: {
    //   icon: 'el-icon-plus'
    // }
  },
  { key: 'edit', label: '编辑' },
  {
    key: 'delete',
    label: '删除',
    props: {
      type: 'danger'
    }
  },
  { key: 'copy', label: '复制' },
  { key: 'export', label: '导出' },
  { key: 'import', label: '导入' },
  { key: 'cancel', label: '取消' },
  {
    key: 'confirm',
    label: '确定',
    props: {
      type: 'primary'
    }
  },
  { key: 'detail', label: '详情' },
  {
    key: 'save',
    label: '保存',
    props: {
      type: 'primary'
    }
  },
  { label: '查看', key: 'view' },
  { label: '同步', key: 'sync' },
  { label: '返回', key: 'back' }
]

// useBaseButtons(['add', 'edit', 'delete'])
// useBaseButtons(['add', { label: '导入人群' }])

// 根据key从utils里的按钮hash表中匹配对应按钮类型
const getButton = function (key: string | ISimpleButton, menu: any, cb: Function) {
  let btn: any = {}
  if (typeof key === 'string') {
    btn = baseButtonTemplates.find(btn => btn.key === key) || {}
  } else if (typeof key === 'object') {
    btn = key
  }
  btn.code = `${menu.code || ''}/${menu.seqNum}/${btn.key}`

  cb && cb(btn)
  return btn
}

// 获取按钮
const getButtons = function (buttons: any[], menu: any, cb: Function): any[] {
  return (buttons as ISimpleButton[]).map(function (key) {
    if (typeof key === 'object' && key instanceof Array) {
      return getButtons(key, menu, cb)
    } else {
      return getButton(key, menu, cb)
    }
  })
}

// 获取当前菜单下的按钮权限
const getButtonList = async function (menu: any, permissions: any) {
  if (menu && menu.code) {
    if (!menu.permissions) {
      const res: any = await queryButtons({
        menuCode: menu.code
      })
      if (res.success) {
        menu.permissions = 1
        res.data.map((btn: any) => {
          if (btn.code && baseButtonMaps[btn.code]) {
            permissions[`${menu.code || ''}/${menu.seqNum}/${baseButtonMaps[btn.code]}`] = 1
          }
        })
      }
    }
  }
  return permissions
}

export function useBaseButtons({ events = {}, props = {}, buttons }: IBaseButtonsParams, needAuth = false) {
  // 初始化坐标数据
  const baseButtons: any = reactive({ data: [], map: {}, props, events })
  const store = useStore()
  const menuItem: any = computed(() => store.getters.menuItem)
  const menuTreeMap: any = computed(() => store.state.menu.menuTreeMap)
  const permissions: any = computed(() => store.state.user.permissions)
  // const instance: any = getCurrentInstance()
  // const { t } = useI18n()

  const addMap = function (btn: any) {
    baseButtons.map[btn.key] = btn
  }

  function getBaseButtonsData(menu: any) {
    const currentMenu = menuTreeMap.value[menu.value.path]

    baseButtons.data = getButtons(buttons, currentMenu, function (btn: ISimpleButton) {
      addMap(btn)
      // btn.label = t(btn.label)
    })

    if (needAuth) {
      getButtonList(currentMenu, permissions.value)
    } else {
      baseButtons.data.forEach((btn: ISimpleButton) => {
        if (typeof btn === 'object' && btn instanceof Array) {
          btn.forEach((b: ISimpleButton) => {
            if (b.code) {
              permissions.value[b.code] = 1
            }
          })
        } else if (btn.code) {
          permissions.value[btn.code] = 1
        }
      })
    }
    // .then(permissions => {
    //   store.dispatch('updatePermissions', permissions)
    // })
  }

  if (menuTreeMap.value && menuItem.value) {
    getBaseButtonsData(menuItem)
  } else {
    watch(menuItem, getBaseButtonsData)
  }

  return baseButtons
}
