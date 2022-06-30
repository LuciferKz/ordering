import { reactive } from 'vue'
import { useRoute } from 'vue-router'

const restorePagination: any = function () {
  const route = useRoute()
  const path = route.path
  let cachedPagination: any = window.localStorage.getItem('cachedPagination')
  if (cachedPagination) {
    cachedPagination = JSON.parse(cachedPagination)
  } else {
    return false
  }
  return cachedPagination[path]
}

const initCachedPagination = function () {
  let cachedPagination: any = window.localStorage.getItem('cachedPagination')
  if (cachedPagination) {
    cachedPagination = JSON.parse(cachedPagination)
  } else {
    window.localStorage.setItem('cachedPagination', '{}')
  }
}

const getCachedPagination = function () {
  return JSON.parse(window.localStorage.getItem('cachedPagination') || '{}')
}

const setCachedPagination = function (path: string, data: any) {
  const cachedPagination = getCachedPagination()
  cachedPagination[path] = data
  window.localStorage.setItem('cachedPagination', JSON.stringify(cachedPagination))
}

const resetCachedPagination = function (path: string) {
  setCachedPagination(path, { pageIndex: 1, pageSize: 10 })
}

initCachedPagination()

export function useBasePagination({ currentPage = 1, props, events = {}, pagination }: any) {
  const route = useRoute()
  const path = route.path
  const restore = route.params.restore
  pagination = reactive(Object.assign({ pageIndex: 1, pageSize: 10 }, pagination))

  if (restore) {
    const rpn: any = restorePagination()
    if (rpn) {
      currentPage = rpn.pageIndex
      pagination.pageIndex = rpn.pageIndex
      pagination.pageSize = rpn.pageSize
    }
  } else {
    resetCachedPagination(path)
  }

  const oriEvents = { ...events }
  events.currentChange = function (page: number) {
    // pagination.offset = pagination.limit * (page - 1)
    pagination.pageIndex = page
    setCachedPagination(path, {
      pageIndex: page,
      pageSize: pagination.pageSize
    })
    oriEvents.currentChange && oriEvents.currentChange(page)
  }
  events.sizeChange = function (size: number) {
    // pagination.limit = size
    pagination.pageSize = size
    setCachedPagination(path, {
      pageIndex: pagination.pageIndex,
      pageSize: size
    })
    oriEvents.sizeChange && oriEvents.sizeChange(size)
  }
  return reactive({
    currentPage,
    props,
    events,
    pagination
  })
}
