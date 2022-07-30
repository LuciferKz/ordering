("use strict");

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Order = app.model.define("order", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    price: INTEGER,
    status: INTEGER,
    detail: STRING(300),
    open_id: STRING(60),
    created_at: DATE,
    updated_at: DATE,
  });

  return Order;
};
