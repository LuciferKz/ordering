<template>
  <router-view></router-view>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { getUserInfo } from "@/api"

export default defineComponent({
  setup() {
    const store = useStore();
    const handleGetUserInfo = function (access_token, openId) {
      getUserInfo({
        access_token,
        openId
      }).then((res) => {
        store.dispatch('changeUser', JSON.parse(res.result))
      })
    }

    const token = $cookie.get('token');
    const openid = $cookie.get('openId');
    if (token && openid) {
      handleGetUserInfo(token, openid)
    }
  }
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
