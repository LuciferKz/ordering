import { reactive, computed } from 'vue'
import { IModuleFormParams } from '@/utils/interface'

export function useModuleForm({ title, form = {}, formItems, props, rules, component }: IModuleFormParams) {
  const filterdItems = computed(() => {
    if (!formItems || !formItems.list) return []
    return formItems.list.filter((item: any) => {
      const hidden = typeof item.hidden === 'string' ? new Function(item.hidden).bind(this) : item.hidden
      return !hidden
    })
  })

  props.labelPosition = 'top'

  return reactive({
    title,
    form,
    formItems: filterdItems.value,
    props,
    rules,
    component
  })
}
