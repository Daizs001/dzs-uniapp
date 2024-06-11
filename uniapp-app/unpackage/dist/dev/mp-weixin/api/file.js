"use strict";
const common_vendor = require("../common/vendor.js");
const config_config = require("../config/config.js");
const fileApi = {
  uploadFile(tempfile) {
    return new Promise((resolve, reject) => {
      common_vendor.index.uploadFile({
        url: `${config_config.config.apiBaseUrl}/file/upload`,
        //仅为示例，非真实的接口地址
        filePath: tempfile,
        name: "file",
        formData: {},
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data);
          resolve(JSON.parse(uploadFileRes.data));
        },
        fail(err) {
          console.log("文件上传错误：", err);
        }
      });
    });
  }
};
exports.fileApi = fileApi;
