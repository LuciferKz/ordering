"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const { STRING, INTEGER, DATE } = Sequelize;
    await queryInterface.createTable("menu_products", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      store_id: INTEGER,
      price: INTEGER,
      stock: INTEGER,
      soldout: INTEGER,
      scales: STRING(200),
      on_shelf: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
