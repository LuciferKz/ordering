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
    await queryInterface.createTable("stores", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30), // 门店名称
      brand_id: INTEGER, // 所属品牌
      status: INTEGER, // 是否开启门店
      opening_time: STRING(30), // 营业时间
      table_count: INTEGER, // 桌总数
      open_mobile_ordering: INTEGER, // 是否开启手机点餐
      menu_display_mode: INTEGER, // 菜单展示模式
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
