const CONFIG = require("../CONFIG/env.CONFIG");
const eBayApi = require('ebay-api')
const eBayObj = require("../CONFIG/ebayObj")

const eBay = new eBayApi(eBayObj);


const getSuggestedCategories = async(req, res) =>{
    const category_name =  req.query.category_name
    if(!category_name || category_name.length === 0){
        return  res.status(404).send({
            success: false,
            message: "Please Enter a Category/Product Name"
        })
    }
   
    const eBay = new eBayApi(eBayObj);
    eBay.buy.browse.search({
        q: category_name,
        limit: 5
      })
    
        .then(result => {
          const itemCategories= result.itemSummaries;
          const uniqueCategories = []

          itemCategories.forEach( listObj => {
            listObj.categories.forEach(category =>{
              const  existingCategories = uniqueCategories.find(value => value.categoryId === category.categoryId);
              if(!existingCategories){
                uniqueCategories.push(category);
              }
            })
          });

          res.write(`<h1>Suggested Categories:</h1>`);
          uniqueCategories.forEach((list)=>{
            if(list.categoryName !== category_name){
              res.write(`<hr>`)
              res.write(`<p>Category Name: ${list.categoryName}</p>`);
              res.write(`<p>Category ID: ${list.categoryId}</p>`); 
            }                      
          });

          return res.status(200).send();
        })
        .catch(error => {
          console.log(error);
        });
}
module.exports = getSuggestedCategories;
