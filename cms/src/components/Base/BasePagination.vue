<template>
  <section class="base-pagination">
    <el-pagination
      v-model:currentPage="page"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next"
      v-bind="pageProps"
      v-on="events"
    ></el-pagination>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['size-change', 'current-change'],

  setup(props) {
    const page = ref(props.currentPage)
    const pageProps = computed(() => ({
      pageSize: props.pagination.pageSize,
      currentPage: props.pagination.pageIndex,
      total: 0,
      ...props.props
    }))

    return {
      page,
      pageProps
    }
  }
})
</script>

<style lang="scss">
.base-pagination {
  text-align: right;
}
</style>
