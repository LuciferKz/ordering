import { IBaseTreeParams } from '@/utils/interface'

export function useBaseTree({ data, props, events }: IBaseTreeParams) {
  return {
    data,
    props,
    events
  }
}
