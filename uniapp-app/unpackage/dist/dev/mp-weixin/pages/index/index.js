"use strict";
const common_vendor = require("../../common/vendor.js");
const api_base = require("../../api/base.js");
const api_article = require("../../api/article.js");
require("../../utils/request.js");
require("../../config/config.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_m_card2 = common_vendor.resolveComponent("m-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_m_card2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_m_card = () => "../../components/global/m-card.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_m_card + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const viewDetail = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/article/article?id=" + id
      });
    };
    const triggered = common_vendor.ref(false);
    const onRefresh = async () => {
      console.log("下拉刷新.........");
      triggered.value = true;
      await search();
      triggered.value = false;
    };
    const scrollTop = common_vendor.ref(0);
    const loadMoreStatus = common_vendor.ref("more");
    const loadMore = async () => {
      console.log("上拉到底........", scrollTop.value);
      if (loadMoreStatus.value == "noMore") {
        return false;
      }
      loadMoreStatus.value = "loading";
      queryParam.value.pageNum++;
      let res = await api_article.articleApi.getArticleList(queryParam.value);
      setTimeout(function() {
        articleList.value = articleList.value.concat(res.data.rows);
        if (articleList.value.length < res.data.total) {
          loadMoreStatus.value = "more";
        } else {
          loadMoreStatus.value = "noMore";
        }
      }, 2e3);
    };
    const activeIndex = common_vendor.ref(0);
    const changeCategory = (index, categoryId) => {
      activeIndex.value = index;
      queryParam.value.categoryId = categoryId;
      search();
    };
    const categoryList = common_vendor.ref([
      { id: 0, paramName: "全部", paramValue: "" }
    ]);
    common_vendor.onLoad(async () => {
      let res = await api_base.baseApi.getParamListByBaseName("articleType");
      categoryList.value = categoryList.value.concat(res.data);
    });
    const articleList = common_vendor.ref([]);
    const queryParam = common_vendor.ref({
      pageNum: 1,
      pageSize: 5
    });
    const search = async () => {
      scrollTop.value = 1;
      setTimeout(function() {
        scrollTop.value = 0;
      }, 10);
      queryParam.value.pageNum = 1;
      let res = await api_article.articleApi.getArticleList(queryParam.value);
      console.log("getArticleList....", res);
      articleList.value = res.data.rows;
      if (articleList.value.length < res.data.total) {
        loadMoreStatus.value = "more";
      } else {
        loadMoreStatus.value = "noMore";
      }
    };
    const clearSearch = () => {
      queryParam.value.title = "";
      console.log("新搜索...");
      search();
    };
    common_vendor.onLoad(() => {
      search();
    });
    let safeTop = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      let { safeArea } = common_vendor.index.getSystemInfoSync();
      safeTop.value = safeArea.top + 10;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(search),
        b: common_vendor.o(clearSearch),
        c: common_vendor.o(($event) => queryParam.value.title = $event),
        d: common_vendor.p({
          radius: "100",
          placeholder: "快速搜索...",
          clearButton: "auto",
          cancelButton: "none",
          modelValue: queryParam.value.title
        }),
        e: common_vendor.f(categoryList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.paramName),
            b: index == activeIndex.value
          }, index == activeIndex.value ? {} : {}, {
            c: common_vendor.o(($event) => changeCategory(index, item.paramValue), item.id),
            d: index == activeIndex.value ? 1 : "",
            e: item.id
          });
        }),
        f: common_vendor.unref(safeTop) + "px",
        g: common_vendor.f(articleList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => viewDetail(item.id), item.id),
            b: item.id,
            c: "653f4e6f-1-" + i0,
            d: common_vendor.p({
              localdata: item
            })
          };
        }),
        h: articleList.value.length == 0
      }, articleList.value.length == 0 ? {} : {
        i: common_vendor.p({
          status: loadMoreStatus.value
        })
      }, {
        j: scrollTop.value,
        k: common_vendor.o(loadMore),
        l: "calc(100vh - " + (common_vendor.unref(safeTop) + 110) + "px)",
        m: triggered.value,
        n: common_vendor.o(onRefresh)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
