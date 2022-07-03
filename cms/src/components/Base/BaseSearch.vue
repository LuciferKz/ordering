<template>
  <section class="base-search">
    <section class="base-search__form">
      <slot name="form">
        <el-scrollbar>
          <base-form
            ref="refSearchForm"
            v-bind="baseForm"
          ></base-form>
        </el-scrollbar>
      </slot>
    </section>
    <section class="base-search__buttons">
      <el-row>
        <el-col>
          <el-button
            type="primary"
            @click="handleSearch"
          >{{ "搜索" }}</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="handleReset">{{ "清除" }}</el-button>
        </el-col>
      </el-row>
    </section>
  </section>
</template>

<script lang="ts">
import BaseForm from "./BaseForm/index.vue";
import { ref, reactive, defineComponent } from "vue";
import { throttle } from "@/utils";

export default defineComponent({
  components: { BaseForm },
  props: {
    baseForm: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: ["search", "reset"],

  setup(props, { emit }) {
    const searchForm: any = reactive(props.baseForm.form);

    const handleSearch = throttle(function () {
      if (props.events.search) {
        props.events.search.call(null, searchForm);
      } else {
        emit("search", searchForm);
      }
    }, 1000);

    const refSearchForm: any = ref(null);
    const handleReset = throttle(function () {
      refSearchForm?.value?.refForm?.resetFields();

      if (props.events.search) {
        emit("reset");
        props.events.search.call(null, searchForm);
      } else {
        emit("search", searchForm);
      }
      emit("reset");
    }, 1000);

    return {
      searchForm,
      refSearchForm,
      handleSearch,
      handleReset,
    };
  },
});
</script>

<style lang="scss">
</style>
