"use strict";
const common_vendor = require("../../common/vendor.js");
const api_base = require("../../api/base.js");
const api_file = require("../../api/file.js");
const api_user = require("../../api/user.js");
require("../../utils/request.js");
require("../../config/config.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_notice_bar2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_data_checkbox2 + _easycom_uni_forms2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_data_checkbox + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "reg",
  setup(__props) {
    const sexs = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      api_base.baseApi.getParamListByBaseName("sex").then((res) => {
        console.log("baseApi 请求。。。。。。。", res);
        sexs.value = res.data.map((item) => {
          return {
            text: item.paramName,
            value: item.paramValue
          };
        });
      });
    });
    const avatar = common_vendor.ref("/static/icon/avatar.png");
    const chooseavatar = (e) => {
      console.log("chooseavatar: ", e);
      api_file.fileApi.uploadFile(e.detail.avatarUrl).then((res) => {
        avatar.value = e.detail.avatarUrl;
        userForm.value.avatar = res.data.fileName;
        console.log(userForm.value);
      });
    };
    const isCountdown = common_vendor.ref(false);
    const ttl = common_vendor.ref(15);
    let countdownId = "";
    const getCaptcha = () => {
      if (userForm.value.phone == null || userForm.value.phone == void 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请先输入手机号码"
        });
        return false;
      }
      api_user.userApi.sendSms(userForm.value.phone).then((res) => {
        isCountdown.value = true;
        countdownId = setInterval(() => {
          ttl.value--;
        }, 1e3);
      });
    };
    common_vendor.watch(ttl, (value) => {
      if (value <= 0) {
        clearInterval(countdownId);
        isCountdown.value = false;
        ttl.value = 15;
      }
    });
    const userFormRef = common_vendor.ref();
    const reg = () => {
      userFormRef.value.validate().then((res) => {
        console.log("验证通过：", res);
        userForm.value.type = "1";
        api_user.userApi.regUser(userForm.value).then((regRes) => {
          common_vendor.index.navigateTo({
            url: "/pages/reg/reg-success"
          });
        });
      }).catch((err) => {
        console.log("表单错误信息：", err);
      });
    };
    const notice = common_vendor.ref("通知，明天起，放假三天，三天后继续放假！");
    const userForm = common_vendor.ref({});
    const rules = {
      nickname: {
        rules: [
          {
            required: true,
            errorMessage: "请输入昵称"
          },
          {
            minLength: 2,
            maxLength: 50,
            errorMessage: "昵称长度在 {minLength} 到 {maxLength} 个字符"
          }
        ]
      },
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
          },
          {
            validateFunction: (rule, value, data, callback) => {
              return new Promise((resolve, reject) => {
                api_user.userApi.countUserByName(value).then((res) => {
                  if (res.data > 0) {
                    reject(new Error("该用户名已存在"));
                  }
                  resolve();
                });
              });
            }
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
            errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符"
          }
        ]
      },
      password2: {
        rules: [
          {
            required: true,
            errorMessage: "请输入确认密码"
          },
          {
            minLength: 6,
            maxLength: 20,
            errorMessage: "密码长度在 {minLength} 到 {maxLength} 个字符"
          },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value != data.password) {
                callback("两次密码输入不一致");
              }
              return true;
            }
          }
        ]
      },
      sex: {
        rules: [{
          required: true,
          errorMessage: "请选中性别"
        }]
      },
      phone: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号码"
          },
          {
            minLength: 11,
            maxLength: 11,
            errorMessage: "手机号码长度为11个字符"
          },
          {
            validateFunction: function(rule, value, data, callback) {
              let reg2 = /^1[3|4|5|7|8|9][0-9]{9}$/;
              if (!reg2.test(value)) {
                callback("手机号输入有误");
              }
              return true;
            }
          }
        ]
      },
      captcha: {
        rules: [
          {
            required: true,
            errorMessage: "请输入验证码"
          },
          {
            minLength: 6,
            maxLength: 6,
            errorMessage: "验证码长度为6个字符"
          },
          {
            validateFunction: (rule, value, data, callback) => {
              return new Promise((resolve, reject) => {
                api_user.userApi.validCaptcha(data.phone, value).then((res) => {
                  if (!res.data) {
                    reject(new Error("无效的验证码"));
                  }
                  resolve();
                });
              });
            }
          }
        ]
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          scrollable: true,
          showIcon: true,
          text: notice.value
        }),
        b: avatar.value,
        c: common_vendor.o(chooseavatar),
        d: common_vendor.p({
          label: "头像"
        }),
        e: common_vendor.o(($event) => userForm.value.nickname = $event),
        f: common_vendor.p({
          placeholder: "昵称",
          modelValue: userForm.value.nickname
        }),
        g: common_vendor.p({
          label: "昵称",
          required: true,
          name: "nickname"
        }),
        h: common_vendor.o(($event) => userForm.value.username = $event),
        i: common_vendor.p({
          placeholder: "用户名",
          modelValue: userForm.value.username
        }),
        j: common_vendor.p({
          label: "用户名",
          required: true,
          name: "username"
        }),
        k: common_vendor.o(($event) => userForm.value.password = $event),
        l: common_vendor.p({
          type: "password",
          placeholder: "密码",
          modelValue: userForm.value.password
        }),
        m: common_vendor.p({
          label: "密码",
          required: true,
          name: "password"
        }),
        n: common_vendor.o(($event) => userForm.value.password2 = $event),
        o: common_vendor.p({
          type: "password",
          placeholder: "确认密码",
          modelValue: userForm.value.password2
        }),
        p: common_vendor.p({
          label: "确认密码",
          required: true,
          name: "password2"
        }),
        q: common_vendor.o(($event) => userForm.value.sex = $event),
        r: common_vendor.p({
          localdata: sexs.value,
          modelValue: userForm.value.sex
        }),
        s: common_vendor.p({
          label: "性别",
          required: true,
          name: "sex"
        }),
        t: common_vendor.o(($event) => userForm.value.phone = $event),
        v: common_vendor.p({
          placeholder: "手机号码",
          modelValue: userForm.value.phone
        }),
        w: common_vendor.p({
          label: "手机号码",
          required: true,
          name: "phone"
        }),
        x: common_vendor.o(($event) => userForm.value.captcha = $event),
        y: common_vendor.p({
          placeholder: "验证码",
          modelValue: userForm.value.captcha
        }),
        z: !isCountdown.value
      }, !isCountdown.value ? {} : {
        A: common_vendor.t(ttl.value)
      }, {
        B: isCountdown.value,
        C: common_vendor.o(getCaptcha),
        D: common_vendor.p({
          label: "验证码",
          required: true,
          name: "captcha"
        }),
        E: common_vendor.sr(userFormRef, "145ede9a-1", {
          "k": "userFormRef"
        }),
        F: common_vendor.p({
          model: userForm.value,
          ["label-width"]: 85,
          rules
        }),
        G: common_vendor.o(reg)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/reg/reg.vue"]]);
wx.createPage(MiniProgramPage);
