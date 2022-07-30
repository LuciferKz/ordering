<template>
  <section></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getAccessToken } from "@/api"
import $cookie from "@/utils/cookie";

export default defineComponent({
  setup() {
    $cookie.set("token", "abcdefghijklmnopqrstuvwxyz");
    const router = useRouter();
    const route = useRoute();
    const code = route.query.code
    console.log(code)
    getAccessToken({
      code
    }).then((data) => {
      console.log(data)
      
      // router.push("/menu");
    })
  },
});
</script>

<style lang="scss">
</style>