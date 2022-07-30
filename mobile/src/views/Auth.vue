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
    
    if (code) {
      getAccessToken({
        code
      }).then((res) => {
        
        const { accessToken, openid } = res.result
        $cookie.set('token', accessToken)
        $cookie.set('openId', openid)

        getUserInfo({
          access_token: accessToken,
          openId: openid
        }).then((res) => {
          store.dispatch('changeUser', res.result)
          router.push("/menu");
        })
      })
    } else {
      router.push("/menu");
    }
  },
});
</script>

<style lang="scss">
</style>