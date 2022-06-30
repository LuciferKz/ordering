<template>
  <el-form-item
    v-if="!props.hide"
    :prop="prop"
    v-bind="elItemProps"
    class="base-form-item"
  >
    <template
      v-if="label"
      #label
    >
      <slot
        name="label"
        :label="label"
      >
        <span class="base-form-item__label">
          {{ $t(label) }}
          <el-tooltip
            v-if="elProps.info"
            class="item"
            effect="dark"
            placement="bottom"
          >
            <template #content>
              <pre>{{ $t(elProps.info) }}</pre>
            </template>
            <i class="iconfont icon-bangzhu"></i>
          </el-tooltip>
        </span>
      </slot>
    </template>
    <template v-if="elItemProps.readonly">
      <slot
        name="readonly"
        :props="elItemProps"
      >{{ currentValue }}</slot>
    </template>
    <template v-else>
      <slot>
        <template v-if="render">
          <base-custom
            :scope="baseForm.model"
            :render="render"
          ></base-custom>
        </template>
        <template v-else>
          <el-cascader
            v-if="type === 'cascader'"
            v-model="currentValue"
            :placeholder="`${$t('请选择')}${$t(label)}`"
            v-bind="elProps"
            :options="elOptions"
            v-on="elEvents"
          ></el-cascader>
          <component
            :is="elType"
            v-else-if="elOptions"
            v-model="currentValue"
            :placeholder="$t(`请${type === 'select'?'选择':'输入'}`) + $t(label)"
            v-bind="elProps"
            :options="elOptions"
            v-on="elEvents"
          >
            <template v-if="type === 'select'">
              <el-option
                v-for="opt in elOptions"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              ></el-option>
            </template>
          </component>
          <component
            :is="elType"
            v-else
            v-model="currentValue"
            :placeholder="$t('请输入') + $t(label)"
            v-bind="elProps"
            v-on="elEvents"
          >
            <template
              v-if="elProps.renderPrepend"
              #prepend
            >{{ elProps.renderPrepend }}</template>
          </component>
        </template>
      </slot>
    </template>
    <template #error="error">
      <slot
        name="error"
        :error="error.error"
      >
        <span class="base-form-item__error">{{ error.error }}</span>
      </slot>
    </template>
  </el-form-item>
</template>

<script lang="ts">
import { ref, reactive, computed, defineComponent } from "vue";

import BaseInputNumber from "./components/InputNumber.vue";
import BaseRadioGroup from "./components/RadioGroup.vue";

// import { setReactiveArray } from 'utils'

const getType = function (type: string) {
  const components: any = {
    "tree-select": "tree-select",
    "multi-tree": "multi-tree",
    "icon-select": "icon-select",
    "radio-group": "base-radio-group",
  };

  return components[type] || `el-${type}`;
};

export default defineComponent({
  components: { BaseInputNumber, BaseRadioGroup },
  inject: ["baseForm"],
  props: {
    modelValue: {
      type: [String, Number, Array, Date],
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    labelWidth: {
      type: [String, Number],
      default: null,
    },
    type: {
      type: String,
      default: "input",
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
    render: {
      type: Function,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const elType = ref(getType(props.type));
    const elItemProps: any = reactive({
      label: props.label,
      readonly: props.readonly,
    });

    const elEvents = reactive(props.events || {});
    if (elType.value === "el-input") {
      const oriEvents = { ...props.events };
      elEvents.input = function (val: any) {
        currentValue.value = val.trim();
        oriEvents.input && oriEvents.input(val.trim());
      };
    }

    if (props.labelWidth) elItemProps.labelWidth = props.labelWidth;
    const elProps = reactive(props.props || {});

    elProps.clearable = true;
    const currentValue = computed({
      get() {
        return props.modelValue;
      },
      set(val: any) {
        emit("update:modelValue", val);
      },
    });

    const map = elProps.map || {};
    const labelKey = computed(() => map.label || "text");
    const valueKey = computed(() => map.value || "value");

    const elOptions = computed(() => {
      if (!elProps.options) return null;

      if (elType.value !== "el-select" && elType.value !== "el-select-v2") {
        return elProps.options;
      }

      return elProps.options.map((opt: any) => ({
        label: opt[labelKey.value],
        value: opt[valueKey.value],
      }));
    });
    return {
      currentValue,
      elType,
      elProps,
      elItemProps,
      elOptions,
      elEvents,
    };
  },
});
</script>

<style lang="scss"></style>
