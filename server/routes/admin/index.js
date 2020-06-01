module.exports = (app) => {
  const express = require("express");
  const router = express.Router({
    mergeParams: true,
  });
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    // const items = await req.Model.find().populate('parent').limit(10)
    const items = await req.Model.find().setOptions(queryOptions).limit(10);

    res.send(items);
  });
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  app.use(
    "/admin/api/rest/:resource",
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
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

  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  app.post("/admin/api/login", async (req, res) => {
    const { username, password } = req.body;
    // 1.根據用戶找名找用戶
    const AdminUser = require("../../models/AdminUser");
    const user = await AdminUser.findOne({ username }).select("+password");
    if (!user) {
      return res.status(422).send({
        message: "用戶不存在",
      });
    }
    // 2.校驗密碼
    const isValid = require("bcrypt").compareSync(password, user.password);
    if (!isValid) {
      return res.status(422).send({
        message: "密碼錯誤",
      });
    }
    // 3.返回token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: user._id,
      },
      app.get("secret")
    );
    res.send({token})
  });
};
