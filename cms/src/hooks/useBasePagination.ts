import { reactive } from "vue";
import { useRoute } from "vue-router";

const restorePagination: any = function () {
  const route = useRoute();
  const path = route.path;
  let cachedPagination: any = window.localStorage.getItem("cachedPagination");
  if (cachedPagination) {
    cachedPagination = JSON.parse(cachedPagination);
  } else {
    return false;
  }
  return cachedPagination[path];
};

const initCachedPagination = function () {
  let cachedPagination: any = window.localStorage.getItem("cachedPagination");
  if (cachedPagination) {
    cachedPagination = JSON.parse(cachedPagination);
  } else {
    window.localStorage.setItem("cachedPagination", "{}");
  }
};

const getCachedPagination = function () {
  return JSON.parse(window.localStorage.getItem("cachedPagination") || "{}");
};

const setCachedPagination = function (path: string, data: any) {
  const cachedPagination = getCachedPagination();
  cachedPagination[path] = data;
  window.localStorage.setItem(
    "cachedPagination",
    JSON.stringify(cachedPagination)
  );
};

const resetCachedPagination = function (path: string) {
  setCachedPagination(path, { offset: 0, limit: 10 });
};

initCachedPagination();

export function useBasePagination({
  currentPage = 1,
  props,
  events = {},
  pagination,
}: any) {
  const route = useRoute();
  const path = route.path;
  const restore = route.params.restore;
  pagination = reactive(Object.assign({ offset: 0, limit: 10 }, pagination));

  if (restore) {
    const rpn: any = restorePagination();
    if (rpn) {
      currentPage = rpn.offset / 10 + 1;
      pagination.offset = rpn.offset;
      pagination.limit = rpn.limit;
    }
  } else {
    resetCachedPagination(path);
  }

  const oriEvents = { ...events };
  events.currentChange = function (page: number) {
    pagination.offset = pagination.limit * (page - 1);
    // pagination.offset = page;
    setCachedPagination(path, {
      offset: pagination.offset,
      limit: pagination.limit,
    });
    oriEvents.currentChange && oriEvents.currentChange(page);
  };
  events.sizeChange = function (size: number) {
    // pagination.limit = size
    pagination.limit = size;
    setCachedPagination(path, {
      offset: pagination.offset,
      limit: size,
    });
    oriEvents.sizeChange && oriEvents.sizeChange(size);
  };
  return reactive({
    currentPage,
    props,
    events,
    pagination,
  });
}
