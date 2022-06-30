<template>
  <section class="base-form">
    <el-form
      ref="refForm"
      :model="form"
      :label-width="props.labelWidth || 120"
      :label-position="props.labelPosition || 'right'"
      :inline="props.inline || false"
      :rules="rules"
      :disabled="props.disabled || false"
      @submit.prevent
    >
      <slot>
        <el-row :gutter="props.gutter || 20">
          <el-col
            v-for="item in formItems"
            :key="item.prop"
            :span="props.span || item.span || 24"
          >
            <base-form-item
              v-model="model[item.prop]"
              v-bind="item"
            ></base-form-item>
          </el-col>
        </el-row>
      </slot>
    </el-form>
  </section>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseForm',
  provide() {
    return {
      baseForm: this
    }
  },
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    formItems: {
      type: Array,
      default: () => []
    },

    rules: {
      type: Object,
      default: () => ({})
    },

    props: {
      type: Object,
      default: () => ({})
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const model = reactive(props.form)
    const refForm: any = ref(null)

    const validate = function (cb: Function) {
      refForm.value.validate(cb)
    }

    const getData = function (cb: Function) {
      return new Promise(resolve => {
        refForm.value.validate((valid: any, err: any) => {
          valid ? cb(model) : cb(false, err)
          valid ? resolve(model) : resolve(false)
        })
      })
    }

    return {
      model,
      refForm,
      getData,
      validate
    }
  }
})
</script>

<style lang="scss" scope>
.base-form {
  width: 100%;
  .el-row {
    width: 100%;
  }
}
</style>
