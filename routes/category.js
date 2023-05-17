const express = require("express");
const categoryRouter = express.Router();
const {getSuggestedCategories, getCategoryDetails } = require("../controller/category.controller");

//method GET "/"
//Provides a list of Suggested categories
categoryRouter.get("/", getSuggestedCategories);

categoryRouter.get("/search", getCategoryDetails )


module.exports = categoryRouter;