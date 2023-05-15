const CONFIG = require("../CONFIG/env.CONFIG");
const eBayApi = require('ebay-api')
const eBayObj = require("../CONFIG/ebayObj")

const eBay = new eBayApi(eBayObj);
  eBay.OAuth2.setScope([
    'https://api.ebay.com/oauth/api_scope',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly',
    'https://api.ebay.com/oauth/api_scope/sell.fulfillment'
  ]);
  
//   Generate and open Url and Grant Access
  const url = eBay.OAuth2.generateAuthUrl();
//   console.log('Open URL', url);

const getCategoryId = async(req, res) =>{
    const category_name =  req.params.category_name
    if(!category_name || category_name.length == 0){
        res.status(404).res.json({
            success: false,
            message: "Please Enter a Category/Product Name"
        })
    }
   
    const eBay = new eBayApi(eBayObj);
    eBay.buy.browse.search({
        q: category_name,
        limit: 50
      })
        .then(result => {
        //   res.send(result, null, 2);
        const categoryId = result.itemSummaries[0].categories[0].categoryId;
        const categoryName = result.itemSummaries[0].categories[0].categoryName;
        const searchSummary = result.itemSummaries
            // searchSummary.forEach((value) =>{
            //     searchResult.push(value);
            // })

          res.send(result, null, 2);
        })
        .catch(e => {
          console.log(e);
        });
}

module.exports = getCategoryId;
