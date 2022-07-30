/* eslint valid-jsdoc: "off" */
// mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `ordering`;'
// mysql -u root -e 'CREATE DATABASE IF NOT EXISTS `ordering_test`;'

"use strict";

// exports.sequelize = {
//   username: "threeqone",
//   password: "threeqone@1024",
//   dialect: "mysql",
//   host: "120.55.55.34",
//   port: 3306,
//   database: "ordering",
// };

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1655786563956_9833";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  config.errorHandler = {
    match: "/api",
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"],
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.sequelize = {
    username: "threeqone",
    password: "threeqone1024",
    dialect: "mysql",
    host: "120.55.55.34",
    port: 3306,
    database: "ordering",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
