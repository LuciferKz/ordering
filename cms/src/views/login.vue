<template>
  <section class="mj-login">
    <section class="mj-login__content">
      <h3>点餐系统管理平台登录</h3>
      <base-form
        ref="refForm"
        v-bind="baseForm"
      ></base-form>
      <div class="mj-login__buttons">
        <base-buttons v-bind="baseButtons"></base-buttons>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import $cookie from "@/utils/cookie";
import { useBaseForm, useBaseButtons } from "@/hooks/index";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: () => {},
    },
  },
  setup(props, context) {
    const router = useRouter();
    const baseForm = useBaseForm({
      formItems: [
        {
          label: "用户名",
          prop: "name",
        },
        {
          label: "密码",
          prop: "password",
        },
      ],
      rules: {
        name: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    });

    const baseButtons = useBaseButtons({
      buttons: [{ key: "login", label: "登录" }],
      events: {
        login: function () {
          refForm.value.getData(() => {
            console.log(baseForm);
            router.push("/store");
          });
        },
      },
    });

    const refForm = ref(null);

    console.log(baseButtons);
    return {
      baseForm,
      baseButtons,
      refForm,
    };
  },
});
</script>

<style lang="scss">
.mj-login {
  display: flex;
  height: 100%;
  background-color: #d6e9ff;
  // background: linear-gradient(90deg, #e5f2ff 44%, #28398a 44%);
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex-direction: column;
    width: 480px;
    height: 240px;
    padding: 20px 0;
    background: #fff;
    // border-radius: 20px;
    overflow: hidden;
    box-shadow: 1px 0px 10px 4px rgba(0, 0, 0, 0.1);

    h3 {
      text-align: center;
      margin-bottom: 30px;
    }
  }

  &__buttons {
    padding-right: 20px;
  }
}
</style>
