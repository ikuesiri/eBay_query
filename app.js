const express = require("express");
const path =require("path");
const app = express();
//environment variable configurations
const CONFIG = require("./CONFIG/env.CONFIG");

//parse the for request body for infomation
app.use(express.urlencoded({extended: true}));
//for test env like postman
app.use(express.json());
// set the view engine to ejs
app.use(express.static("public"));
// app.set('view engine', 'ejs');


//[API for searching for categoryID ] Define the endpoint for the getCategoryDetails API
app.use('/api/categories', require("./routes/category"));

//[API-B: for creating/updating/deleting]
// app.use("/api/items", require("./routes/items"))

app.listen(CONFIG.port, () => {
  console.log(`Server listening at http://localhost:${CONFIG.port}`);
});

