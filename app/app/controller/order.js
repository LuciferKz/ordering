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
    const { openId, limit = 10, offset = 0 } = ctx.query;
    const { Op } = this.app.Sequelize;
    const where = {};
    if (openId) {
      where.open_id = { [Op.like]: `%${openId}%` };
    }
    
    const query = {
      limit,
      offset,
      order: [['created_at', 'DESC']]
    };
    const orders = await ctx.model.Order.findAndCountAll(query);
    ctx.body = message.success("获取订单列表成功", orders);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Order.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    // 1: 订单已完成 2: 订单制作中 3: 订单已支付 4: 订单待支付 5: 订单已取消
    const order = await ctx.model.Order.create({ ...ctx.request.body, status: 4 });
    ctx.status = 201;
    ctx.body = message.success("下单成功", order);
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const order = await ctx.model.Order.findByPk(id);
    if (!order) {
      ctx.status = 404;
      ctx.body = message.warning("订单不存在");
      return;
    }
    await order.update(ctx.request.body);
    ctx.body = message.success("更新订单成功", { data: order });
  }

  async destroy() {
  }
}

module.exports = OrderController;
