const express = require("express");
const app = express();
const Ebay = require("ebay-node-api");
//environment variable configurations
const CONFIG = require("./CONFIG/env.CONFIG");

//parse the for request body for infomation
app.use(express.urlencoded({extended: true}));
//for test env like postman
app.use(express.json());
// set the view engine to ejs
app.set('view engine', 'ejs');


const ebay = new Ebay({
  clientID: CONFIG.client_id,
  clientSecret: CONFIG.client_secret,
  body:{
    grant_type: 'client_credentials',
    scope: 'https://api.ebay.com/oauth/api_scope',
    redirectURI: CONFIG.redirect_uri,
  },
  headers:{ 
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US'
    },
    authType: "oauth",
    env: 'PRODUCTION',
});

//Generates the access token
// ebay.getAccessToken().then((data) => {
//   ebay.access_token = data.access_token;
// }).catch((error) => {
//   console.error(error);
//   res.send('Error fetching access token.');
// });



// this redirects the user to login
app.get('/auth/login', (req, res) => {
  const authUrl =`${CONFIG.auth_endpoint}?client_id=${CONFIG.client_id}&response_type=code&redirect_uri=${CONFIG.redirect_uri}&scope=https://api.ebay.com/oauth/api_scope`;
  res.redirect(authUrl);
});

//Route to search for category ID
app.use("/api/category" , require("./routes/category"));



app.get("/callback", (req, res)=>{

})



app.listen(CONFIG.port, () => {
  console.log(`Server listening at http://localhost:${CONFIG.port}`);
});

