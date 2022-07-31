<template>
  <section class="order">
    <div class="order-list-item" v-for="order in orders" :key="order.id">
      <div class="order-list-item__info">
        <div class="order-list-item__time">{{ order.created_at }}</div>
        <div class="order-list-item__status">{{ order.status }}</div>
      </div>
      <div class="order-list-item__detail">
        <div class="order-item" v-for="product in order.detail" :key="product.id">
          <div class="order-item__name">{{ product.name }}</div>
          <div class="order-item__count">x {{ product.shopping }}</div>
        </div>
      </div>
      <div class="order-list-item__handle">
        <div class="order-list-item__deskNo">桌位号:<span>{{ order.desk_no }}</span></div>
        <div class="order-list-item__price">共件{{ order.count }}菜品，合计: {{ order.price }}</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getOrders } from "@/api";
import $cookie from "@/utils/cookie";

export default defineComponent({
  setup() {
    const orders = ref([])
    const openid = $cookie.get('openId');
    getOrders({
      open_id: openid
    }).then((res) => {
      if (res.success) {
        orders.value = res.data.rows.map(order => {
          order.detail = JSON.parse(order.detail)
        })
      }
    })

    return {
      orders
    }
  },
});
</script>

<style lang="scss">
</style>