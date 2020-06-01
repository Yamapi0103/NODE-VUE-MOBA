module.exports = (app) => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser");

  const router = express.Router({
    mergeParams: true,
  });
  // 創建資源
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  // 更新資源
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  // 刪除資源
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  // 資源列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    // const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(10);

    res.send(items);
  });
  // 資源詳情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  const authMiddleware = require("../../middleware/auth");
  // 獲取模型middleware
  const resourceMiddleware = require("../../middleware/resource");
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(),
    resourceMiddleware(),
    router
  );

  const multer = require("multer");
  var path = require("path");
  // const upload = multer({ dest: path.join(__dirname, "/../../uploads") }); // __dirname:文件當前目錄
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "/../../uploads"));
    },
    // 將filename由隨機變數改為originalname(圖片在電腦裡的檔名)
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  var upload = multer({ storage: storage });

  app.post(
    "/admin/api/upload",
    upload.single("file"),
    // authMiddleware(),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 1.根據用戶找名找用戶
    const user = await AdminUser.findOne({ username }).select("+password");
    if (!user) {
      assert(user, 422, "用戶不存在");
    }
    // 2.校驗密碼
    const isValid = require("bcrypt").compareSync(password, user.password);
    if (!isValid) {
      assert(user, 422, "密碼錯誤");
    }
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });

  // 錯誤處理函數
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
