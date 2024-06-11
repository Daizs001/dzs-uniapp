import request from '@/utils/request.js'

export default{
	addArticle(article){
		return request({
			url: `/article`,
			method: 'POST',
			data: article
		})
	},
	getArticleList(param){
		return request({
			url: `/article/list`,
			data: param
		})
	},
	getArticleById(id){
		return request({
			url: `/article/${id}`
		})
	},
	follow(authorId,userId){
		return request({
			url: `/interaction/follow`,
			method: 'POST',
			params: {
				authorId,userId
			}
		})
	},
	unfollow(authorId,userId){
		return request({
			url: `/interaction/unfollow`,
			method: 'DELETE',
			params: {
				authorId,userId
			}
		})
	},
	like(articleId,authorId,userId){
		return request({
			url: `/interaction/like`,
			method: 'POST',
			params: {
				articleId,authorId,userId
			}
		})
	},
	unlike(articleId,authorId,userId){
		return request({
			url: `/interaction/unlike`,
			method: 'DELETE',
			params: {
				articleId,authorId,userId
			}
		})
	},
	getInteraction(articleId, userId){
		return request({
			url: `/interaction/article`,
			params: {
				articleId,userId
			}
		})
	},
	favorite(articleId,userId){
		return request({
			url: `/interaction/favorite`,
			method: 'POST',
			params: {
				articleId,userId
			}
		})
	},
	unfavorite(articleId,userId){
		return request({
			url: `/interaction/unfavorite`,
			method: 'DELETE',
			params: {
				articleId,userId
			}
		})
	},
	addComment(comment){
		return request({
			url: `/comment`,
			method: 'POST',
			data: comment
		})
	},
	getCommentList(articleId,pageNo,pageSize){
		return request({
			url: `/comment/list`,
			method: 'get',
			data: {
				articleId,pageNo,pageSize
			}
		})
	},
	getUserAchieve(userId){
		return request({
			url: `/interaction/user`,
			method: 'get',
			data: {
				userId
			}
		})
	},
	getFavoriteList(userId){
		return request({
			url: `/article/favorite/list`,
			method: 'get',
			data: {
				userId
			}
		})
	},
	getMyPublish(authorId){
		return request({
			url: `/article/author/list`,
			method: 'get',
			data: {
				authorId
			}
		})
	},
	deleteArticle(articleId){
		return request({
			url: `/article/${articleId}`,
			method: 'DELETE'
		})
	}
}