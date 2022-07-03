<template>
  <el-aside
    class="zz-cms-layout__sidebar"
    :width="collapse ? '50px' : '200px'"
  >
    <section
      class="zz-sidebar"
      @click.stop
    >
      <sidebar-menu @item-click="handleItemClick"></sidebar-menu>
      <section
        class="zz-sidebar__popover-menu"
        :style="{ width: submenus.length * 200 + 'px', left: collapse ? '50px': '200px' }"
      >
        <sidebar-sub-menu
          v-for="(menu, $index) in submenus"
          :key="menu.path"
          :data="menu.children"
          :index="$index"
          :class="$index > 0 ? 'zz-menu--sub__sub' : ''"
        ></sidebar-sub-menu>
        <i
          class="iconfont icon-close"
          @click="handleClose"
        ></i>
      </section>
    </section>
  </el-aside>
</template>

<script lang="ts">
import SidebarMenu from "./Menu.vue";
import SidebarSubMenu from "./SubMenu.vue";
import { ref, reactive, provide, inject, defineComponent } from "vue";
import { setReactiveArray } from "@/utils";

export default defineComponent({
  components: {
    SidebarMenu,
    SidebarSubMenu,
  },

  setup() {
    const currentItem: any = ref(null);
    provide("currentItem", currentItem);
    const collapse: any = inject("collapse");

    const submenus: any = reactive([]);

    provide("submenus", submenus);

    const handleItemClick = function (items: any) {
      setReactiveArray(submenus, items);
    };

    const handleClose = function () {
      setReactiveArray(submenus, []);
    };
    return {
      collapse,

      handleItemClick,

      handleClose,

      submenus,
    };
  },
});
</script>

<style lang="scss">
</style>
