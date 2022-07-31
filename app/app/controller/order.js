const Controller = require("egg").Controller;
const order = require("../model/order");
const message = require("../public/javascripts/message");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class OrderController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { openId, limit, offset } = ctx.query;
    const { Op } = this.app.Sequelize;
    const where = {};
    if (openId) {
      where.open_id = { [Op.like]: `%${openId}%` };
    }
    
    const query = {};
    const orders = await ctx.model.Order.findAndCountAll(query);
    const statusAlias = { 1: '订单已完成', 2: '订单制作中', 3: '订单已支付', 4: '订单待支付' }
    orders.rows.forEach((order) => {
      order.statusAlias = statusAlias[order.status]
    })
    ctx.body = message.success("获取订单列表成功", orders);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Order.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const order = await ctx.model.Order.create(ctx.request.body);
    // 1: 订单已完成 2: 订单制作中 3: 订单已支付 4: 订单待支付
    order.status = 4;
    ctx.status = 201;
    ctx.body = message.success("下单成功", order);
  }

  async update() {
  }

  async destroy() {
  }
}

module.exports = OrderController;
