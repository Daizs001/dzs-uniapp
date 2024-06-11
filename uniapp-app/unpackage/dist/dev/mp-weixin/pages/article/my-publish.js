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
  __name: "my-publish",
  setup(__props) {
    let touchStartTime = 0;
    let touchEndTime = 0;
    const touchstart = () => {
      touchStartTime = new Date().getTime();
    };
    const touchend = () => {
      touchEndTime = new Date().getTime();
    };
    const viewDetail = (id) => {
      if (touchEndTime - touchStartTime < 350) {
        common_vendor.index.navigateTo({
          url: "/pages/article/article?id=" + id
        });
      }
    };
    let authorId = "";
    const dataList = common_vendor.ref([]);
    common_vendor.onLoad(async (option) => {
      let res = await api_article.articleApi.getMyPublish(option.authorId);
      dataList.value = res.data;
      authorId = option.authorId;
    });
    const deleteArticle = (id) => {
      common_vendor.index.showModal({
        title: "删除确认",
        content: "您确认删除改记录？",
        success: function(res) {
          if (res.confirm) {
            api_article.articleApi.deleteArticle(id).then(async (deleteRes) => {
              common_vendor.index.showToast({
                title: "删除成功"
              });
              let res2 = await api_article.articleApi.getMyPublish(authorId);
              dataList.value = res2.data;
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(dataList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(touchstart, item.id),
            b: common_vendor.o(touchend, item.id),
            c: common_vendor.o(($event) => deleteArticle(item.id), item.id),
            d: common_vendor.o(($event) => viewDetail(item.id), item.id),
            e: item.id,
            f: "38bc9706-0-" + i0,
            g: common_vendor.p({
              localdata: item
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/article/my-publish.vue"]]);
wx.createPage(MiniProgramPage);
