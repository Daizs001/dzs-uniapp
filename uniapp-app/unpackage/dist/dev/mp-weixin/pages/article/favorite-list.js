"use strict";
const common_vendor = require("../../common/vendor.js");
const api_article = require("../../api/article.js");
require("../../utils/request.js");
require("../../config/config.js");
if (!Array) {
  const _easycom_m_card2 = common_vendor.resolveComponent("m-card");
  _easycom_m_card2();
}
const _easycom_m_card = () => "../../components/global/m-card.js";
if (!Math) {
  _easycom_m_card();
}
const _sfc_main = {
  __name: "favorite-list",
  setup(__props) {
    const viewDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/article/article?id=" + id
      });
    };
    const dataList = common_vendor.ref([]);
    common_vendor.onLoad(async (option) => {
      let res = await api_article.articleApi.getFavoriteList(option.userId);
      dataList.value = res.data;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dataList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => viewDetail(item.id), item.id),
            b: item.id,
            c: "b9cea220-0-" + i0,
            d: common_vendor.p({
              localdata: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/article/favorite-list.vue"]]);
wx.createPage(MiniProgramPage);
