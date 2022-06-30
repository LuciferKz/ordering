<template>
  <section class="base-dialog">
    <el-dialog
      v-model="isShowDialog"
      v-bind="dialogProps"
      @closed="handleDialogClosed"
    >
      <template #title>
        <section class="base-dialog__header">
          {{ dialogProps.title ? $t(dialogProps.title) : '' }}
          <i
            class="iconfont icon-close base-dialog__close"
            @click="handleDialogClose"
          ></i>
        </section>
      </template>
      <slot>
        <template v-if="rendered">
          <el-scrollbar :max-height="body.props?.height || '400px'">
            <div style="padding: 0 20px;">
              <component
                :is="body.component"
                v-if="body.component"
                :ref="getRefFn('body')"
                v-bind="dialogBodyProps"
              />
              <base-form
                v-else-if="dialogBody"
                :ref="getRefFn('form')"
                v-bind="dialogBody"
              ></base-form>
            </div>
          </el-scrollbar>
        </template>
      </slot>
      <slot name="footer">
        <section class="base-dialog__footer">
          <component
            :is="footer.component"
            v-if="footer.component"
            v-bind="footer.props"
            :ref="getRefFn('footer')"
          />
          <base-buttons
            v-else
            v-bind="baseButtons"
          ></base-buttons>
        </section>
      </slot>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent, onMounted } from 'vue'
import { useBaseButtons, useBaseForm } from '@/hooks'
import { clone, deepMix } from '@/utils'

export default defineComponent({
  props: {
    name: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    body: {
      type: Object,
      default: () => ({})
    },
    footer: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const destroyOnClose = true
    const rendered = ref(false)
    const dialogProps = reactive(props.props)
    const isCustomBody = computed(() => !!props.body.component)

    // 显示隐藏 默认隐藏
    const isShowDialog = ref(props.modelValue || false)

    // 处理关闭事件
    const handleDialogClose = function () {
      isShowDialog.value = false
    }
    const handleDialogClosed = function () {
      if (destroyOnClose) {
        rendered.value = false
      }
    }

    const dialogBodyProps: any = ref(null)
    const dialogBody: any = ref({})
    // 处理dialog body
    const initDialogBody = function () {
      const body = props.body
      if (isCustomBody.value) {
        dialogBodyProps.value = body.props || {}
      } else {
        dialogBody.value = body || {}
      }
    }

    // 处理dialog footer

    const defaultBaseButtons = {
      buttons: ['cancel', 'confirm'],
      events: {
        cancel() {
          isShowDialog.value = false
        }
      }
    }

    const baseButtons = computed(() => useBaseButtons(Object.assign(defaultBaseButtons, props.footer)))

    // 外部使用的方法
    // 可以传入一些配置
    const open = function ({
      name = '',
      props = {},
      body = {
        component: null,
        props: {}
      },
      footer = {}
    } = {}) {
      initDialogBody()
      deepMix(dialogProps, props)
      if (dialogBodyProps.value) {
        dialogBodyProps.value = deepMix(clone(dialogBodyProps.value), body.props)
      } else if (dialogBody.value) {
        dialogBody.value = useBaseForm(deepMix(clone(dialogBody.value), body))
      }

      isShowDialog.value = true
      rendered.value = true
    }

    const close = function () {
      handleDialogClose()
    }

    // 获取内置form的数据
    const getData = function () {
      return new Promise(resolve => {
        if (isCustomBody.value) {
          refs.body.getData((result: any) => {
            resolve(result)
          })
        } else {
          refs.form.getData((result: any) => {
            resolve(result)
          })
        }
      })
    }

    // refs
    const refs: any = reactive({})

    const getRefFn = function (ref: string) {
      return function (el: any) {
        refs[ref] = el
      }
    }

    onMounted(() => {
      // dialog默认配置
      dialogProps.showClose = false
      dialogProps.width = dialogProps.width || 500
      initDialogBody()
    })

    return {
      isShowDialog,
      dialogProps, // dialog属性
      // dialogBodyComponent,
      dialogBodyProps,
      dialogBody,
      baseButtons,

      rendered,

      // 内部方法
      handleDialogClose,
      handleDialogClosed,

      // 外部使用方法
      open,
      close,
      getData,

      refs,
      getRefFn
    }
  }
})
</script>

<style lang="scss">
</style>
