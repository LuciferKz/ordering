<template>
  <section class="base-tree">
    <el-tree ref="refTree" node-key="id" v-bind="props" :data="dataSource" v-on="events" />
  </section>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dataSource = ref(props.data)
    const refTree = ref(null)
    return {
      dataSource,
      refTree
    }
  }
})
</script>

<style lang="scss"></style>
