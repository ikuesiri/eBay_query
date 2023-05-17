// const CONFIG = require("../CONFIG/env.CONFIG");
const eBayApi = require('ebay-api')
const eBayObj = require('../CONFIG/ebayObj')
const eBayObj = require("../CONFIG/ebayObj")


const eBay = new eBayApi(eBayObj);

eBay.siteId =  eBayApi.SiteId.EBAY_US;
// const createItem = async(req, res)=> {
    
// }

// module.exports = {
//     createItem
// }