<template>
  <section class="zz-menu-item">
    <section
      v-for="item in data"
      :key="item.path"
      class="zz-menu-item--submenu"
    >
      <template v-if="item.children">
        <section
          class="zz-menu-item__title"
          :style="subMenuTitleStyle"
          @click="handleToggleMenu(item)"
        >
          <span
            class="zz-menu-item__icon"
            :class="subMenuIconClass(item)"
          >
            <i class="iconfont icon-arrow-right"></i>
          </span>
          {{ item.name }}
        </section>
        <sidebar-item
          v-show="item.collapse"
          :data="item.children"
          :level="level + 1"
        ></sidebar-item>
      </template>
      <span
        v-else
        class="zz-menu-item__link"
        :class="menuItem.path === item.path ? 'current-link' : ''"
        :style="subMenuLinkStyle"
        @click="handleRouterPush(item)"
      >
        {{ item.name }}
      </span>
    </section>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "SidebarItem",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const subMenuIconClass = computed(() => {
      return function (item: any) {
        return item.collapse ? "zz-menu-item__icon--collapse" : "";
      };
    });

    const store = useStore();
    const menuItem = computed(() => store.getters.menuItem);

    const subMenuTitleStyle = ref({
      paddingLeft: `${(props.level + 1) * 15}px`,
    });

    const subMenuLinkStyle = ref({
      paddingLeft: `${(props.level + 1) * 15 + 20}px`,
    });

    const handleToggleMenu = function (item: any) {
      item.collapse = !item.collapse;
    };

    const handleRouterPush = function (item: any) {
      router.push({ path: item.path });
    };
    return {
      route,

      menuItem,

      subMenuIconClass,
      subMenuTitleStyle,
      subMenuLinkStyle,

      handleToggleMenu,
      handleRouterPush,
    };
  },
});
</script>

<style lang="scss">
</style>
