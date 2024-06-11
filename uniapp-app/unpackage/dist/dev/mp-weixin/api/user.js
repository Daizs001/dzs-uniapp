"use strict";
const utils_request = require("../utils/request.js");
const userApi = {
  countUserByName(username) {
    return utils_request.request({
      url: `/user/count/${username}`
    });
  },
  sendSms(phone) {
    return utils_request.request({
      url: `/user/sms/${phone}`
    });
  },
  validCaptcha(phone, code) {
    return utils_request.request({
      url: `/user/sms/check`,
      data: {
        phone,
        code
      }
    });
  },
  regUser(user) {
    return utils_request.request({
      url: `/user/reg`,
      method: "POST",
      data: user
    });
  },
  login(user) {
    return utils_request.request({
      url: `/user/login`,
      method: "POST",
      data: user
    });
  },
  getUserInfo(token) {
    return utils_request.request({
      url: `/user/info`,
      method: "get",
      data: { token }
    });
  },
  logout() {
    return utils_request.request({
      url: `/user/logout`,
      method: "POST"
    });
  },
  updateUserAvatar(userId, avatar) {
    return utils_request.request({
      url: `/user/avatar`,
      method: "PUT",
      params: {
        userId,
        avatar
      }
    });
  },
  updateNickname(userId, nickname) {
    return utils_request.request({
      url: `/user/nickname`,
      method: "PUT",
      params: {
        userId,
        nickname
      }
    });
  },
  wxlogin(jscode) {
    return utils_request.request({
      url: `/user/wxlogin`,
      method: "POST",
      params: {
        jscode
      }
    });
  }
};
exports.userApi = userApi;
