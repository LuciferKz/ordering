<template>
  <!-- v-loading="loading" -->
  <section class="zz-main-view">
    <router-view v-slot="{ Component }">
      <!-- {{ handle(Component) }} -->
      <!-- <transition
        name="bounce"
        mode="out-in"
      > -->
      <!-- <keep-alive :include="includes"> -->
      <component :is="Component" />
      <!-- </keep-alive> -->
      <!-- </transition> -->
    </router-view>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    // const route: any = useRoute();
    const store: any = useStore();

    const includes: any = computed(() => store.state.tab.includes);

    // let routePath = "";

    const loading: any = computed(() => store.state.loading.loading.mainview);

    return {
      loading,

      // handle(c: any) {
      //   if (routePath === route.path || !c.type.name) return;

      //   routePath = route.path;

      //   store.dispatch("setInclude", {
      //     key: routePath,
      //     value: c.type.name,
      //   });
      // },
      // includes,
    };
  },
});
</script>

<style lang="scss">
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
