"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
require("./utils/interceptor.js");
const utils_storage = require("./utils/storage.js");
const stores_user = require("./stores/user.js");
require("./api/user.js");
require("./utils/request.js");
require("./config/config.js");
if (!Math) {
  "./pages/login.js";
  "./pages/article/publish.js";
  "./pages/reg/reg-success.js";
  "./pages/reg/reg.js";
  "./pages/index/index.js";
  "./pages/my/my.js";
  "./pages/article/publish-success.js";
  "./pages/article/article.js";
  "./pages/article/favorite-list.js";
  "./pages/article/my-publish.js";
  "./pages/my/my-info.js";
  "./pages/my/update-nickname.js";
}
const _sfc_main = {
  onLaunch: async function() {
    let token = utils_storage.storage.getStorageToken();
    if (token) {
      let userStore = stores_user.useUserStore();
      await userStore.getUserInfo(token);
      common_vendor.index.showToast({
        title: "自动登录成功"
      });
      setTimeout(function() {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 0);
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
