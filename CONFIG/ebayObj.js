const CONFIG = require("./env.CONFIG")

const eBayObj = {
    appId: CONFIG.client_id,
    certId: CONFIG.client_secret,
    devId: CONFIG.devId,
    sandbox: false,
    
    ruName: CONFIG.redirect_uri,
  };

  module.exports = eBayObj;