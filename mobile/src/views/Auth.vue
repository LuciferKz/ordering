<template>
  <section></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useWxAuth } from '@/hooks';

export default defineComponent({
  setup() {
    useWxAuth();
  },
});
</script>

<style lang="scss">
</style>