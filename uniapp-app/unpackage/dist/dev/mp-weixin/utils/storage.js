"use strict";
const common_vendor = require("../common/vendor.js");
const tokenKey = "Authorization";
const storage = {
  setStorageToken(token) {
    common_vendor.index.setStorageSync(tokenKey, "Bearer " + token);
  },
  getStorageToken() {
    return common_vendor.index.getStorageSync(tokenKey);
  },
  removeStorageToken() {
    common_vendor.index.removeStorageSync(tokenKey);
  }
};
exports.storage = storage;
