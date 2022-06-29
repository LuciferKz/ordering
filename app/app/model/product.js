("use strict");

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Product = app.model.define("product", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    intro: STRING(30),
    price: INTEGER,
    stock: INTEGER,
    category_id: INTEGER,
    soldout: INTEGER,
    scales: STRING(200),
    on_shelf: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return Product;
};
