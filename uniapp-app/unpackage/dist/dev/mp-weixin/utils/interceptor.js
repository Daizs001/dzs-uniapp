"use strict";
const common_vendor = require("../common/vendor.js");
const utils_storage = require("./storage.js");
common_vendor.index.addInterceptor("request", {
  invoke(args) {
    args.header = {
      "Authorization": utils_storage.storage.getStorageToken()
    };
  }
});
