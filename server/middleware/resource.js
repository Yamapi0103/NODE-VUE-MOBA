module.exports = (options) => {
  return async (req, res, next) => {
    const modelName = require("inflection").classify(req.params.resource); // classify 可將複數轉單數
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
