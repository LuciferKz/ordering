const jwt = require("jwt-simple");
const crypto = require("crypto");
const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");

const secret = "ordering";

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

const createRule = {
  name: { type: "string", required: true },
  password: { type: "string", required: true },
};

class AuthController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async login() {
    const ctx = this.ctx;
    ctx.validate(createRule, ctx.request.body);
    const { name, password } = ctx.request.body;

    let md5 = crypto.createHash("md5");
    let newPwd = md5.update(password).digest("hex");
    const data = await ctx.model.User.findOne({ where: { name } });
    let body = {};
    if (data) {
      if (data.password === newPwd) {
        const expires = 2 * 60 * 60 * 1000;
        body = message.success("登录成功", {
          token: jwt.encode(
            {
              name,
              expires: Date.now() + expires,
            },
            secret
          ),
        });
      } else {
        body = message.warning("密码错误");
      }
    } else {
      body = message.warning("账号不存在");
    }

    ctx.body = body;
    ctx.status = 201;
  }
}

module.exports = AuthController;
