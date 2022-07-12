<template>
  <section class="mj-login">
    <section class="mj-login__content">
      <section class="mj-login-form">
        <section class="mj-login-form__content">
          <section class="mj-login-form__header">
            <img
              src="@/assets/logo.png"
              alt=""
              width="120"
            />
            <h1 class="mj-login-form__title">餐饮后台管理系统</h1>
          </section>
          <section class="mj-login-form__main">
            <base-form
              ref="refForm"
              v-bind="baseForm"
            ></base-form>
            <section class="mj-login-form__buttons">
              <!-- <base-buttons v-bind="baseButtons"></base-buttons> -->
              <el-button
                native-type="submit"
                class="mj-login-form__submit"
                @click="handleLogin"
              >登录</el-button>
            </section>
          </section>
        </section>
      </section>
      <section class="mj-login-banner">
        <img
          src="@/assets/image1.png"
          alt=""
          class="mj-login-banner__main"
        />
      </section>
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
      props: {
        labelPosition: "top",
      },
    });

    const baseButtons = useBaseButtons({
      buttons: [
        {
          key: "login",
          label: "登录",
          props: { class: "mj-login-form__submit" },
        },
      ],
      events: {
        login: function () {},
      },
    });

    const handleLogin = function () {
      refForm.value.getData(async (data: any) => {
        if (data) {
          const res = await login(data);
          if (res.success) {
            ElMessage.success(res.message);
            store.dispatch("login", res.data);
            router.push("/");
          } else {
            ElMessage.warning(res.message);
          }
        }
      });
    };

    const refForm = ref(null);
    return {
      baseForm,
      baseButtons,

      handleLogin,
      refForm,
    };
  },
});
</script>

<style lang="scss">
.mj-login {
  display: flex;
  height: 100%;
  // background-color: #28398a;
  background: linear-gradient(90deg, #e5f2ff 44%, #28398a 44%);
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    width: 72%;
    height: 80%;
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 1px 0px 10px 4px rgba(0, 0, 0, 0.1);
  }
}

.mj-login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 41.7%;
  max-width: 1400px;

  &__header {
    text-align: center;
  }

  &__title {
    height: 42px;
    font-size: 30px;
    font-weight: 500;
    color: #28398a;
    line-height: 42px;
    text-align: center;
  }

  &__content {
    width: 100%;
    min-width: 200px;
    max-width: 450px;
    padding: 0 20px;
    height: 480px;
  }

  &__main {
    margin: 15px 0;
    .el-form-item__label {
      line-height: 32px;
      padding-bottom: 5px;
    }
  }

  &__helper {
    display: flex;
    justify-content: space-between;

    .el-checkbox {
      display: flex;
      align-items: center;
      line-height: 1;

      .el-checkbox__label {
        padding-top: 1px;
      }
    }
  }

  &__buttons {
    margin-top: 15px;
  }

  &__submit {
    width: 100%;
    height: 50px;
    background: #28398a;
    border-radius: 25px;
    color: #fff;
    letter-spacing: 5px;
    font-size: 18px;
  }
}
.mj-login-banner {
  flex: 1;
  background: #e5f2ff;
  position: relative;

  &__main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
  }
}
</style>
