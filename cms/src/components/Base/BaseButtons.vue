<template>
  <section class="mj-layout-buttons">
    <div
      class="mj-layout-buttons__bar"
      :style="barStyle"
    >
      <div
        v-for="(btn, $index) in buttons"
        :key="$index"
        :class="{'mj-layout-buttons__group': buttons.length > 1}"
      >
        <base-buttons
          v-if="isArray(btn)"
          :data="btn"
          :props="props"
          :events="events"
        ></base-buttons>
        <div v-else>
          <!-- v-permission="btn.code" -->
          <el-button
            v-bind="btnProps(btn.props)"
            v-on="btn.events || {}"
            @click="handleBtnClick(btn)"
          >
            {{ btn.label }}
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import { throttle } from "@/utils";

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: (): [] => [],
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    events: {
      type: Object,
      default: () => {},
    },
  },

  setup({ data, events }) {
    const buttons = reactive(data);

    const handleBtnClick = throttle(function (btn: any) {
      const cb = events[btn.key];
      cb && cb();
    }, 1000);

    return {
      buttons,

      handleBtnClick,

      isArray(data: any) {
        return data instanceof Array;
      },
    };
  },

  computed: {
    barStyle() {
      return {
        "justify-content": this.props.align || "flex-end",
      };
    },
    btnProps() {
      return function (props: any) {
        return Object.assign({}, this.props, props);
      };
    },
  },
});
</script>

<style lang="scss">
.mj-layout-buttons {
  &__bar {
    display: flex;
  }
  &__group {
    margin-left: 10px;
  }
}
</style>
