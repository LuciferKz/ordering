<template>
  <section class="order">
    <div class="order-list-item" v-for="order in orders" :key="order.id">
      <div class="order-list-item__info">
        <div class="order-list-item__time">{{ computedCreatedAt(order) }}</div>
        <div class="order-list-item__status">{{ order.statusAlias }}</div>
      </div>
      <div class="order-list-item__detail">
        <div class="order-item" v-for="product in order.detail" :key="product.id">
          <div class="order-item__name">{{ product.name }}</div>
          <div class="order-item__count">x {{ product.shopping }}</div>
        </div>
      </div>
      <div class="order-list-item__handle">
        <div class="order-list-item__deskNo">桌位号:<span>{{ order.desk_no }}</span></div>
        <div class="order-list-item__price">共件{{ order.count }}菜品，合计: <span>￥{{ order.price }}</span></div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { getOrders } from "@/api";
import $cookie from "@/utils/cookie";
import dayjs from "dayjs";

export default defineComponent({
  setup() {
    const orders = ref([])
    const openid = $cookie.get('openId');

    const computedCreatedAt = computed(() => {
      return function (order) {
        return dayjs(order.created_at).format("YYYY-MM-DD HH:mm:ss");
      }
    })
    getOrders({
      open_id: openid
    }).then((res) => {
      if (res.success) {
        orders.value = res.data.rows.map(order => {
          order.detail = JSON.parse(order.detail)
          return order
        })
      }
    })

    return {
      orders,

      computedCreatedAt
    }
  },
});
</script>

<style lang="scss">
.order {
  height: 100%;
  background: #eee;
  padding: 10px;
  .order-list-item {
    background: #fff;
    border-radius: 5px;
    padding: 10px;

    &__info {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #bbb;
    }

    &__detail {
      // display: flex;
      margin: 5px 0;
      padding: 5px;
      background-color: #fafafa;
      color: #333;
    }

    &__handle {
      display: flex;
      justify-content: space-between;
      color: #bbb;
      letter-spacing: 1px;
    }

    &__deskNo {
      font-size: 12px;
      span {
        font-size: 18px;
        color: #ff3333;
      }
    }

    &__price {
      color: #666;

      span {
        font-size: 18px;
        color: #ff3333;
      }
    }

    .order-item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>