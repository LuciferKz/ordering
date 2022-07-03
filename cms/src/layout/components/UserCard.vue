<template>
  <el-popover
    placement="bottom"
    popper-class="zz-user-card-content--popover"
    :offset="1"
    :show-arrow="false"
    :width="200"
    trigger="click"
  >
    <template #reference>
      <section class="zz-user-card">
        <div class="zz-user-card__avatar">
          <img
            v-if="info.avatar"
            :src="info.avatar"
            alt=""
          />
          <img
            v-else
            src="@/assets/avatar2.jpg"
            alt=""
          />
        </div>
        <div class="zz-user-card__name">{{ info.userName }}</div>
        <div class="zz-user-card__arrow">
          <i class="iconfont icon-arrow-bottom"></i>
        </div>
      </section>
    </template>
    <div class="zz-user-card--popover">
      <div class="zz-user-card--popover__head">当前登录账户</div>
      <div class="zz-user-card--popover__content">
        <div
          class="zz-user-card--popover__avatar"
          @dblclick="handleShowToken"
        >
          <img
            v-if="info.avatar"
            :src="info.avatar"
            alt=""
          />
          <img
            v-else
            src="@/assets/avatar2.jpg"
            alt=""
          />
        </div>
        <div class="zz-user-card--popover__name">{{ info.userName }}</div>
      </div>
      <div class="zz-user-card--popover__foot">
        <el-button
          type="text"
          @click="handleLogOut"
        >退 出 登 录</el-button>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useMessager } from "@/hooks/index";
import { useStore } from "vuex";
import $cookie from "@/utils/cookie";

export default defineComponent({
  setup() {
    const info = computed(() => store.state.user.info);

    const store = useStore();
    const messager = useMessager();

    const handleLogOut = function () {
      store.dispatch("logout");
    };
    const handleShowToken = () => {
      messager.confirm(
        '<p style="word-wrap: break-word;">' + $cookie.get("token") + "</p>",
        "Token",
        {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false,
          showCancelButton: false,
        }
      );
    };

    return {
      info,

      handleShowToken,

      handleLogOut,
    };
  },
});
</script>

<style lang="scss"></style>
