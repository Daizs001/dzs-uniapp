"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
require("../../api/user.js");
require("../../utils/request.js");
require("../../config/config.js");
require("../../utils/storage.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "my-info",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const { user } = common_vendor.storeToRefs(userStore);
    const updateNickname = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/update-nickname"
      });
    };
    let sex = common_vendor.computed(() => {
      if (user.value.sex == "M") {
        return "男";
      } else if (user.value.sex == "F") {
        return "女";
      } else {
        return "保密";
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(user).avatarUrl,
        b: common_vendor.p({
          type: "right",
          color: "gray",
          size: "16"
        }),
        c: common_vendor.t(common_vendor.unref(user).username),
        d: common_vendor.p({
          type: "right",
          color: "gray",
          size: "16"
        }),
        e: common_vendor.t(common_vendor.unref(user).nickname),
        f: common_vendor.p({
          type: "right",
          color: "gray",
          size: "16"
        }),
        g: common_vendor.o(updateNickname),
        h: common_vendor.t(common_vendor.unref(user).level),
        i: common_vendor.p({
          type: "right",
          color: "white",
          size: "16"
        }),
        j: common_vendor.t(common_vendor.unref(sex)),
        k: common_vendor.p({
          type: "right",
          color: "gray",
          size: "16"
        }),
        l: common_vendor.t(common_vendor.unref(user).phone),
        m: common_vendor.p({
          type: "right",
          color: "gray",
          size: "16"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/my/my-info.vue"]]);
wx.createPage(MiniProgramPage);
