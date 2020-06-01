module.exports = (options) => {
  const AdminUser = require("../models/AdminUser");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  return async (req, res, next) => {
    // 登陸較驗middleware
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "請先登錄1");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "請先登錄2");
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "請先登錄3");
    await next();
  };
};
