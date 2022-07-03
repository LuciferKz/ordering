<template>
  <section
    v-if="data"
    class="zz-menu--sub"
  >
    <section class="zz-menu__main">
      <section class="zz-menu-item">
        <section
          v-for="item in data"
          :key="item.path"
          class="zz-menu-item--submenu"
          :class="menuItemClass(item)"
          @click="handleClickItem(item)"
        >
          <span class="zz-menu-item__link">
            {{ item.name }}
          </span>
          <span
            v-if="item.children"
            class="zz-menu-item__icon"
          >
            <i class="iconfont icon-arrow-right"></i>
          </span>
        </section>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { setReactiveArray } from "@/utils";
import { computed, inject, defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter();

    const currentItem = inject("currentItem");
    const submenus: any = inject("submenus");

    const handleClickItem = function (item: any) {
      if (item.children) {
        submenus[props.index + 1] = item;
      } else {
        router.push({ path: item.path });
        setReactiveArray(submenus, []);
      }
    };

    const menuItemClass = computed(() => {
      // return item.collapse ? 'zz-menu-item__icon--collapse' : ''
      return function (item: any) {
        return submenus[props.index + 1] &&
          item.code === submenus[props.index + 1].code
          ? "active"
          : "";
      };
    });

    return {
      currentItem,
      menuItemClass,
      handleClickItem,
    };
  },
});
</script>

<style lang="scss">
</style>
