const CONFIG = require("./env.CONFIG")

const eBayObj = {
    appId: CONFIG.client_id,
    certId: CONFIG.client_secret,
    sandbox: false,
    ruName: CONFIG.redirect_uri,
  };

  module.exports = eBayObj;