const express = require("express");
const app = express();
//environment variable configurations
const CONFIG = require("./CONFIG/env.CONFIG");

//parse the for request body for infomation
app.use(express.urlencoded({extended: true}));
//for test env like postman
app.use(express.json());
// set the view engine to ejs
app.set('view engine', 'ejs');


// Define the endpoint for the getCategoryDetails API
app.use('/api/categories', require("./routes/category"));

//TESTING AREA
const ebayObj = require("./CONFIG/ebayObj")
const eBayApi = require('ebay-api')
app.get("/key", async(req, res) =>{
  (async () => {
    const eBay = new eBayApi(ebayObj);
    try {
      const signingKey = await eBay.developer.keyManagement.createSigningKey('ED25519');
      console.log(JSON.stringify(signingKey, null, 2));
    } catch (e) {
      console.error(e);
    }
  })();
})
//

app.listen(CONFIG.port, () => {
  console.log(`Server listening at http://localhost:${CONFIG.port}`);
});

