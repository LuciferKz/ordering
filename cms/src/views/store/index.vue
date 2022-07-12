<template>
  <template-table v-bind="templateTable"></template-table>
</template>

<script lang="tsx">
import { ref, reactive, defineComponent, onMounted } from "vue";
import { useTemplateTable } from "@/hooks/index";
import { useMessager } from "@/hooks/index";
import {
  getStores,
  createStore,
  updateStore,
  deleteStore,
  exportQrcode,
} from "@/api/store";

import { createMenuProduct } from "@/api/menu_product";

import getEditDialog from "./dialogs/edit";

import { mix } from "@/utils";
import dayjs from "dayjs";
import download from "@/utils/download";
import getOnshelfDialog from "./dialogs/onshelf/index";
import getMenuDialog from "./dialogs/menu/index";

export default defineComponent({
  setup() {
    const editForm: any = reactive({});

    const messager = useMessager();
    ///

    const query = async () => {
      const res = await getStores({
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
        data.status = 0;
      }
      if (!data) return;
      data = { ...data, opening_time: data.opening_time.join(" - ") };
      const api = id ? updateStore(data) : createStore(data);

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
          label: "门店名称",
        },
      ],
      events: {
        search() {
          query();
        },
      },
    };

    const buttons = {
      buttons: [
        "add",
        "edit",
        "delete",
        { key: "toggle", label: "启用/禁用" },
        { key: "exportQrcode", label: "导出桌位二维码" },
        { key: "onshelf", label: "上架餐品" },
        { key: "checkMenu", label: "查看菜单" },
      ],
      events: {
        add() {
          refs.dialogAdd.open();
        },
        edit() {
          if (!isCheckedRow()) return;
          const currentRow = baseTable.currentRow;

          mix(editForm, {
            ...currentRow,
            opening_time: currentRow.opening_time.split(" - "),
          });

          refs.dialogEdit.open();
        },
        async delete() {
          if (!isCheckedRow()) return;
          const res = await deleteStore(baseTable.currentRow.id);
          if (res.success) {
            query();
            messager.success(res.message);
          } else {
            messager.warning(res.message);
          }
        },
        async toggle() {
          if (!isCheckedRow()) return;
          const res = await updateStore({
            id: baseTable.currentRow.id,
            status: 1 ^ baseTable.currentRow.status,
          });
          if (res.success) {
            query();
            messager.success(res.message);
          } else {
            messager.warning(res.message);
          }
        },
        async exportQrcode() {
          if (!isCheckedRow()) return;
          const res = await exportQrcode(baseTable.currentRow.id);
          download(res, `${baseTable.currentRow.name}桌位二维码.zip`);
          // console.log(res);
        },
        onshelf() {
          if (!isCheckedRow()) return;
          refs.dialogOnshelf.open();
        },
        checkMenu() {
          if (!isCheckedRow()) return;
          refs.dialogMenu.open();
        },
      },
    };

    const table = {
      columns: [
        { label: "门店ID", prop: "id", width: 70 },
        { label: "门店名称", prop: "name" },
        { label: "营业时间", prop: "opening_time", width: 170 },
        { label: "卓位数量", prop: "table_count", width: 100 },
        {
          label: "手机点餐",
          prop: "open_mobile_ordering",
          formatter: function ({ row }) {
            return row.open_mobile_ordering === 1 ? "启用" : "禁用";
          },
        },
        {
          label: "门店状态",
          prop: "status",
          formatter: function ({ row }) {
            return row.status === 1 ? "启用" : "禁用";
          },
        },
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

    const dialogOnshelf = getOnshelfDialog({
      dialogname: "dialogOnshelf",
      handleCancel() {
        refs.dialogOnshelf.close();
      },
      async handleOnshelf() {
        console.log("handleOnshelf");
        const products = await refs.dialogOnshelf.getData();
        const res = await createMenuProduct(
          products.map((product) => {
            return {
              product_id: product.id,
              store_id: baseTable.currentRow.id,
              on_shelf: 1,
            };
          })
        );
        if (res.success) {
          messager.success(res.message);
        } else {
          messager.warning(res.message);
        }
        refs.dialogOnshelf.close();
      },
    });

    const dialogMenu = getMenuDialog({
      dialogname: "dialogMenu",
      handleCancel() {
        refs.dialogMenu.close();
      },
      handleConfirm() {
        // saveData(baseTable.currentRow.id);
        // query();
      },
    });

    const templateTable = useTemplateTable({
      baseSearch: search,
      baseTable: table,
      baseButtons: buttons,
      basePagination: pagination,
      baseDialog: [dialogAdd, dialogEdit, dialogOnshelf, dialogMenu],
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
