"use strict";
const common_vendor = require("../../common/vendor.js");
const api_article = require("../../api/article.js");
const stores_user = require("../../stores/user.js");
require("../../utils/request.js");
require("../../config/config.js");
require("../../api/user.js");
require("../../utils/storage.js");
if (!Array) {
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_col + _easycom_uni_row + _easycom_uni_icons + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "article",
  setup(__props) {
    const commentListArea = common_vendor.ref("");
    const scrollToComment = () => {
      commentListArea.value = "";
      setTimeout(function() {
        commentListArea.value = "comment-list-area";
      }, 10);
    };
    const commentList = common_vendor.ref([]);
    const commentTotal = common_vendor.ref(0);
    const getCommentList = async (articleId, pageNo, pageSize) => {
      let res = await api_article.articleApi.getCommentList(articleId, pageNo, pageSize);
      commentList.value = res.data.rows;
      commentTotal.value = res.data.total;
    };
    const commentInput = (e) => {
      comment.value.comment = e.detail.html;
      comment.value.commentText = e.detail.text;
    };
    const comment = common_vendor.ref({});
    const addComment = async () => {
      if (comment.value.commentText.length < 10) {
        common_vendor.index.showToast({
          title: "评论至少10字以上",
          icon: "none"
        });
        return false;
      }
      comment.value.articleId = article.value.id;
      comment.value.authorId = userStore.user.id;
      comment.value.authorName = userStore.user.nickname;
      comment.value.avatar = userStore.user.avatar;
      await api_article.articleApi.addComment(comment.value);
      common_vendor.index.showToast({
        title: "评论成功"
      });
      common_vendor.index.createSelectorQuery().select("#commentEditor").context((res) => {
        res.context.clear();
      }).exec();
      commentPop.value.close();
      getCommentList(article.value.id, 1, 100);
    };
    const commentPop = common_vendor.ref();
    const openCommentPop = () => {
      commentPop.value.open();
      common_vendor.index.createSelectorQuery().select("#commentEditor").context((res) => {
        res.context.format("align", "left");
      }).exec();
    };
    const interaction = common_vendor.ref({});
    common_vendor.onLoad(async (option) => {
      let res = await api_article.articleApi.getInteraction(option.id, userStore.user.id);
      interaction.value = res.data;
    });
    const like = async () => {
      let res = await api_article.articleApi.like(article.value.id, article.value.authorId, userStore.user.id);
      interaction.value = res.data;
      common_vendor.index.showToast({
        title: "点赞成功"
      });
    };
    const unlike = async () => {
      let res = await api_article.articleApi.unlike(article.value.id, article.value.authorId, userStore.user.id);
      interaction.value = res.data;
      common_vendor.index.showToast({
        title: "取消点赞"
      });
    };
    const favorite = async () => {
      let res = await api_article.articleApi.favorite(article.value.id, userStore.user.id);
      interaction.value = res.data;
      common_vendor.index.showToast({
        title: "收藏成功"
      });
    };
    const unfavorite = async () => {
      let res = await api_article.articleApi.unfavorite(article.value.id, userStore.user.id);
      interaction.value = res.data;
      common_vendor.index.showToast({
        title: "已取消收藏"
      });
    };
    const safeBottom = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      let { screenHeight, safeArea } = common_vendor.index.getSystemInfoSync();
      safeBottom.value = screenHeight - safeArea.bottom;
      if (safeBottom.value > 30) {
        safeBottom.value -= 10;
      }
      console.log("safeBottom:", safeBottom.value);
    });
    let userStore = stores_user.useUserStore();
    const follow = async () => {
      await api_article.articleApi.follow(article.value.authorId, userStore.user.id);
      article.value.other.isFollow = true;
      common_vendor.index.showToast({
        title: "关注成功"
      });
    };
    const unfollow = async () => {
      await api_article.articleApi.unfollow(article.value.authorId, userStore.user.id);
      article.value.other.isFollow = false;
      common_vendor.index.showToast({
        title: "已取消关注"
      });
    };
    const scroll = (e) => {
      if (e.detail.scrollTop > 50) {
        common_vendor.index.setNavigationBarTitle({
          title: article.value.title
        });
      } else {
        common_vendor.index.setNavigationBarTitle({
          title: "详情"
        });
      }
    };
    const article = common_vendor.ref({
      other: {}
    });
    common_vendor.onLoad(async (option) => {
      console.log(option);
      let res = await api_article.articleApi.getArticleById(option.id);
      console.log(res.data);
      article.value = res.data;
      article.value.details = res.data.details.replace(/<p>/g, '<p style="margin-bottom:15px;">');
      getCommentList(option.id, 1, 100);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(article.value.title),
        b: common_vendor.t(article.value.fcd),
        c: common_vendor.t(article.value.other.viewsCount),
        d: article.value.avatar,
        e: common_vendor.t(article.value.authorName),
        f: article.value.other.isFollow
      }, article.value.other.isFollow ? {
        g: common_vendor.o(unfollow)
      } : {
        h: common_vendor.o(follow)
      }, {
        i: article.value.details,
        j: common_vendor.t(commentTotal.value),
        k: common_vendor.f(commentList.value, (item, index, i0) => {
          return {
            a: item.avatar,
            b: "5578c8f7-1-" + i0 + "," + ("5578c8f7-0-" + i0),
            c: common_vendor.t(item.authorName),
            d: item.comment,
            e: common_vendor.t(item.fcd),
            f: "5578c8f7-2-" + i0 + "," + ("5578c8f7-0-" + i0),
            g: "5578c8f7-0-" + i0,
            h: item.id
          };
        }),
        l: common_vendor.p({
          span: 3
        }),
        m: common_vendor.p({
          span: 21
        }),
        n: common_vendor.o(scroll),
        o: commentListArea.value,
        p: "calc(100vh - " + (60 + safeBottom.value) + "px)",
        q: common_vendor.p({
          type: "compose",
          color: "#999aaa",
          size: "20"
        }),
        r: common_vendor.o(openCommentPop),
        s: interaction.value.isLike
      }, interaction.value.isLike ? {
        t: common_vendor.o(unlike),
        v: common_vendor.p({
          type: "heart-filled",
          color: "red",
          size: "30"
        })
      } : {
        w: common_vendor.o(like),
        x: common_vendor.p({
          type: "heart",
          color: "#999aaa",
          size: "30"
        })
      }, {
        y: common_vendor.t(interaction.value.articleLikesCount),
        z: interaction.value.isFavorite
      }, interaction.value.isFavorite ? {
        A: common_vendor.o(unfavorite),
        B: common_vendor.p({
          type: "star-filled",
          color: "#f2c000",
          size: "30"
        })
      } : {
        C: common_vendor.o(favorite),
        D: common_vendor.p({
          type: "star",
          color: "#999aaa",
          size: "30"
        })
      }, {
        E: common_vendor.t(interaction.value.articleFavoriteCount),
        F: common_vendor.p({
          type: "chat",
          color: "#999aaa",
          size: "30"
        }),
        G: common_vendor.t(commentTotal.value),
        H: common_vendor.o(scrollToComment),
        I: safeBottom.value + "px",
        J: common_vendor.o(commentInput),
        K: common_vendor.o(addComment),
        L: common_vendor.sr(commentPop, "5578c8f7-9", {
          "k": "commentPop"
        }),
        M: common_vendor.p({
          type: "bottom",
          ["background-color"]: "#fff"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/Edi/Desktop/m51-app/pages/article/article.vue"]]);
wx.createPage(MiniProgramPage);
