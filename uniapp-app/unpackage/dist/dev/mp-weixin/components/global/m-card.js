"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "m-card",
  props: ["localdata"],
  setup(__props) {
    const props = __props;
    const { localdata } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(localdata).avatar,
        b: common_vendor.t(common_vendor.unref(localdata).authorName),
        c: common_vendor.t(common_vendor.unref(localdata).title),
        d: common_vendor.t(common_vendor.unref(localdata).fcd),
        e: common_vendor.t(common_vendor.unref(localdata).viewsCount),
        f: common_vendor.t(common_vendor.unref(localdata).likesCount),
        g: common_vendor.t(common_vendor.unref(localdata).favoritesCount)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/components/global/m-card.vue"]]);
wx.createComponent(Component);
