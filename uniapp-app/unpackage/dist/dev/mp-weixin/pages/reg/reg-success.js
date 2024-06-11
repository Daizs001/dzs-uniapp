"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "reg-success",
  setup(__props) {
    const toLogin = () => {
      common_vendor.index.reLaunch({
        url: "/pages/login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/reg/reg-success.vue"]]);
wx.createPage(MiniProgramPage);
