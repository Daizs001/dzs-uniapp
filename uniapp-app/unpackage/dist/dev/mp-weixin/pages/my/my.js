"use strict";
const common_vendor = require("../../common/vendor.js");
const api_file = require("../../api/file.js");
const api_user = require("../../api/user.js");
const api_article = require("../../api/article.js");
const stores_user = require("../../stores/user.js");
require("../../config/config.js");
require("../../utils/request.js");
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
  __name: "my",
  setup(__props) {
    const logout = () => {
      common_vendor.index.showModal({
        title: "注销",
        content: "您确定退出登录？",
        success: function(res) {
          if (res.confirm) {
            userStore.logout().then((logoutRes) => {
              common_vendor.index.reLaunch({
                url: "/pages/login"
              });
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    const toMyInfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/my-info"
      });
    };
    const toMyPublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/article/my-publish?authorId=" + user.value.id
      });
    };
    const toFavoriteList = () => {
      common_vendor.index.navigateTo({
        url: "/pages/article/favorite-list?userId=" + user.value.id
      });
    };
    const updateAvatar = async (e) => {
      let res = await api_file.fileApi.uploadFile(e.detail.avatarUrl);
      let updateRes = await api_user.userApi.updateUserAvatar(user.value.id, res.data.fileName);
      userStore.refresh(updateRes.data.token, updateRes.data.user);
      common_vendor.index.showToast({
        title: "头像已更新"
      });
    };
    const userAchieve = common_vendor.ref({});
    common_vendor.onShow(async () => {
      let res = await api_article.articleApi.getUserAchieve(user.value.id);
      userAchieve.value = res.data;
    });
    const userStore = stores_user.useUserStore();
    const { user } = common_vendor.storeToRefs(userStore);
    const safeTop = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      let { safeArea } = common_vendor.index.getSystemInfoSync();
      safeTop.value = safeArea.top;
    });
    return (_ctx, _cache) => {
      return {
        a: safeTop.value + "px",
        b: common_vendor.unref(user).avatarUrl,
        c: common_vendor.o(updateAvatar),
        d: common_vendor.t(common_vendor.unref(user).nickname),
        e: common_vendor.t(common_vendor.unref(user).level),
        f: common_vendor.p({
          type: "gear",
          size: "32",
          color: "white"
        }),
        g: common_vendor.o(toMyInfo),
        h: common_vendor.t(userAchieve.value.userFansCount),
        i: common_vendor.t(userAchieve.value.userFollowsCount),
        j: common_vendor.t(userAchieve.value.userGetLikesCount),
        k: common_vendor.t(userAchieve.value.userFavoritesCount),
        l: common_vendor.p({
          type: "flag",
          color: "#404040",
          size: "28"
        }),
        m: common_vendor.p({
          type: "star",
          color: "#404040",
          size: "28"
        }),
        n: common_vendor.o(toFavoriteList),
        o: common_vendor.p({
          type: "hand-up",
          color: "#404040",
          size: "28"
        }),
        p: common_vendor.p({
          type: "bars",
          color: "#404040",
          size: "28"
        }),
        q: common_vendor.o(toMyPublish),
        r: common_vendor.p({
          type: "font",
          color: "#404040",
          size: "28"
        }),
        s: common_vendor.p({
          type: "vip",
          color: "#404040",
          size: "28"
        }),
        t: common_vendor.p({
          type: "auth",
          color: "#404040",
          size: "28"
        }),
        v: common_vendor.p({
          type: "phone",
          color: "#404040",
          size: "28"
        }),
        w: common_vendor.p({
          type: "chatboxes",
          color: "#404040",
          size: "28"
        }),
        x: common_vendor.p({
          type: "locked",
          color: "#404040",
          size: "28"
        }),
        y: common_vendor.p({
          type: "minus",
          color: "#404040",
          size: "28"
        }),
        z: common_vendor.o(logout),
        A: common_vendor.p({
          type: "more-filled",
          color: "#404040",
          size: "28"
        }),
        B: "calc(100vh - " + safeTop.value + "px)"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/my/my.vue"]]);
wx.createPage(MiniProgramPage);
