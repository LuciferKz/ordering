const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class OrderController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { name, category_id, limit, offset } = ctx.query;
    const { Op } = this.app.Sequelize;
    const where = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (category_id) {
      where.category_id = category_id;
    }
    const query = {};

    const orders = await ctx.model.Order.findAndCountAll(query);
    ctx.body = message.success("获取餐品列表成功", orders);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Order.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const order = await ctx.model.Order.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = message.success("新建餐品成功", { data: order });
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = OrderController;
