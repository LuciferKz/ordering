const success = function (msg, data) {
  return { code: 200, message: msg || "请求成功", data, success: true };
};

const warning = function (msg) {
  return { code: 201, message: msg, success: false };
};

const error = function (msg, error) {
  return {
    code: 202,
    message: msg || "请求失败",
    error: error + "",
    success: false,
  };
};

module.exports = {
  success,
  warning,
  error,
};
