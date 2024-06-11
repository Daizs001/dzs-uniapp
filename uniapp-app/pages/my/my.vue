<template>
	<view class="my">
		<view :style="{height: safeTop+'px'}">
		</view>
		<view style="padding: 30px 20px 20px;" :style="{height: 'calc(100vh - ' + (safeTop) + 'px)'}">
			<view style="display: flex; justify-content: space-between; align-items: center;">
				<view style="display: flex;align-items: center;">
					<button open-type="chooseAvatar" @chooseavatar="updateAvatar" type="default" style="background-color: gray; padding: 0; width: 56px; height: 56px; border-radius: 28px;"
						size="mini">
						<image style="width: 56px;" :src="user.avatarUrl" mode="widthFix"></image>
					</button>
					<view style="margin-left: 15px; display: flex; flex-direction: column;">
						<text style="margin-bottom: 3px; font-size: 22px;color: white">{{user.nickname}}</text>
						<text
							style="width: 40px;text-align: center; font-size: 12px; background-color: white;border-radius: 10px;">{{user.level}}</text>
					</view>
				</view>
				<view class="" @tap="toMyInfo">
					<uni-icons type="gear" size="32" color="white"></uni-icons>
				</view>
			</view>
 
			<view class="user-achieve">
				<view class="item">
					<text class="number">{{userAchieve.userFansCount}}</text>
					<text class="desc">粉丝</text>
				</view>
				<view class="item">
					<text class="number">{{userAchieve.userFollowsCount}}</text>
					<text class="desc">关注</text>
				</view>
				<view class="item">
					<text class="number">{{userAchieve.userGetLikesCount}}</text>
					<text class="desc">获赞</text>
				</view>
				<view class="item">
					<text class="number">{{userAchieve.userFavoritesCount}}</text>
					<text class="desc">收藏</text>
				</view>
			</view>

			<view class="opr-list">
				<view class="item">
					<uni-icons type="flag" color="#404040" size="28"></uni-icons>
					<text>浏览历史</text>
				</view>
				<view class="item" @tap="toFavoriteList">
					<uni-icons type="star" color="#404040" size="28"></uni-icons>
					<text>收藏夹</text>
				</view>
				<view class="item">
					<uni-icons type="hand-up" color="#404040" size="28"></uni-icons>
					<text>赞过</text>
				</view>
				<view class="item" @tap="toMyPublish">
					<uni-icons type="bars" color="#404040" size="28"></uni-icons>
					<text>我的分享</text>
				</view>
			</view>

			<view class="opr-list">
				<view class="item">
					<uni-icons type="font" color="#404040" size="28"></uni-icons>
					<text>字号设置</text>
				</view>
				<view class="item">
					<uni-icons type="vip" color="#404040" size="28"></uni-icons>
					<text>升级会员</text>
				</view>
				<view class="item">
					<uni-icons type="auth" color="#404040" size="28"></uni-icons>
					<text>安全中心</text>
				</view>
				<view class="item">
					<uni-icons type="phone" color="#404040" size="28"></uni-icons>
					<text>联系我们</text>
				</view>

				<view class="item">
					<uni-icons type="chatboxes" color="#404040" size="28"></uni-icons>
					<text>交流群</text>
				</view>
				<view class="item">
					<uni-icons type="locked" color="#404040" size="28"></uni-icons>
					<text>修改密码</text>
				</view>
				<view class="item" @tap="logout">
					<uni-icons type="minus" color="#404040" size="28"></uni-icons>
					<text>退出登录</text>
				</view>
				<view class="item">
					<uni-icons type="more-filled" color="#404040" size="28"></uni-icons>
					<text>更多设置</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import { onLoad, onShow } from '@dcloudio/uni-app'
	
	const logout = () => {
		uni.showModal({
			title: '注销',
			content: '您确定退出登录？',
			success: function (res) {
				if (res.confirm) {
					userStore.logout().then(logoutRes => {
						uni.reLaunch({
							url: '/pages/login'
						})
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
	
	const toMyInfo = () => {
		uni.navigateTo({
			url: '/pages/my/my-info'
		})
	}
	
	const toMyPublish = () => {
		uni.navigateTo({
			url: '/pages/article/my-publish?authorId=' + user.value.id
		})
	}
	
	const toFavoriteList = () => {
		uni.navigateTo({
			url: '/pages/article/favorite-list?userId=' + user.value.id
		})
	}
	
	
	// 更换头像
	/*
		1. 选择头像
		2. 调接口 上传新头像
		3. 调接口 更新用户表avatar
		4. 前端更新pinia和storage
	*/
	
	import fileApi from '@/api/file.js'
	import userApi from '@/api/user.js'
	const updateAvatar =  async (e) => {
		// 调接口 上传新头像
		let res = await fileApi.uploadFile(e.detail.avatarUrl)
		// 调接口 更新用户表avatar
		let updateRes =  await userApi.updateUserAvatar(user.value.id, res.data.fileName)
		// 更新pinia和storage
		userStore.refresh(updateRes.data.token, updateRes.data.user);
		uni.showToast({
			title: "头像已更新"
		})
	}
	
	
	
	
	


	import articleApi from '@/api/article.js'
	const userAchieve = ref({})
	onShow(async () => {
		let res = await articleApi.getUserAchieve(user.value.id);
		userAchieve.value = res.data;
	})






	import { useUserStore } from '@/stores/user.js'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { user } = storeToRefs(userStore);



	const safeTop = ref(0)
	onLoad(() => {
		let { safeArea } = uni.getSystemInfoSync()
		safeTop.value = safeArea.top;
	})
</script>

<style lang="scss">
	.my {
		background: linear-gradient(to top, #fafafa 45%, #d2302c 80%, #d2302c 100%, );

		.user-achieve {
			display: flex;
			justify-content: space-around;
			margin: 30px 0;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.number {
					font-size: 18px;
					font-weight: bold;
					color: white;
				}

				.desc {
					color: white;
					font-size: 14px;
					line-height: 26px;
				}
			}
		}

		.opr-list {
			background-color: white;
			border-radius: 10px;
			display: flex;
			justify-content: space-around;
			padding-top: 20px;
			margin-bottom: 20px;
			flex-wrap: wrap;
			.item {
				width: 24%;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-bottom: 20px;

				text {
					font-size: 12px;
					color: #404040;
					margin-top: 3px;
				}
			}
		}
	}
</style>