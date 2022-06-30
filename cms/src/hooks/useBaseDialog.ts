import { reactive } from 'vue'
import { IBaseDialogParams } from '@/utils/interface'

export function useBaseDialog({ name, body = {}, footer = {}, props }: IBaseDialogParams) {
  const dialog: any = {}

  return {
    name,
    dialog,
    body,
    footer,
    props: reactive(props)
  }
}
