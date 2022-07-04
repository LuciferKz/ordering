const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ProductController extends Controller {
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
    const query = {
      include: [
        {
          model: ctx.model.Category,
          attributes: ["name"],
          as: "category",
        },
      ],
      limit: toInt(limit),
      offset: toInt(offset),
      where,
    };

    const products = await ctx.model.Product.findAndCountAll(query);
    ctx.body = message.success("获取餐品列表成功", products);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Product.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;

    // ctx.validate(createRule, ctx.request.body);
    // const { name, password } = ctx.request.body;

    const product = await ctx.model.Product.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = message.success("新建餐品成功", { data: product });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const product = await ctx.model.Product.findByPk(id);
    if (!product) {
      ctx.status = 404;
      ctx.body = message.warning("餐品不存在");
      return;
    }
    // const { name, age } = ctx.request.body;
    await product.update(ctx.request.body);
    ctx.body = message.success("更新餐品成功", { data: product });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const product = await ctx.model.Product.findByPk(id);
    if (!product) {
      ctx.status = 404;
      return;
    }

    await product.destroy();
    ctx.status = 200;
    ctx.body = message.success("删除餐品成功");
  }
}

module.exports = ProductController;
