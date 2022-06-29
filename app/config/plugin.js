"use strict";

exports.validate = {
  enable: true,
  package: "egg-validate",
};

exports.sequelize = {
  enable: true,
  package: "egg-sequelize",
};

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
};
