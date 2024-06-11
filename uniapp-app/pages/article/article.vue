<template>
	<!-- 主要内容区域 -->
	<scroll-view class="main" scroll-y="true" @scroll="scroll" :scroll-into-view="commentListArea"
		:style="{height: 'calc(100vh - ' + (60+safeBottom) + 'px)'}">
		<view class="detail">
			<view class="title">
				{{article.title}}
			</view>
			<view class="info">
				<text>{{article.fcd}} </text>
				<text>阅读{{article.other.viewsCount}}</text>
			</view>
			<view class="author">
				<view class="author-info">
					<image :src="article.avatar" mode="widthFix"></image>
					<text>{{article.authorName}}</text>
				</view>
				<view class="follow">
					<button @tap="unfollow" v-if="article.other.isFollow" type="primary" size="mini" plain>已关注</button>
					<button @tap="follow" v-else type="primary" size="mini">+ 关注</button>
				</view>
			</view>
			<view class="details" v-html="article.details">

			</view>
		</view>
		<view class="comment" id="comment-list-area">
			<view class="">
				<text style="font-weight: bold;">全部评论</text>
				<text style="font-size: 14px; margin-left: 6px;">{{commentTotal}}</text>
			</view>
			<view style="margin: 20px 0;" v-for="(item,index) in commentList" :key="item.id">
				<uni-row>
					<uni-col :span="3">
						<image :src="item.avatar" mode="widthFix"
							style="width: 32px; height: 32px;border-radius: 16px;"></image>
					</uni-col>
					<uni-col :span="21">
						<view class="">
							<text style="font-size: 14px;color: #4d4d4d;">{{item.authorName}}</text>
						</view>
						<view style="font-size: 16px; line-height: 24px; color: #333; margin: 10px 0;">
							<view v-html="item.comment">
							</view>
						</view>
						<view style="color: gray; font-size: 12px;">
							{{item.fcd}}
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
	</scroll-view>
	<!-- 底部操作区域 -->
	<view class="bottom-bar">
		<view class="tool-bar">
			<view class="comment-button" @tap="openCommentPop">
				<uni-icons type="compose" color="#999aaa" size="20"></uni-icons>
				<text>说点什么 ...</text>
			</view>l
			<view class="other">
				<uni-icons @tap="unlike" v-if="interaction.isLike" type="heart-filled" color="red"
					size="30"></uni-icons>
				<uni-icons @tap="like" v-else type="heart" color="#999aaa" size="30"></uni-icons>
				<text>{{interaction.articleLikesCount}}</text>
			</view>
			<view class="other">
				<uni-icons @tap="unfavorite" v-if="interaction.isFavorite" type="star-filled" color="#f2c000"
					size="30"></uni-icons>
				<uni-icons @tap="favorite" v-else type="star" color="#999aaa" size="30"></uni-icons>
				<text>{{interaction.articleFavoriteCount}}</text>
			</view>
			<view class="other" @tap="scrollToComment">
				<uni-icons type="chat" color="#999aaa" size="30"></uni-icons>
				<text>{{commentTotal}}</text>
			</view>
		</view>
		<view class="bottom-safe" :style="{height: safeBottom+'px'}">

		</view>
	</view>

	<uni-popup ref="commentPop" type="bottom" background-color="#fff">
		<view class="comment">
			<editor id="commentEditor" @input="commentInput" placeholder="要友爱评论哦..."></editor>
			<button @tap="addComment" type="primary" size="mini">发表评论</button>
		</view>
	</uni-popup>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import articleApi from '@/api/article.js'
	import { ref } from 'vue';

	const commentListArea = ref('')
	const scrollToComment = () => {
		commentListArea.value = ""
		setTimeout(function() {
			commentListArea.value = "comment-list-area"
		}, 10);
		
	}
	


	const commentList = ref([])
	const commentTotal = ref(0)
	const getCommentList = async (articleId, pageNo, pageSize) => {
		let res = await articleApi.getCommentList(articleId, pageNo, pageSize);
		commentList.value = res.data.rows;
		commentTotal.value = res.data.total;
	}













	const commentInput = (e) => {
		comment.value.comment = e.detail.html;
		comment.value.commentText = e.detail.text;
	}

	const comment = ref({})
	const addComment = async () => {
		if (comment.value.commentText.length < 10) {
			uni.showToast({
				title: '评论至少10字以上',
				icon: 'none'
			})
			return false;
		}

		comment.value.articleId = article.value.id;
		comment.value.authorId = userStore.user.id;
		comment.value.authorName = userStore.user.nickname;
		comment.value.avatar = userStore.user.avatar;

		await articleApi.addComment(comment.value)

		uni.showToast({
			title: '评论成功'
		})

		uni.createSelectorQuery().select('#commentEditor').context((res) => {
			res.context.clear()
		}).exec()

		commentPop.value.close();

		getCommentList(article.value.id, 1, 100);
	}


	const commentPop = ref()
	const openCommentPop = () => {
		commentPop.value.open();
		// 让editor获得焦点
		uni.createSelectorQuery().select('#commentEditor').context((res) => {
			res.context.format("align", "left");
		}).exec()

	}



	const interaction = ref({})
	onLoad(async (option) => {
		let res = await articleApi.getInteraction(option.id, userStore.user.id)
		interaction.value = res.data;
	})

	const like = async () => {
		let res = await articleApi.like(article.value.id, article.value.authorId, userStore.user.id);
		interaction.value = res.data;
		uni.showToast({
			title: "点赞成功"
		})
	}

	const unlike = async () => {
		let res = await articleApi.unlike(article.value.id, article.value.authorId, userStore.user.id);
		interaction.value = res.data;
		uni.showToast({
			title: "取消点赞"
		})
	}

	const favorite = async () => {
		let res = await articleApi.favorite(article.value.id, userStore.user.id);
		interaction.value = res.data;
		uni.showToast({
			title: "收藏成功"
		})
	}

	const unfavorite = async () => {
		let res = await articleApi.unfavorite(article.value.id, userStore.user.id);
		interaction.value = res.data;
		uni.showToast({
			title: "已取消收藏"
		})
	}






	const safeBottom = ref(0)
	onLoad(() => {
		let { screenHeight, safeArea } = uni.getSystemInfoSync();
		safeBottom.value = screenHeight - safeArea.bottom;

		if (safeBottom.value > 30) {
			safeBottom.value -= 10;
		}

		console.log('safeBottom:', safeBottom.value);
	})




	import { useUserStore } from '@/stores/user.js'
	let userStore = useUserStore()

	const follow = async () => {
		await articleApi.follow(article.value.authorId, userStore.user.id)
		article.value.other.isFollow = true;
		uni.showToast({
			title: "关注成功"
		})
	}

	const unfollow = async () => {
		await articleApi.unfollow(article.value.authorId, userStore.user.id)
		article.value.other.isFollow = false;
		uni.showToast({
			title: "已取消关注"
		})
	}




	const scroll = (e) => {
		if (e.detail.scrollTop > 50) {
			uni.setNavigationBarTitle({
				title: article.value.title
			})
		} else {
			uni.setNavigationBarTitle({
				title: '详情'
			})
		}
	}

	const article = ref({
		other: {}
	})
	onLoad(async (option) => {
		console.log(option);
		let res = await articleApi.getArticleById(option.id);
		console.log(res.data);
		article.value = res.data;
		article.value.details = res.data.details.replace(/<p>/g, '<p style="margin-bottom:15px;">');


		getCommentList(option.id, 1, 100);
	})
