<template>
  <router-view v-slot="{ Component }">
    <transition
      name="bounce"
      mode="out-in"
    >
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { ref, computed, defineComponent, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const token: any = computed(() => store.state.user.token);
    // 设置主题
    store.commit("setTheme", "zero");
    store.dispatch("changeMenuTree", [
      {
        seqNum: "0",
        code: "customer",
        name: "餐饮管理",
        superCode: "MENU_LEVEL_000",
        icon: "icon-kehuguanli",
        type: "MENU",
        href: "/ordering",
        subMenuList: [
          {
            seqNum: "1",
            code: "ordering-store-manager",
            name: "门店管理",
            superCode: "customer",
            icon: "icon iconfont icon-yonghuguanli",
            type: "MENU",
            href: "/ordering/store",
            subMenuList: null,
          },
          {
            seqNum: "2",
            code: "ordering-category-manager",
            name: "类别管理",
            superCode: "customer",
            icon: "icon iconfont icon-yonghuguanli",
            type: "MENU",
            href: "/ordering/category",
            subMenuList: null,
          },
          {
            seqNum: "3",
            code: "ordering-product-manager",
            name: "餐品管理",
            superCode: "customer",
            icon: "icon iconfont icon-yonghuguanli",
            type: "MENU",
            href: "/ordering/product",
            subMenuList: null,
          },
        ],
      },
    ]);
    watch(token, (val) => {
      if (val) {
        // 登录
        // getUserInfo();
      } else {
        // 未登录
        router.push("/login");
      }
    });

    return {};
  },
});
</script>
<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#container {
  width: 100%;
  height: 100%;
}
.bounce-enter-active {
  animation: routeEnter 0.2s;
}
.bounce-leave-active {
  animation: routeLeave 0.2s;
}
@keyframes routeLeave {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  100% {
    opacity: 0;
    transform: translate(0, 5%);
  }
}
@keyframes routeEnter {
  0% {
    opacity: 0;
    transform: translate(0, -5%);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}
</style>
