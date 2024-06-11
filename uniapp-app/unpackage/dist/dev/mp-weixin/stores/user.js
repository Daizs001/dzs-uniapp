"use strict";
const common_vendor = require("../common/vendor.js");
const api_user = require("../api/user.js");
const utils_storage = require("../utils/storage.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const user = common_vendor.ref({});
  const token = common_vendor.ref("");
  function login(username, password) {
    return new Promise((resolve, reject2) => {
      api_user.userApi.login({ username, password }).then((res) => {
        token.value = res.data;
        resolve(res);
      });
    }).catch((err) => {
      reject(err);
    });
  }
  function getUserInfo(token2) {
    return new Promise((resolve, reject2) => {
      api_user.userApi.getUserInfo(token2).then((res) => {
        user.value = res.data;
        utils_storage.storage.setStorageToken(token2);
        resolve(res);
      });
    }).catch((err) => {
      reject(err);
    });
  }
  function logout() {
    return new Promise((resolve, reject2) => {
      api_user.userApi.logout().then((res) => {
        user.value = {};
        token.value = "";
        utils_storage.storage.removeStorageToken();
        resolve(res);
      });
    }).catch((err) => {
      reject(err);
    });
  }
  function refresh(newToken, newUser) {
    token.value = newToken;
    user.value = newUser;
    utils_storage.storage.setStorageToken(newToken);
  }
  return { user, token, login, getUserInfo, logout, refresh };
});
exports.useUserStore = useUserStore;
