<template>
  <template-table v-bind="templateTable"></template-table>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, onMounted } from "vue";
import { useTemplateTable } from "@/hooks/index";
import { useMessager } from "@/hooks/index";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/category";

import getEditDialog from "./dialogs/edit";

import { mix } from "@/utils";
import dayjs from "dayjs";
import download from "@/utils/download";

export default defineComponent({
  setup() {
    const editForm: any = reactive({});

    const messager = useMessager();
    ///

    const query = async () => {
      const res = await getCategories({
        ...baseSearch.filter,
        ...basePagination.pagination,
      });
      baseTable.data = res.data.rows;
      total.value = res.data.count;
    };

    const isCheckedRow = () => {
      if (JSON.stringify(baseTable.currentRow) === "{}") {
        messager.warning("请选择一条数据");
        return false;
      }
      return true;
    };

    const saveData = async (id?: any) => {
      const dialogRef = id ? refs.dialogEdit : refs.dialogAdd;
      let data = await dialogRef.getData();
      if (id) {
        data.id = id;
        data.status = 0;
      }
      if (!data) return;
      const api = id ? updateCategory(data) : createCategory(data);

      const res: any = await api;
      messager({
        type: res.code === 200 ? "success" : "warning",
        message: res.message,
      });
      if (res.code === 200) {
        dialogRef.close();
        query();
      }
    };
    /// template table

    const search = {
      formItems: [
        {
          prop: "name",
          label: "品类名称",
        },
      ],
      events: {
        search() {
          query();
        },
      },
    };

    const buttons = {
      buttons: ["add", "edit", "delete"],
      events: {
        add() {
          refs.dialogAdd.open();
        },
        edit() {
          if (!isCheckedRow()) return;
          const currentRow = baseTable.currentRow;

          mix(editForm, currentRow);

          refs.dialogEdit.open();
        },
        async delete() {
          if (!isCheckedRow()) return;
          const res = await deleteCategory(baseTable.currentRow.id);
          if (res.success) {
            query();
            messager.success(res.message);
          } else {
            messager.warning(res.message);
          }
        },
      },
    };

    const table = {
      columns: [
        { label: "类别ID", prop: "id", width: 70 },
        { label: "类别名称", prop: "name" },
        {
          label: "创建时间",
          prop: "created_at",
          formatter: function ({ row }) {
            return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
          },
          width: 180,
        },
        {
          label: "更新时间",
          prop: "updated_at",
          formatter: function ({ row }) {
            return dayjs(row.created_at).format("YYYY-MM-DD HH:mm:ss");
          },
          width: 180,
        },
      ],
      data: [],
    };

    const total = ref(0);
    const pagination = {
      props: {
        total,
      },
      events: {
        currentChange() {
          query();
        },
        sizeChange() {
          query();
        },
      },
    };

    const dialogAdd = getEditDialog({
      form: {
        open_mobile_ordering: 1,
        opening_time: ["09:30:00", "22:00:00"],
        table_count: 10,
      },
      dialogname: "dialogAdd",
      handleCancel() {
        refs.dialogAdd.close();
      },
      handleConfirm() {
        saveData();
        query();
      },
    });

    const dialogEdit = getEditDialog({
      dialogname: "dialogEdit",
      form: editForm,
      handleCancel() {
        refs.dialogEdit.close();
      },
      handleConfirm() {
        saveData(baseTable.currentRow.id);
        query();
      },
    });

    const templateTable = useTemplateTable({
      baseSearch: search,
      baseTable: table,
      baseButtons: buttons,
      basePagination: pagination,
      baseDialog: [dialogAdd, dialogEdit],
    });
    const { refs, baseSearch, baseTable, basePagination } = templateTable;
    console.log("templateTable", templateTable);

    ///
    onMounted(() => {
      query();
    });

    return {
      templateTable,
    };
  },
});
</script>
