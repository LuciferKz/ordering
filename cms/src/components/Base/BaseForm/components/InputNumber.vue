<template>
  <section>
    <slot name="prepend"></slot>
    <slot name="prefix"></slot>
    <el-input-number :controls="controls"></el-input-number>
    <slot name="suffix"></slot>
    <slot name="append"></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    controls: {
      default: false,
      type: Boolean
    }
  },

  setup() {}
})
</script>

<style lang="scss">
</style>
