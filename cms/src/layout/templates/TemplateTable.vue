<template>
  <el-scrollbar style="width: 100%">
    <section class="zz-template zz-template--list">
      <section
        v-if="baseSearch"
        class="zz-template--list__header"
      >
        <slot name="baseSearch">
          <base-search
            v-bind="baseSearch"
            @reset="handleReset"
          ></base-search>
        </slot>
      </section>
      <section
        v-if="baseButtons || baseTable"
        class="zz-template--list__body"
      >
        <section class="zz-template--list__buttons">
          <slot name="baseButtons">
            <base-buttons
              v-if="baseButtons"
              v-bind="baseButtons"
            ></base-buttons>
          </slot>
        </section>
        <section class="zz-template--list__table">
          <slot name="baseTable">
            <base-table
              v-if="baseTable"
              :ref="getRefFn('table')"
              v-model:table="table.table"
              v-model:currentRow="table.currentRow"
              v-bind="table"
            ></base-table>
          </slot>
        </section>
        <section
          v-if="basePagination.props"
          class="zz-template--list__pagination"
        >
          <base-pagination v-bind="basePagination"></base-pagination>
        </section>
        <section
          v-if="baseDialog"
          class="zz-template--list__dialogs"
        >
          <base-dialog
            v-for="(dialog, $index) in baseDialog"
            :key="`dialog${ $index }`"
            :ref="getRefFn(dialog.name)"
            :name="`dialog${ $index }`"
            v-bind="dialog"
          ></base-dialog>
        </section>
      </section>
    </section>
  </el-scrollbar>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";

export default defineComponent({
  props: {
    refs: {
      type: Object,
      default: () => ({}),
    },
    baseButtons: {
      type: Object,
      default: null,
    },
    baseSearch: {
      type: Object,
      default: null,
    },
    baseTable: {
      type: Object,
      default: null,
    },
    basePagination: {
      type: Object,
      default: null,
    },
    baseDialog: {
      type: Array,
      default: null,
    },
  },
  emits: ["tampalteResetSearch"],
  setup(props, { emit }) {
    const table = reactive(props.baseTable);
    const refs = reactive(props.refs);

    const getRefFn = function (ref: string) {
      return function (el: any) {
        refs[ref] = el;
      };
    };
    const handleReset = (val: any) => {
      emit("tampalteResetSearch");
    };

    return {
      table,
      getRefFn,
      handleReset,
    };
  },
});
</script>

<style lang="scss">
</style>
