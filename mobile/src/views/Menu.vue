<template>
  <section class="menu">
    <section class="clubcard">
      <dl>
        <dt class="user-avatar">
          <img
            v-if="userInfo.headimgurl"
            class="user-avatar__img"
            alt=""
            :src="userInfo.headimgurl"
          />
          <img
            v-else
            class="user-avatar__img"
            alt=""
            src="../assets/sh/defaultHeadPic.svg"
          >
        </dt>
        <dd class="store-info">
          <h2
            class="brand-name"
            @click="auth()"
          >
            <span>{{ userInfo.nickname || '登录 / 授权' }}</span>
            <label
              class="desk-no"
              v-if="storeInfo.deskNo && storeInfo.deskNo > 0"
            >{{ storeInfo.deskNo }}号桌</label>
          </h2>
          <p class="store-name">
            <span @click="showStoreModel()">
              {{ storeInfo.name || '未选择名店' }}
            </span>
            <el-icon :size="20">
              <Location style="width: 1em; height: 1em; margin-left: 3px; vertical-align: middle;" />
            </el-icon>
          </p>
        </dd>
        <dd
          class="my-order"
          ng-click="go('dingdan', null, $event)"
        >
          <el-icon>
            <Document style="width: 1em; height: 1em; margin-left: 3px;" />
          </el-icon><span>我的订单</span>
        </dd>
      </dl>
    </section>
    <section class="menu__body">
      <div class="menu-category">
        <div
          class="menu-category__item"
          :class="{ 'active': category.active }"
          v-for="(category, $index) in categories.list"
          :key="category.id"
          @click="handleSwitchCategory($index)"
        >{{ category.name }}</div>
      </div>
      <div
        class="menu-list"
        ref="refMenuList"
      >
        <div
          class="menu-list__item"
          v-for="category in categories.map"
          :key="category.id"
          ref="refCategories"
        >
          <h3 class="menu-list__category-name">{{ category.name }}</h3>
          <div class="menu-list__products">
            <div
              class="product"
              v-for="product in category.products"
              :key="product.id"
            >
              <div class="product__image">
                <img src="@/assets/nopic_default_s.png" />
              </div>
              <div class="product__info">
                <div class="product__name">{{ product.detail.name }}</div>
                <div class="product__detail">{{ product.detail.intro }}</div>
                <div class="product__shopping">
                  <span class="product__price">￥{{ product.detail.price }}</span>
                  <div class="product__btns">
                    <el-icon
                      @click="handleShopping(product, -1)"
                      v-if="product.shopping > 0"
                    >
                      <RemoveFilled style="width: 1.5em; height: 1.5em; margin-left: 3px;" />
                    </el-icon>
                    <span v-if="product.shopping > 0">{{ product.shopping }}</span>
                    <el-icon @click="handleShopping(product, 1)">
                      <CirclePlusFilled style="width: 1.5em; height: 1.5em; margin-left: 3px;" />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="menu__footer">
      <div>
      </div>
      <div
        class="shopcart"
        @click="handleOpenShoppingCart"
      >
        <!-- <i class="icon-shopping-cart"></i> -->
        <div class="shopcart__icon">
          <el-icon>
            <ShoppingCart style="width: 2em; height: 2em; margin-left: 3px;" />
          </el-icon>
        </div>
        <div class="shopcart__badge">
          <em
            class="shopbadge ng-binding"
            id="shopbadge"
          >{{ shoppingCount }}</em>
        </div>
      </div>
    </section>
    <el-drawer
      v-model="drawer"
      direction="btt"
      :append-to-body="true"
      size="90%"
    >
      <template #title>
        <span style="flex: 1;">购物车</span>
      </template>
      <div class="shopping-cart">
        <div
          class="shopping-cart__item"
          v-for="product in shoppingCart"
          :key="product.id"
        >
          <div class="shopping-cart__name">{{ product.detail.name }}</div>
          <div class="shopping-cart__shopping">
            <el-icon
              @click="handleShopping(product, -1)"
              v-if="product.shopping > 0"
            >
              <RemoveFilled style="width: 1.5em; height: 1.5em; margin-left: 3px;" />
            </el-icon>
            <span v-if="product.shopping > 0">{{ product.shopping }}</span>
            <el-icon @click="handleShopping(product, 1)">
              <CirclePlusFilled style="width: 1.5em; height: 1.5em; margin-left: 3px;" />
            </el-icon>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="shopping-cart__footer">
          <div></div>
          <!-- <el-button @click="cancelClick">cancel</el-button> -->
          <div class="confirm-button" @click="handleOrder">确认下单</div>
        </div>
      </template>
    </el-drawer>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick, computed } from "vue";
import { getMenuProducts, getStore, createOrder } from "@/api";
import Scroller from "@/utils/scroller.js";
import { clone, mix } from "@/utils/";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import $cookie from "@/utils/cookie";
import { useWxAuth } from '@/hooks';

