"use strict";
const common_vendor = require("../../common/vendor.js");
const api_article = require("../../api/article.js");
const api_base = require("../../api/base.js");
require("../../utils/request.js");
require("../../config/config.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const editorInput = (e) => {
      articleForm.value.details = e.detail.html;
    };
    const publish = () => {
      articleFormRef.value.validate().then(async (res) => {
        await api_article.articleApi.addArticle(articleForm.value);
        articleForm.value = {};
        articleFormRef.value.clearValidate();
        common_vendor.index.createSelectorQuery().select("#detailsEditor").context((res2) => {
          res2.context.clear();
        }).exec();
        common_vendor.index.navigateTo({
          url: "/pages/article/publish-success"
        });
      }).catch((err) => {
        console.log("err", articleForm.value);
      });
    };
    const articleFormRef = common_vendor.ref();
    const rules = common_vendor.ref({
      title: {
        rules: [{
          required: true,
          errorMessage: "请输入标题"
        }]
      },
      categoryId: {
        rules: [{
          required: true,
          errorMessage: "请选择分类"
        }]
      },
      details: {
        rules: [{
          required: true,
          errorMessage: "请输入正文"
        }]
      }
    });
    const articleForm = common_vendor.ref({});
    const categoryList = common_vendor.ref([
      { value: 0, text: "篮球" },
      { value: 1, text: "足球" },
      { value: 2, text: "游泳" }
    ]);
    common_vendor.onLoad(async () => {
      let res = await api_base.baseApi.getParamListByBaseName("articleType");
      categoryList.value = res.data.map((item) => {
        return {
          value: item.paramValue,
          text: item.paramName
        };
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => articleForm.value.title = $event),
        b: common_vendor.p({
          placeholder: "标题",
          modelValue: articleForm.value.title
        }),
        c: common_vendor.p({
          label: "",
          name: "title"
        }),
        d: common_vendor.o(($event) => articleForm.value.categoryId = $event),
        e: common_vendor.p({
          localdata: categoryList.value,
          modelValue: articleForm.value.categoryId
        }),
        f: common_vendor.p({
          label: "",
          name: "categoryId"
        }),
        g: common_vendor.o(editorInput),
        h: common_vendor.p({
          label: "",
          name: "details"
        }),
        i: common_vendor.sr(articleFormRef, "0010e490-0", {
          "k": "articleFormRef"
        }),
        j: common_vendor.p({
          rules: rules.value,
          model: articleForm.value
        }),
        k: common_vendor.o(publish)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/article/publish.vue"]]);
wx.createPage(MiniProgramPage);
