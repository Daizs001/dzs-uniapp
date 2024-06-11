<template>
	<view class="message-view">
		<image src="../../static/icon/success.png" style="width: 100px;margin: 50px 0 30px;" mode="widthFix"></image>
		<text style="font-size: 20px;font-weight: bold;margin-bottom: 20px;">注册成功</text>
		<text style="font-size: 16px;margin-bottom: 40px;">快快进入罗德岛吧</text>
		<button style="width: 100%;" type="primary" class="round-button" @tap="toLogin">马上登录</button>
	</view>
</template>

<script setup>

const toLogin = () => {
	uni.reLaunch({
		url: '/pages/login'
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
