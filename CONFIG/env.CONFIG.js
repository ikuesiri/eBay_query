require("dotenv").config();

const  CONFIG =  {

    port: process.env.port,
    client_id: process.env.client_id,
    client_secret: process.env.client_secret,
    redirect_uri: process.env.redirect_uri,
    auth_endpoint : process.env.auth_endpoint


}

module.exports = CONFIG;