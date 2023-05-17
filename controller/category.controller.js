const CONFIG = require("../CONFIG/env.CONFIG");
const eBayApi = require('ebay-api')
const eBayObj = require("../CONFIG/ebayObj")

const eBay = new eBayApi(eBayObj);


const getSuggestedCategories =(req, res) =>{
    const category_name =  req.params.categoryName
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

          // return res.status(200).send(result);
        })
        .catch(error => {
          console.log(error);
        });
}



const getCategoryDetails = (req, res) => {
  const categoryId =  req.params.categoryId
  if(!categoryId || categoryId.length === 0){
      return  res.status(404).send({
          success: false,
          message: "Please Enter a Category/Product Name"
      })
  }
 
  const eBay = new eBayApi(eBayObj);
  eBay.buy.browse.search({
      q: categoryId,
      limit: 5
    })
      .then(result => {
        const itemCategories= result.itemSummaries;  
        const itemList = []
        
        const items = itemCategories.map( item => ({
          itemId: item.itemId, 
           title: item.title 
        }));
        itemList.push(items);
        // itemList.forEach((item)=>{
        //   // if(list.categoryName !== category_name){
        //     res.write(`<hr>`)
        //     res.write(`<p>itemId: ${item.itemId}</p>`);
        //     res.write(`<p>title: ${item.title}</p>`); 
        //   // }                      
        // });
        
        res.status(200).send(itemList);
      })
      .catch(error => {
        console.log(error);
      });
}



const getItemSpecifics = (req, res) => {
  const itemId = req.params.get_item
  eBay.marketplaceId = eBayApi.MarketplaceId.EBAY_US; //USA marketplace
  //  eBay.shopping.GetSingleItem({
  //       ItemID: itemId,
  //       IncludeSelector: 'Details'
  //     }).then(result => {
  //       res.send(result, null, 2);
  //     }).catch(e => {
  //       console.error(e);
  //     });

  
  eBay.buy.browse.api({
  }).getItem(itemId).then((item) => {

    const categoryId = item.categoryId
    const title = item.title;
    const price = item.price.value
    const condition = item.condition
    const itemSpecifics = item.localizedAspects;
    
    res.write(`<p><b>CategoryID</b> : ${categoryId}</p>`);

    res.write(`<p><b>Price</b> : <b>$</b>${price}</p>`);
    res.write(`<p><b>title</b> : ${title}</p>`);
    res.write(`<p><b>Condition</b> : ${condition}</p>`);
    res.write(`<hr>`)
    res.write(`<p><b>ITEM SPECIFICS </b></p>`)
    itemSpecifics.forEach(spec =>{
        res.write(`<p><b>${spec.name}</b> : ${spec.value}</p>`)
    })

    return res.send();



    return res.send(item);
  })
 .catch((error) => console.error(error));
 
}

module.exports = {
  getSuggestedCategories,
  getCategoryDetails,
  getItemSpecifics
};
