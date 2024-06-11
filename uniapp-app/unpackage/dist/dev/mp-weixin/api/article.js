"use strict";
const utils_request = require("../utils/request.js");
const articleApi = {
  addArticle(article) {
    return utils_request.request({
      url: `/article`,
      method: "POST",
      data: article
    });
  },
  getArticleList(param) {
    return utils_request.request({
      url: `/article/list`,
      data: param
    });
  },
  getArticleById(id) {
    return utils_request.request({
      url: `/article/${id}`
    });
  },
  follow(authorId, userId) {
    return utils_request.request({
      url: `/interaction/follow`,
      method: "POST",
      params: {
        authorId,
        userId
      }
    });
  },
  unfollow(authorId, userId) {
    return utils_request.request({
      url: `/interaction/unfollow`,
      method: "DELETE",
      params: {
        authorId,
        userId
      }
    });
  },
  like(articleId, authorId, userId) {
    return utils_request.request({
      url: `/interaction/like`,
      method: "POST",
      params: {
        articleId,
        authorId,
        userId
      }
    });
  },
  unlike(articleId, authorId, userId) {
    return utils_request.request({
      url: `/interaction/unlike`,
      method: "DELETE",
      params: {
        articleId,
        authorId,
        userId
      }
    });
  },
  getInteraction(articleId, userId) {
    return utils_request.request({
      url: `/interaction/article`,
      params: {
        articleId,
        userId
      }
    });
  },
  favorite(articleId, userId) {
    return utils_request.request({
      url: `/interaction/favorite`,
      method: "POST",
      params: {
        articleId,
        userId
      }
    });
  },
  unfavorite(articleId, userId) {
    return utils_request.request({
      url: `/interaction/unfavorite`,
      method: "DELETE",
      params: {
        articleId,
        userId
      }
    });
  },
  addComment(comment) {
    return utils_request.request({
      url: `/comment`,
      method: "POST",
      data: comment
    });
  },
  getCommentList(articleId, pageNo, pageSize) {
    return utils_request.request({
      url: `/comment/list`,
      method: "get",
      data: {
        articleId,
        pageNo,
        pageSize
      }
    });
  },
  getUserAchieve(userId) {
    return utils_request.request({
      url: `/interaction/user`,
      method: "get",
      data: {
        userId
      }
    });
  },
  getFavoriteList(userId) {
    return utils_request.request({
      url: `/article/favorite/list`,
      method: "get",
      data: {
        userId
      }
    });
  },
  getMyPublish(authorId) {
    return utils_request.request({
      url: `/article/author/list`,
      method: "get",
      data: {
        authorId
      }
    });
  },
  deleteArticle(articleId) {
    return utils_request.request({
      url: `/article/${articleId}`,
      method: "DELETE"
    });
  }
};
exports.articleApi = articleApi;
