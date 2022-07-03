<template>
  <section class="zz-login">
    <section class="zz-login__content">
      <h3>点餐系统管理平台登录</h3>
      <base-form
        ref="refForm"
        v-bind="baseForm"
      ></base-form>
      <div class="zz-login__buttons">
        <base-buttons v-bind="baseButtons"></base-buttons>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBaseForm, useBaseButtons } from "@/hooks/index";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { login } from "@/api/auth";
import { ElMessage } from "element-plus";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: () => {},
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();

    const baseForm = useBaseForm({
      formItems: [
        {
          label: "用户名",
          prop: "name",
          props: {
            autocomplete: "off",
          },
        },
        {
          label: "密码",
          prop: "password",
          props: {
            type: "password",
            autocomplete: "off",
          },
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
          refForm.value.getData(async (data: any) => {
            if (data) {
              const res = await login(data);
              if (res.success) {
                ElMessage.success(res.message);
                store.dispatch("login", res.data);
                router.push("/store");
              } else {
                ElMessage.warning(res.message);
              }
            }
          });
        },
      },
    });

    const refForm = ref(null);
    return {
      baseForm,
      baseButtons,
      refForm,
    };
  },
});
</script>

<style lang="scss">
.zz-login {
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
