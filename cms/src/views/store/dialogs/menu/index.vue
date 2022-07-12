<template>
  <section>
    <base-search v-bind="baseSearch"></base-search>
    <!-- <base-buttons v-binnd="baseButtons"></base-buttons> -->
    <base-table
      ref="refTable"
      v-bind="baseTable"
    ></base-table>
    <base-pagination v-bind="basePagination"></base-pagination>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useBaseSearch, useBasePagination, useBaseTable } from "@/hooks/index";
import {
  useBaseButtons,
  useBaseSearch,
  useBasePagination,
} from "@/hooks/index";

import { getMenuProducts } from "@/api/menu_product";

export default defineComponent({
  props: {
    id: {
      type: Number,
    },
  },
  setup(props) {
    const data = ref([]);
    const query = async () => {
      const res = await getMenuProducts({
        store_id: props.id,
        ...baseSearch.filter,
        ...basePagination.pagination,
      });
      baseTable.data = res.data.rows;
      total.value = res.data.count;
    };

    const refTable = ref(null);
    const baseTable = useBaseTable({
      columns: [
        { label: "餐品名称", prop: "product.name" },
        { label: "餐品品类", prop: "category.name" },
      ],
      data: [],
      props: { selection: true },
    });

    const baseSearch = useBaseSearch({
      formItems: [
        {
          prop: "name",
          label: "餐品名称",
        },
      ],
      props: { span: 16 },
      events: {
        search() {
          query();
        },
      },
    });

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
    const basePagination = useBasePagination(pagination);
    // const baseButtons = useBaseButtons();

    onMounted(() => {
      query();
    });

    return {
      data,
      baseSearch,
      refTable,
      baseTable,
      // baseButtons,
      basePagination,
    };
  },
});
</script>

<style lang="scss">
</style>