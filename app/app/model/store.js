("use strict");

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Store = app.model.define("store", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30), // 门店名称
    brand_id: INTEGER, // 所属品牌
    status: INTEGER, // 是否开启门店
    opening_time: String(30), // 营业时间
    table_count: INTEGER, // 桌总数
    open_moible_ordering: INTEGER, // 是否开启手机点餐
    menu_display_mode: INTEGER, // 菜单展示模式
    // menu_display_mode_name: STRING(100), // 菜单展示模式名称
    created_at: DATE,
    updated_at: DATE,
  });

  return Store;
};
