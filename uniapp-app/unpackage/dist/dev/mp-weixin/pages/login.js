"use strict";
const common_vendor = require("../common/vendor.js");
const api_user = require("../api/user.js");
const stores_user = require("../stores/user.js");
require("../utils/request.js");
require("../config/config.js");
require("../utils/storage.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_icons2)();
}
const _easycom_uni_easyinput = () => "../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const wxlogin = async () => {
      let { code } = await common_vendor.index.login({
        provider: "weixin"
      });
      let res = await api_user.userApi.wxlogin(code);
      await userStore.getUserInfo(res.data);
      common_vendor.index.showToast({
        title: "微信登录成功"
      });
      setTimeout(function() {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }, 1e3);
    };
    const toReg = () => {
      common_vendor.index.navigateTo({
        url: "/pages/reg/reg"
      });
    };
    const userForm = common_vendor.ref({});
    const userFormRef = common_vendor.ref();
    let userStore = stores_user.useUserStore();
    const login = () => {
      userFormRef.value.validate().then(async (res) => {
        let loginRes = await userStore.login(userForm.value.username, userForm.value.password);
        await userStore.getUserInfo(loginRes.data);
        common_vendor.index.showToast({
          title: "登录成功"
        });
        setTimeout(function() {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 1e3);
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    };
    const rules = {
      username: {
        rules: [
          {
            required: true,
            errorMessage: "请输入用户名"
          },
          {
            minLength: 3,
            maxLength: 50,
            errorMessage: "用户长度在 {minLength} 到 {maxLength} 个字符"
          }
        ]
      },
      password: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码"
          },
          {
            minLength: 6,
            maxLength: 20,
            errorMessage: "用户长度在 {minLength} 到 {maxLength} 个字符"
          }
        ]
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => userForm.value.username = $event),
        b: common_vendor.p({
          trim: "all",
          placeholder: "用户名",
          prefixIcon: "person",
          modelValue: userForm.value.username
        }),
        c: common_vendor.p({
          name: "username"
        }),
        d: common_vendor.o(($event) => userForm.value.password = $event),
        e: common_vendor.p({
          trim: "all",
          type: "password",
          placeholder: "密码",
          prefixIcon: "locked",
          modelValue: userForm.value.password
        }),
        f: common_vendor.p({
          name: "password"
        }),
        g: common_vendor.sr(userFormRef, "89cc67fa-0", {
          "k": "userFormRef"
        }),
        h: common_vendor.p({
          model: userForm.value,
          rules
        }),
        i: common_vendor.o(login),
        j: common_vendor.o(toReg),
        k: common_vendor.p({
          type: "qq",
          size: "32",
          color: "white"
        }),
        l: common_vendor.p({
          type: "weixin",
          size: "32",
          color: "white"
        }),
        m: common_vendor.o(wxlogin),
        n: common_vendor.p({
          type: "weibo",
          size: "32",
          color: "white"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/login.vue"]]);
wx.createPage(MiniProgramPage);
