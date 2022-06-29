("use strict");

module.exports = (app) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Brand = app.model.define("brand", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Brand;
};
