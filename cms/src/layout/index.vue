<template>
  <el-container class="zz-cms-layout">
    <el-header class="zz-cms-layout__header">
      <div style="flex: 1;"></div>
      <user-card></user-card>
    </el-header>
    <el-container class="zz-cms-layout__body">
      <side-bar></side-bar>
      <el-container class="zz-cms-layout__main">
        <el-main class="zz-cms-layout__mainview">
          <main-view></main-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "./components/SideBar/index.vue";
import MainView from "./components/MainView.vue";
import UserCard from "./components/UserCard.vue";
import { defineComponent, ref, provide } from "vue";

export default defineComponent({
  components: { SideBar, MainView, UserCard },
  setup() {
    const collapse = ref(true);
    provide("collapse", collapse);
  },
});
</script>
