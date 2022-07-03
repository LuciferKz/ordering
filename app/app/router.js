"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.resources("user", "/api/v1/user", controller.user);

  router.post("/api/v1/store/qrcode/:id", controller.store.qrcode);
  router.resources("store", "/api/v1/store", controller.store);

  router.get("/api/v1/auth", controller.auth.index);
  router.post("/api/v1/auth/login", controller.auth.login);
};
