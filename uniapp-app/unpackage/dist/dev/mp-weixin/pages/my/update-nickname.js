"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const api_user = require("../../api/user.js");
require("../../utils/storage.js");
require("../../utils/request.js");
require("../../config/config.js");
const _sfc_main = {
  __name: "update-nickname",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const nickname = common_vendor.ref("");
    nickname.value = userStore.user.nickname;
    const isDisable = common_vendor.ref(true);
    common_vendor.watch(nickname, (value) => {
      if (value == userStore.user.nickname || value.length == 0) {
        isDisable.value = true;
      } else {
        isDisable.value = false;
      }
    });
    const updateNickname = async () => {
      let updateRes = await api_user.userApi.updateNickname(userStore.user.id, nickname.value);
      userStore.refresh(updateRes.data.token, updateRes.data.user);
      common_vendor.index.showToast({
        title: "昵称已更新"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: nickname.value,
        b: common_vendor.o(($event) => nickname.value = $event.detail.value),
        c: common_vendor.o(updateNickname),
        d: isDisable.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/my/update-nickname.vue"]]);
wx.createPage(MiniProgramPage);
