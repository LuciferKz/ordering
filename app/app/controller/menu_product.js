const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MenuProductController extends Controller {
  async index() {
    const ctx = this.ctx;
    const { name, store_id, limit, offset } = ctx.query;
    const { Op } = this.app.Sequelize;
    const where = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (store_id) {
      where.store_id = store_id;
    }
    const query = {
      include: [
        {
          model: ctx.model.Store,
          attributes: ["name"],
        },
        {
          model: ctx.model.Product,
          attributes: ["name", "price", "intro"],
          as: "detail",

          include: [
            {
              model: ctx.model.Category,
              attributes: ["id", "name"],
              as: "category",
            },
          ],
        },
      ],
      limit: toInt(limit),
      offset: toInt(offset),
      where,
    };

    const menuProducts = await ctx.model.MenuProduct.findAndCountAll(query);
    ctx.body = message.success("获取餐品列表成功", menuProducts);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.MenuProduct.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;

    // ctx.validate(createRule, ctx.request.body);
    // const { name, password } = ctx.request.body;

    const menuProduct = await ctx.model.MenuProduct.bulkCreate(
      ctx.request.body
    );
    ctx.status = 201;
    ctx.body = message.success("上架餐品成功", { data: menuProduct });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menuProduct = await ctx.model.MenuProduct.findByPk(id);
    if (!menuProduct) {
      ctx.status = 404;
      ctx.body = message.warning("餐品不存在");
      return;
    }
    // const { name, age } = ctx.request.body;
    await menuProduct.update(ctx.request.body);
    ctx.body = message.success("更新餐品成功", { data: menuProduct });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const menuProduct = await ctx.model.MenuProduct.findByPk(id);
    if (!menuProduct) {
      ctx.status = 404;
      return;
    }

    await menuProduct.destroy();
    ctx.status = 200;
    ctx.body = message.success("下架餐品成功");
  }
}

module.exports = MenuProductController;
