<template>
  <section></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { getAccessToken, getUserInfo } from "@/api"
import $cookie from "@/utils/cookie";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const code = route.query.code || $cookie.get('code');

    const handleGetUserInfo = function (access_token, openId) {
      getUserInfo({
        access_token,
        openId
      }).then((res) => {
        store.dispatch('changeUser', JSON.parse(res.result))
        router.push("/menu");
      })
    }

    const token = $cookie.get('token');
    const openid = $cookie.get('openId');
    if (token && openid) {
      handleGetUserInfo(token, openid)
    } else {
      if (code) {
        getAccessToken({
          code
        }).then((res) => {
          const { accessToken, openid } = res.result
          $cookie.set('token', accessToken)
          $cookie.set('openId', openid)
          handleGetUserInfo(accessToken, openid)
        })
      } else {
        router.push("/menu");
      }
    }
  },
});
</script>

<style lang="scss">
</style>