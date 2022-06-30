import { reactive } from 'vue'
import { IBaseTableParams } from '@/utils/interface'

export function useBaseTable({
  columns,
  data,
  props = {},
  events = {}
}: IBaseTableParams) {
  // 初始化坐标数据
  const baseTable: any = {}
  const baseTableColumns = columns
  const baseTableData = data
  const baseTableProps = props
  const baseTableEvents = events
  const baseTableCurrentRow = {}

  return reactive({
    table: baseTable,
    data: baseTableData,
    columns: baseTableColumns,
    props: baseTableProps,
    events: baseTableEvents,
    currentRow: baseTableCurrentRow
  })
}
