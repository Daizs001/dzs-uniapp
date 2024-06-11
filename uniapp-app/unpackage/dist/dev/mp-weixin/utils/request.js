"use strict";
const common_vendor = require("../common/vendor.js");
const config_config = require("../config/config.js");
const request = (option) => {
  return new Promise((resolve, reject) => {
    if (option.params) {
      let res = "";
      for (let key in option.params) {
        res += key + "=" + option.params[key] + "&";
      }
      option.url = option.url + "?" + res.substring(0, res.length - 1);
    }
    common_vendor.index.request({
      url: config_config.config.apiBaseUrl + option.url,
      data: option.data || {},
      header: option.header || {},
      method: option.method || "GET",
      success: (res) => {
        var _a;
        if (res.data.code == 2e4) {
          resolve(res.data);
        } else {
          console.log("-----> 操作失败：", res.data);
          let errInfo = ((_a = res.data) == null ? void 0 : _a.message) || "未知错误";
          common_vendor.index.showToast({
            icon: "none",
            title: errInfo,
            duration: 3e3
          });
        }
      },
      fail: (err) => {
        let errorInfo = "";
        if (err.errMsg.includes("timeout")) {
          errorInfo = "请求超时，请稍后重试";
        } else if (err.errMsg.includes("abort")) {
          errorInfo = "请求数据错误，请稍后重试";
        } else {
          errorInfo = "网络请求错误";
        }
        common_vendor.index.showToast({
          title: errorInfo,
          duration: 5e3,
          icon: "none"
        });
        reject(new Error(errorInfo));
      }
    });
  });
};
exports.request = request;
