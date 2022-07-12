<template>
  <section>
    <base-search v-bind="baseSearch"></base-search>
    <!-- <base-buttons v-binnd="baseButtons"></base-buttons> -->
    <ul>
      <li>
      </li>
    </ul>
    <base-pagination v-bind="basePagination"></base-pagination>
  </section>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, onMounted } from "vue";
import {
  useBaseButtons,
  useBaseSearch,
  useBasePagination,
} from "@/hooks/index";

import { getMenuProducts } from "@/api/menu_product";

export default defineComponent({
  setup() {
    const data = ref([]);
    const query = async () => {
      const res = await getMenuProducts({
        store_id: 4,
        ...baseSearch.filter,
        ...basePagination.pagination,
      });
      data.value = res.data.rows;
      total.value = res.data.count;
    };

    const baseSearch = useBaseSearch({
      formItems: [
        {
          prop: "name",
          label: "餐品名称",
        },
      ],
      events: {
        search() {
          query();
        },
      },
    });
    // const baseButtons = useBaseButtons();

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

    onMounted(() => {
      query();
    });

    return {
      data,
      baseSearch,
      // baseButtons,
      basePagination,
    };
  },
});
</script>

<style lang="scss">
</style>