export default defineComponent({
  setup() {
    useWxAuth();

    const route = useRoute();
    const store = useStore();
    const storeId = route.query.storeId || $cookie.get('storeId');
    const deskNo = route.query.deskNo || $cookie.get('deskNo');

    if (storeId) $cookie.set('storeId', storeId);
    if (deskNo) $cookie.set('deskNo', deskNo);

    const userInfo = computed(() => store.state.user.info)
    const storeInfo = reactive({
      deskNo,
    });

    const categories = reactive({
      map: {},
      list: [],
    });

    const refCategories = ref(null);
    const refMenuList = ref(null);

    const activeCategory = ref(null);

    const _scroller = ref(null);

    const handleSwitchCategory = function (idx, flag) {
      activeCategory.value.active = false;
      categories.list[idx].active = true;
      activeCategory.value = categories.list[idx];
      if (!flag) _scroller.value.scrollTo(refCategories.value[idx].offsetTop);
    };

    const shoppingCart = computed(() => store.state.shoppingCart.cart);

    const shoppingCount = computed(() => {
      const shoppingCartProducts = Object.values(shoppingCart.value)
        return shoppingCartProducts.length > 0 ? shoppingCartProducts
        .map((p) => p.shopping)
        .reduce((a, b) => {
          return a + b;
        }) : 0;
    })

    const handleShopping = function (product, n) {
      product.shopping = product.shopping + n;

      const shoppingCartProducts = shoppingCart.value;
      if (product.shopping > 0) {
        if (!shoppingCartProducts[product.id]) {
          shoppingCartProducts[product.id] = product;
        }
      } else {
        if (shoppingCartProducts[product.id]) {
          delete shoppingCartProducts[product.id];
        }
      }

      store.dispatch('changeCart', shoppingCartProducts)
      // console.log(shoppingCartProducts);
    };

    const drawer = ref(false);
    const handleOpenShoppingCart = function () {
      drawer.value = true;
    };

    const handleOrder = function () {
          console.log(shoppingCart) 
      if (shoppingCount.value > 0) {
        // if (userInfo.value.openid) {
          console.log(shoppingCart)
          const shoppingCartProducts = Object.values(shoppingCart.value)
          const detail = shoppingCartProducts.map((p) => {
            return {
              id: p.id,
              product_id: p.id,
              name: p.detail.name,
              shopping: p.shopping
            }
          })

          let price = 0;
          shoppingCartProducts.forEach((p) => {
            price += p.shopping * p.price
          })

          console.log({
            open_id: userInfo.value.openid,
            desk_no: deskNo,
            detail: JSON.stringify(detail),
            price,
            count: shoppingCount.value
          })
          // createOrder({
          //   open_id: userInfo.value.openid,
          //   detail: JSON.stringify(detail),
          //   price
          // })
        // } else {

        // }
      }
    }

    const init = function () {
      const categoriesPositions = refCategories.value
        .map((c) => c.offsetTop)
        .sort((a, b) => b - a);

      _scroller.value = new Scroller({
        container: refMenuList.value,
      });

      _scroller.value.setOnScroll(function () {
        let scrollTop = refMenuList.value.scrollTop;

        const idx = categoriesPositions.findIndex((p) => scrollTop >= p);

        handleSwitchCategory(categoriesPositions.length - 1 - idx, true);
      }); 
    };

    const auth = function () {
      if (userInfo.value.openid) return
      const _herf = encodeURI('http://www.zhangzhenkai.com/ordering/mobile/auth');
      location.href = `http://wx.zhangzhenkai.com/getCode?returnUri=${ _herf }`;
    };

    onMounted(() => {
      getMenuProducts().then((res) => {
        res.data.rows.forEach((row) => {
          // const product = clone(row)
          row.shopping = 0;
          const categoryId = row.detail.category.id;
          categories.map[categoryId] = categories.map[categoryId]
            ? categories.map[categoryId]
            : {
                id: categoryId,
                name: row.detail.category.name,
                products: [],
                active: false,
              };
          categories.map[categoryId].products.push(row);
        });

        categories.list = Object.values(categories.map);

        categories.list[0].active = true;

        activeCategory.value = categories.list[0];

        nextTick(() => {
          init();
        });
      });

      getStore({ id: storeId }).then((res) => {
        if (res.success) {
          mix(storeInfo, res.data);
        }
      });
    });

    return {
      userInfo,
      storeInfo,
      categories,
      shoppingCart,
      shoppingCount,

      drawer,

      handleSwitchCategory,
      handleShopping,
      handleOpenShoppingCart,
      handleOrder,

      auth,

      refCategories,
      refMenuList,
    };
  },
});
</script>

<style lang="scss">
</style>