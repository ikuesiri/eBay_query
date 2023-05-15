const express = require("express");
const categoryRouter = express.Router();
const getCategoryId  = require("../controller/category.controller");

categoryRouter.get("/:category_name", getCategoryId);

module.exports = categoryRouter;