"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "publish-success",
  setup(__props) {
    const toIndex = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const toPublish = () => {
      common_vendor.index.reLaunch({
        url: "/pages/article/publish"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toIndex),
        b: common_vendor.o(toPublish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/article/publish-success.vue"]]);
wx.createPage(MiniProgramPage);