</script>

<style lang="scss">
	.main {
		.detail {
			padding: 0 20px;
			color: #333333;

			.title {
				font-size: 20px;
				padding: 25px 0 25px;
			}

			.info {
				font-size: 12px;
				color: gray;
				display: flex;
				justify-content: space-between;
			}

			.author {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20px 0;

				.author-info {
					display: flex;
					align-items: center;

					image {
						width: 36px;
						height: 36px;
						border-radius: 18px;
						margin-right: 8px;
					}
				}
			}

			.details {
				font-size: 16px;
				line-height: 26px;
			}
		}
	}

	.bottom-bar {
		position: fixed;
		bottom: 0;
		width: 100%;

		.tool-bar {
			padding: 0 20px;
			height: 60px;
			border-top: 1px solid #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.comment-button {
				display: flex;
				align-items: center;
				height: 32px;
				line-height: 32px;
				background-color: #f5f5f5;
				color: #999aaa;
				border-radius: 16px;
				padding: 0 16px;
				width: 220rpx;
				font-size: 14px;

				text {
					margin-left: 5px;
				}
			}

			.other {
				color: #999aaa;
				font-size: 14px;
				display: flex;
				align-items: center;
			}
		}

		.bottom-safe {}
	}

	.comment {
		padding: 20px;

		editor {
			background-color: #f5f5f5;
			padding: 8px;
			border-radius: 10px;
			color: #333333;
		}

		button {
			margin: 10px 0 40px;
		}
	}
</style>