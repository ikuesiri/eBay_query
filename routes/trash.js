const express = require("express");
const Ebay = require("ebay-node-api");
const categoryRouter = express.Router();
//environment variable configurations
const CONFIG = require("../CONFIG/env.CONFIG");


const ebay = new Ebay({
    clientID: CONFIG.client_id,
    clientSecret: CONFIG.client_secret,
    body:{
      grant_type: 'client_credentials',
      scope: 'https://api.ebay.com/oauth/api_scope',
      redirectURI: CONFIG.redirect_uri,
    },
    headers:{ 
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
      },
      authType: "oauth",
      env: 'PRODUCTION',
  });
  
  //Generates the access token
  ebay.getAccessToken().then((data) => {
    ebay.access_token = data.access_token;
  }).catch((error) => {
    console.error(error);
    res.send('Error fetching access token.');
  });



let categoryName;
let categoryId;
let searchResult =[];
// let itemsFoundCount;


categoryRouter.get("/", (req, res) =>{
  res.render("categories", {
    categoryId
  })
})




// make the API call to get the category ID
categoryRouter.post("/",(req, res) => {
  // stores the category name entered by the user and saves in a variable "category_Name"
  const category_Name = req.body.name;

  //this ebay api's search method can search for information by keywords and return values. Here I used it to query  and get the category's full name as well as the categoryID of that category.
    ebay.findItemsByKeywords(category_Name)
    .then((data) =>{
      categoryId = data[0].searchResult[0].item[0].primaryCategory[0].categoryId;
      
      categoryName = data[0].searchResult[0].item[0].primaryCategory[0].categoryName;
    //   const searchObj = data[0].searchResult[0];

    //   for (const item of searchObj.item ){
    //     searchResult.push({

    //          displayImage : item.galleryURL[0],
    //          itemId: item.itemId[0], 
    //          title: item.title[0], 
    //          location: item.location[0], 
    //          country: item.country[0], 
    //          price: `$${item.sellingStatus[0].convertedCurrentPrice[0].__value__}`
    //     })
    //   }
      
      // res.send(searchResult)
      res.status(200).redirect("/category");

    })
    .catch(error =>{
      console.error(error);
      res.status(500).send('Error retrieving categoryID');
    })

  });


  categoryRouter.get("/categoryid/:id", (req, res) =>{
    const categoryId = req.params.id

    const ebay = new Ebay({
        clientID: CONFIG.client_id,
        clientSecret: CONFIG.client_secret,
        body:{
          grant_type: 'client_credentials',
          scope: 'https://api.ebay.com/oauth/api_scope',
          redirectURI: CONFIG.redirect_uri,
        },
        headers:{ 
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
          },
          authType: "oauth",
          env: 'PRODUCTION',
      });

      
      ebay.getAccessToken()
      .then((data) => {
          ebay.searchItems({
            categoryId: categoryId,
            limit: 20
        }).then((data) => {
          const result = JSON.parse(data)
          const categoryId = result.itemSummaries[0].categories[0].categoryId;
          const categoryName = result.itemSummaries[0].categories[0].categoryName;
          const searchSummary = result.itemSummaries
            searchSummary.forEach((value) =>{
                searchResult.push(value);
            })
        })
}).then(() =>{
    res.render("catResult", {
        categoryName,
        categoryId,
        searchResult
})
})
        
       
})

  module.exports = categoryRouter;