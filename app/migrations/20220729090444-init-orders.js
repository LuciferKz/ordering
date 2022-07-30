'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable("orders", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      price: INTEGER,
      status: INTEGER,
      detail: STRING(300),
      open_id: STRING(60),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
