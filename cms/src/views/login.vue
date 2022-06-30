<template>
  <section class="zero-login">
    <section class="zero-login__content">
      <base-form v-bind="baseForm">
      </base-form>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useBaseForm } from "@/hooks/index";
import $cookie from "@/utils/cookie";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: () => {},
    },
  },
  setup(props, context) {
    const baseForm = useBaseForm({
      formItems: [
        {
          label: "用户名",
          prop: "name",
        },
        {
          label: "密码",
          prop: "password",
          type: "password",
        },
      ],
    });
    return {
      baseForm,
    };
  },
});
</script>

<style lang="scss">
.zero-login {
  display: flex;
  height: 100%;
  background-color: #d6e9ff;
  // background: linear-gradient(90deg, #e5f2ff 44%, #28398a 44%);
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    width: 600px;
    height: 240px;
    background: #fff;
    // border-radius: 20px;
    overflow: hidden;
    box-shadow: 1px 0px 10px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
