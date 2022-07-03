<template>
  <section class="zz-template zz-template--list">
    <section class="zz-template--list__header">
      <base-search
        v-if="baseSearch"
        v-bind="baseSearch"
      ></base-search>
    </section>
    <section
      v-if="baseButtons || baseTable"
      class="zz-template--list__body"
    >
      <section class="zz-template--list__buttons">
        <base-buttons
          v-if="baseButtons"
          v-bind="baseButtons"
        ></base-buttons>
      </section>
      <section class="zz-template--list__table">
        <base-table
          v-if="baseTable"
          v-model:table="baseTable.table"
          v-model:currentRow="baseTable.currentRow"
          v-bind="baseTable"
        ></base-table>
      </section>
      <section class="zz-template--list__pagination">
        <base-pagination
          v-if="basePagination"
          v-bind="basePagination"
        ></base-pagination>
      </section>
      <base-dialog
        v-if="baseDialog"
        ref="refDialog"
        v-bind="baseDialog"
      ></base-dialog>
    </section>
  </section>
</template>

<script lang="ts">
import {
  useBaseForm,
  useBaseDialog,
  useBaseSearch,
  useBaseButtons,
  useBaseTable,
  useBasePagination,
} from "@/hooks/index";
import { ref, defineComponent, onMounted } from "vue";

export default defineComponent({
  setup(props, context) {
    const baseForm = useBaseForm({
      formItems: [
        {
          label: "名称",
          prop: "name",
        },
      ],
      props: {
        height: "500px",
      },
    });
    const refDialog: any = ref(null);
    const baseDialog: any = useBaseDialog({
      props: {
        title: "新增",
        showClose: false,
      },
      body: baseForm,
      footer: {
        buttons: ["cancel", "confirm"],
        events: {
          cancel() {
            refDialog.value.close();
          },
          confirm() {
            refDialog.value.close();
          },
        },
      },
    });
    /** ************* baseSearch start ***************/
    const baseSearch = useBaseSearch({
      form: {
        gender: 1,
        createDate: "2020-09-09",
        c: 10,
      },
      formItems: [
        {
          type: "select-v2",
          prop: "gender",
          label: "性别",
          labelWidth: 60,
          props: {
            label: "性别",
            options: [
              { label: "男", value: 2 },
              { label: "女", value: 1 },
            ],
            placeholder: "请选择性别",
          },
        },
        {
          type: "date-picker",
          prop: "createDate",
          label: "选择日期",
          props: {
            placeholder: "请选择日期",
          },
        },
        {
          type: "input-number",
          prop: "c",
          label: "数字",
          props: {
            placeholder: "请输入数字",
            info: "字段提示内容示例",
          },
        },
        {
          prop: "validate",
          label: "校验调试",
          props: {
            placeholder: "请输入数字",
          },
        },
      ],
      rules: {
        validate: [{ required: true, message: "必填项" }],
      },
      events: {
        search(form: any) {},
      },
    });
    /** ************* baseSearch start ***************/

    /** ************* baseButtons start ***************/
    const baseButtons = useBaseButtons({
      buttons: [
        "add",
        "edit",
        "delete",
        { label: "测试弹出层", key: "show-dialog" },
      ],
      events: {
        add() {
          baseTable.data.push({ a: 111, b: 111 });
        },
        edit() {},
        delete() {
          baseTable.data.pop();
        },
        "show-dialog"() {
          refDialog.value.open();
        },
      },
    });
    /** ************* baseButtons end ***************/

    /** ************* baseTable start ***************/
    const baseTable = useBaseTable({
      columns: [
        {
          prop: "a",
          label: "A",
          render(h: any, scope: any) {
            return h("span", {}, `${scope.row.a}abc`);
          },
        },
        {
          prop: "b",
          label: "B",
        },
      ],
      data: [
        { a: 1, b: 2 },
        { a: 11, b: 22 },
      ],
      events: {
        rowClick(row: any) {},
      },
    });

    const basePagination = useBasePagination({
      currentPage: 1,
      props: {},
      events: {
        sizeChange(val: any) {},
        currentChange(val: any) {},
      },
    });

    onMounted(() => {
      baseTable.data = [
        { a: 1, b: 2 },
        { a: 11, b: 22 },
        { a: 1, b: 2 },
        { a: 11, b: 22 },
        { a: 11, b: 22 },
        { a: 11, b: 22 },
      ];
    });
    /** ************* baseTable end ***************/

    return {
      baseSearch,
      baseButtons,
      baseTable,
      baseDialog,
      basePagination,

      refDialog,
    };
  },
});
</script>

<style lang="scss">
</style>
