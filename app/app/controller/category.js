const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CategoryController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      where: ctx.params,
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    const categories = await ctx.model.Category.findAndCountAll(query);
    ctx.body = message.success("获取类别列表成功", categories);
  }

  async create() {
    const ctx = this.ctx;
    const category = await ctx.model.Category.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = message.success("新建类别成功", { data: category });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const category = await ctx.model.Category.findByPk(id);
    if (!category) {
      ctx.status = 404;
      ctx.body = message.warning("类别不存在");
      return;
    }
    // const { name, age } = ctx.request.body;
    await category.update(ctx.request.body);
    ctx.body = message.success("更新类别成功", { data: category });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const category = await ctx.model.Category.findByPk(id);
    if (!category) {
      ctx.status = 404;
      return;
    }

    await category.destroy();
    ctx.status = 200;
    ctx.body = message.success("删除类别成功");
  }
}

module.exports = CategoryController;
