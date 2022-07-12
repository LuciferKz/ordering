("use strict");

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const MenuProduct = app.model.define("menu_product", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    store_id: INTEGER,
    product_id: INTEGER,
    price: INTEGER,
    stock: INTEGER,
    soldout: INTEGER,
    scales: STRING(200),
    on_shelf: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  MenuProduct.associate = function () {
    app.model.MenuProduct.belongsTo(app.model.Product, {
      sourceKey: "id",
      foreignKey: "product_id",
    });
    app.model.MenuProduct.belongsTo(app.model.Store, {
      sourceKey: "id",
      foreignKey: "store_id",
    });
  };
  return MenuProduct;
};
