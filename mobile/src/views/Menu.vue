<template>
  <section class="menu">
    <section class="clubcard">
      <dl>
        <dt class="user-avatar">
          <img
            class="user-avatar__img"
            alt=""
            src="../assets/sh/defaultHeadPic.svg"
          >
        </dt>
        <dd class="store-info">
          <h2
            class="brand-name"
            @click="auth()"
            v-if="!User.memberId"
          >
            <span>登录/领取</span>
            <label
              class="desk-no ng-binding"
              v-if="SysInfo.deskId &amp;&amp; SysInfo.deskId > 0"
            >1号桌</label>
          </h2>
          <p class="store-name">
            <span
              class="ng-binding"
              @click="showStoreModel()"
            >
              请选择门店<el-icon :size="20">
                <Location style="width: 1em; height: 1em; margin-left: 3px; vertical-align: middle;" />
              </el-icon>
            </span>
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
                  <el-icon
                    @click="handleShopping(product, -1)"
                    v-if="product.shopping > 0"
                  >
                    <RemoveFilled style="width: 1em; height: 1em; margin-left: 3px;" />
                  </el-icon>
                  <span v-if="product.shopping > 0">{{ product.shopping }}</span>
                  <el-icon @click="handleShopping(product, 1)">
                    <CirclePlusFilled style="width: 1em; height: 1em; margin-left: 3px;" />
                  </el-icon>
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
      <div class="shopcart">
        <!-- <i class="icon-shopping-cart"></i> -->
        <div class="shopcart__icon">
          <el-icon>
            <ShoppingCart style="width: 1.5em; height: 1.5em; margin-left: 3px;" />
          </el-icon>
        </div>
        <div class="shopcart__badge">
          <em
            class="shopbadge ng-binding"
            id="shopbadge"
          >0</em>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, nextTick } from "vue";
import { getMenuProducts } from "@/api";
import Scroller from "@/utils/scroller.js";
import { clone } from "@/utils/";

export default defineComponent({
  setup() {
    const SysInfo = reactive({
      userInfo: {},
    });

    const User = reactive({});

    const Stores = reactive({
      store: {},
    });

    const isWaterfall = ref(false);
    const hideViewModeAlert = ref(false);

    const auth = function () {};
    const showStoreModel = function () {};

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

    const handleShopping = function (product, n) {
      product.shopping = product.shopping + n;
    };

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
    });

    return {
      SysInfo,
      User,
      Stores,
      isWaterfall,
      hideViewModeAlert,
      categories,

      auth,
      showStoreModel,

      handleSwitchCategory,
      handleShopping,

      refCategories,
      refMenuList,
    };
  },
});
</script>

<style lang="scss">
</style>