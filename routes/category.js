const express = require("express");
const categoryRouter = express.Router();
const {getSuggestedCategories, getCategoryDetails , getItemSpecifics} = require("../controller/category.controller");

//method GET "/"
//Provides a list of Suggested categories
categoryRouter.get("/search/:categoryName", getSuggestedCategories);


categoryRouter.get("/search/categoryId/:categoryId", getCategoryDetails )
categoryRouter.get("/search/itemId/:get_item", getItemSpecifics);

module.exports = categoryRouter;

// eBay.shopping.GetSingleItem({
//     ItemID: '255734197431',
//     IncludeSelector: 'Details'
//   }).then(result => {
//     console.log(JSON.stringify(result, null, 2));
//   }).catch(e => {
//     console.error(e);
//   });