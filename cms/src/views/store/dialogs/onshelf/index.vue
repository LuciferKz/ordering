<template>
  <section>
    <base-search v-bind="baseSearch"></base-search>
    <!-- <base-buttons v-binnd="baseButtons"></base-buttons> -->
    <!-- <ul>
      <li
        v-for="product in data"
        :key="product.id"
      >
        {{ product.name }}
      </li>
    </ul> -->
    <base-table
      ref="refTable"
      v-bind="baseTable"
    ></base-table><br />
    <base-pagination v-bind="basePagination"></base-pagination>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useBaseSearch, useBasePagination, useBaseTable } from "@/hooks/index";

import { getProducts } from "@/api/product";

export default defineComponent({
  setup() {
    const data = ref([]);
    const query = async () => {
      const res = await getProducts({
        ...baseSearch.filter,
        ...basePagination.pagination,
      });
      baseTable.data = res.data.rows;
      total.value = res.data.count;
    };
    const refTable = ref(null);
    const baseTable = useBaseTable({
      columns: [
        { label: "餐品名称", prop: "name" },
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

    const getData = function (cb) {
      cb(refTable.value.refBaseTable.getSelectionRows());
    };

    onMounted(() => {
      query();
    });

    return {
      data,
      baseTable,
      baseSearch,
      basePagination,
      refTable,
      getData,
    };
  },
});
</script>

<style lang="scss">
</style>