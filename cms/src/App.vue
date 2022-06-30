<template>
  <router-view v-slot="{ Component }">
    <transition
      name="bounce"
      mode="out-in"
    >
      <component
        :is="Component"
        v-if="!loading"
      ></component>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const token: any = computed(() => store.state.user.token);
    const loading = ref(!!token.value);
    // 设置主题
    store.commit("setTheme", "zero");

    return {
      loading,
    };
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
