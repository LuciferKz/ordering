const Controller = require("egg").Controller;
const message = require("../public/javascripts/message");
const QRCode = require("qrcode");
const archiver = require("archiver");
const fs = require("fs");
const { arch } = require("os");

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

function getQRCode(store, archive) {
  return new Promise(async (resolve, reject) => {
    let table_count = store.table_count;

    const zipStream = fs.createWriteStream("./tmp/qrcode.zip");

    archive.pipe(zipStream);
    archive.on("finish", (result) => {
      resolve(archive);
    });

    while (table_count > 0) {
      table_count--;
      const imgData = await QRCode.toDataURL(
        `http://127.0.0.1:7001/mobile-ordering/${store.id}/${table_count}`
      );
      var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
      var dataBuffer = Buffer.from(base64Data, "base64");
      // console.log(dataBuffer);
      archive.append(dataBuffer, { name: `${table_count}.png` });
    }

    archive.finalize();
  });
}

// const createRule = {
//   name: { type: "string", required: true },
//   password: { type: "string", required: true },
// };

class StoreController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: toInt(ctx.query.limit),
      offset: toInt(ctx.query.offset),
    };
    const stores = await ctx.model.Store.findAndCountAll(query);
    ctx.body = message.success("获取门店列表成功", stores);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Store.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;

    // ctx.validate(createRule, ctx.request.body);
    // const { name, password } = ctx.request.body;

    const store = await ctx.model.Store.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = message.success("新建门店成功", { data: store });
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const store = await ctx.model.Store.findByPk(id);
    if (!store) {
      ctx.status = 404;
      ctx.body = message.warning("门店不存在");
      return;
    }
    // const { name, age } = ctx.request.body;
    await store.update(ctx.request.body);
    ctx.body = message.success("更新门店成功", { data: store });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const store = await ctx.model.Store.findByPk(id);
    if (!store) {
      ctx.status = 404;
      return;
    }

    await store.destroy();
    ctx.status = 200;
    ctx.body = message.success("删除门店成功");
  }

  async qrcode() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const store = await ctx.model.Store.findByPk(id);
    if (store) {
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      let table_count = store.table_count;

      while (table_count > 0) {
        table_count--;
        const imgData = await QRCode.toDataURL(
          `http://127.0.0.1:7001/mobile-ordering/${store.id}/${table_count}`
        );
        var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = Buffer.from(base64Data, "base64");
        archive.append(dataBuffer, { name: `${table_count}.png` });
      }

      archive.finalize();
      ctx.body = archive;
    } else {
      ctx.body = success.warning("找不到门店", { id });
    }
  }
}

module.exports = StoreController;
