<template>
  <template-table v-bind="templateTable"></template-table>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, onMounted } from "vue";
import { useTemplateTable } from "@/hooks/index";
import { useMessager } from "@/hooks/index";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/product";

import { getCategories } from "@/api/category";
import { setReactiveArray } from "@/utils";

import getEditDialog from "./dialogs/edit";

import { mix } from "@/utils";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const categories = reactive([]);
    const editForm: any = reactive({});

    const messager = useMessager();

    const query = async () => {
      const res = await getProducts({
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

    const saveData = async (id?) => {
      const dialogRef = id ? refs.dialogEdit : refs.dialogAdd;
      let data = await dialogRef.getData();
      if (id) {
        data.id = id;
      }
      if (!data) return;
      const api = id ? updateProduct(data) : createProduct(data);

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
          label: "餐品名称",
        },
        {
          prop: "category_id",
          label: "餐品类别",
          type: "select",
          props: { options: categories, map: { label: "name", value: "id" } },
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
          const res = await deleteProduct(baseTable.currentRow.id);
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
        { label: "餐品ID", prop: "id", width: 70 },
        { label: "餐品名称", prop: "name" },
        { label: "餐品品类", prop: "category.name", width: 170 },
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
        on_shelf: 1,
      },
      dialogname: "dialogAdd",
      handleCancel() {
        refs.dialogAdd.close();
      },
      handleConfirm() {
        saveData();
        query();
      },
      categories,
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
      categories,
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
      getCategories({ limit: 100 }).then((res: any) => {
        if (res.success) {
          setReactiveArray(categories, res.data.rows);
        }
      });
    });

    return {
      templateTable,
    };
  },
});
</script>
