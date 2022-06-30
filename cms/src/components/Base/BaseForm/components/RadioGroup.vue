<template>
  <!-- v-if="type === 'radioGroup'" -->
  <el-radio-group
    v-model="currentValue"
    v-bind="elProps"
    v-on="elEvents"
  >
    <el-radio
      v-for="opt in elProps.options"
      :key="opt.value"
      :label="opt.value"
    >{{ opt.label }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
export default {
  emits: ['change'],
  setup(props, { emit }) {
    const instance: any = getCurrentInstance()

    const elProps: any = reactive(Object.assign({}, instance.attrs))
    const elEvents: any = {
      change() {
        emit('change', currentValue.value)
      }
    }
    const currentValue: any = ref(null)

    return {
      currentValue,
      elProps,
      elEvents
    }
  }
}
</script>

<style>
</style>
