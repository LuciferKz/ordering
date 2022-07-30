"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.resources("user", "/api/v1/user", controller.user);
  router.resources("store", "/api/v1/store", controller.store);
  router.resources("category", "/api/v1/category", controller.category);
  router.resources("product", "/api/v1/product", controller.product);
  router.resources("order", "/api/v1/order", controller.order);
  router.resources(
    "menu-product",
    "/api/v1/menu-product",
    controller.menuProduct
  );

  router.get("/api/v1/auth", controller.auth.index);
  router.post("/api/v1/auth/login", controller.auth.login);
  router.post("/api/v1/store/qrcode/:id", controller.store.qrcode);
};
