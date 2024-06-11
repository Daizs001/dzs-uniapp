<template>
	<view class="message-view">
		<image src="../../static/icon/success.png" style="width: 100px;margin: 50px 0 30px;" mode="widthFix"></image>
		<text style="font-size: 20px;font-weight: bold;margin-bottom: 20px;">发布成功</text>
		<text style="font-size: 16px;margin-bottom: 40px;">感谢您的无私分享</text>
		<button style="width: 100%;" type="primary"  class="round-button" @tap="toIndex">回到首页</button>
		<button style="width: 100%; margin-top: 20px;" type="primary" class="round-button" @tap="toPublish" plain>新的分享</button>
	</view>
</template>

<script setup>

const toIndex = () => {
	uni.reLaunch({
		url: '/pages/index/index'
	})
}

const toPublish = () => {
	uni.reLaunch({
		url: '/pages/article/publish'
	})
}
</script>

<style lang="scss">
.message-view{
	padding: 30px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
