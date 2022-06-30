import { useBaseForm } from './useBaseForm'
import { reactive } from 'vue'
import { IBaseSearchParams } from '@/utils/interface'

export function useBaseSearch({ form, formItems, props, rules, events }: IBaseSearchParams) {
  const oriEvents = { ...events }

  const baseForm = useBaseForm({
    form: form,
    formItems: formItems,
    props: Object.assign(
      {
        span: 8,
        labelPosition: 'right'
      },
      props
    ),
    rules
  })

  const baseSearch = reactive({
    baseForm,
    events,
    filter: { ...baseForm.form }
  })

  events.search = function (filter: any) {
    baseSearch.filter = { ...filter }
    oriEvents.search && oriEvents.search(filter)
  }
  return baseSearch
}
