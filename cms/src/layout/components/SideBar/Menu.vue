<template>
  <section
    class="zz-menu"
    :class="collapse ? '': 'active'"
  >
    <!-- @mouseleave="handleMouseLeave" -->
    <section
      v-for="item in menuTree"
      :key="item.path"
      class="zz-menu__module"
      :data-path="item.path"
      :class="menuModuleClass(item)"
      @click="handleClckItem(item)"
    >
      <div class="zz-menu__icon">
        <el-tooltip
          class="item"
          effect="dark"
          :content="item.name"
          :offset="20"
          placement="right-start"
        >
          <i
            class="iconfont"
            :class="item.icon"
          ></i>
        </el-tooltip>
      </div>
      <div class="zz-menu__name">
        {{ menuModuleAlias(item) }}
      </div>
      <span
        v-if="item.children"
        class="zz-menu__icon--arrow"
      >
        <i class="iconfont icon-arrow-right"></i>
      </span>
    </section>
  </section>
</template>

<script lang="ts">
// import SidebarItem from './MenuItem.vue'
import { ref, inject, defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  // components: { SidebarItem },

  setup(props, { emit }) {
    const collapse = inject("collapse");
    const currentItem: any = inject("currentItem");
    const currentPath = ref("");

    let tToggleMenu: any = null;

    const toggleMenu = function (path: string) {
      if (tToggleMenu) clearTimeout(tToggleMenu);
      tToggleMenu = setTimeout(() => {
        currentPath.value = path;
      }, 80);
    };

    const menuItem: any = ref(null);

    const handleClckItem = function (item: any) {
      menuItem.value = item;
      emit("item-click", [item]);
      document.onclick = function () {
        menuItem.value = null;
        emit("item-click", []);
      };
    };

    const handleMouseEnter = function (item: any) {
      currentItem.value = item;
      toggleMenu(item.path);
    };

    const handleMouseLeave = function () {
      currentItem.value = null;
      toggleMenu("");
    };

    // 当前module的class是不是有current-menu
    const menuModuleClass = computed(() => {
      return function (item: any) {
        // return currentPath.value === item.path ? 'current-menu' : ''
        return menuItem.value && menuItem.value.seqNum === item.seqNum
          ? "current-menu"
          : "";
      };
    });

    // 每个module的缩写名称，默认规则取前两位
    const menuModuleAlias = computed(() => {
      return function (item: any) {
        return item.name;
        // return item.name.slice(0, 2)
      };
    });

    // 当前module是否展示主菜单
    const isShowMainMenu = computed(() => {
      return function (item: any) {
        return currentPath.value === item.path;
      };
    });

    const store = useStore();

    const menuTree = computed(() => store.getters.menuTree);

    const route = useRoute();
    watch(route, () => {
      handleMouseLeave();
    });

    return {
      collapse,

      currentItem,
      currentPath,

      menuModuleClass,
      menuModuleAlias,
      isShowMainMenu,
      menuTree,

      handleClckItem,
      handleMouseEnter,
      handleMouseLeave,
    };
  },
});
</script>

<style lang="scss">
</style>
