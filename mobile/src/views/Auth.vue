<template>
  <section></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import $cookie from "@/utils/cookie";

export default defineComponent({
  setup() {
    $cookie.set("token", "abcdefghijklmnopqrstuvwxyz");
    const router = useRouter();
    router.push("/menu");
  },
});
</script>

<style lang="scss">
</style>