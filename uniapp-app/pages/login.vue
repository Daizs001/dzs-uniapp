<template>
	<view>
		<view style="text-align: center; margin: 50px 0 30px;">
			<image style="width: 180px;" src="../static/icon/rhodes.png" mode="widthFix"></image>
		</view>
		<view class="form-view">
			<uni-forms ref="userFormRef" :model="userForm" :rules="rules">
				<uni-forms-item name="username">
					<uni-easyinput trim="all" v-model="userForm.username" placeholder="用户名"
						prefixIcon="person"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="password">
					<uni-easyinput trim="all" type="password" v-model="userForm.password" placeholder="密码"
						prefixIcon="locked"></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<button class="round-button" type="primary" @tap="login">登 录</button>
		</view>
		<view class="other-view">
			<text>忘记密码</text>
			<text @tap="toReg">新用户注册</text>
		</view>

	</view>

	<view class="bottom-view">
		<view class="icon" style="background-color: #599ee3;">
			<uni-icons type="qq" size="32" color="white"></uni-icons>
		</view>
		<view class="icon" style="background-color: #07c160;" @tap="wxlogin">
			<uni-icons type="weixin" size="32" color="white"></uni-icons>
		</view>
		<view class="icon" style="background-color: #fb666c;">
			<uni-icons type="weibo" size="32" color="white"></uni-icons>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	import userApi from '@/api/user.js'
	
	const wxlogin = async() => {
		// 获取jscode
		let { code } =  await uni.login({
			provider: "weixin"
		})
		// 调用后端，换取openid
		let res = await userApi.wxlogin(code);
		await userStore.getUserInfo(res.data);
		
		uni.showToast({
			title: "微信登录成功"
		})
		
		setTimeout(function() {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}, 1000);
		
	}
	
	
	const toReg = () => {
		uni.navigateTo({
			url: '/pages/reg/reg'
		})
	}

	const userForm = ref({})
	const userFormRef = ref()

	import { useUserStore } from '@/stores/user.js'
	let userStore = useUserStore()
	const login = () => {
		userFormRef.value.validate().then(async res => { 
			// 登录
			let loginRes = await userStore.login(userForm.value.username,userForm.value.password);
			// 获取用户信息
			await userStore.getUserInfo(loginRes.data);
			// 提示
			uni.showToast({
				title: "登录成功"
			})
			// 跳转首页
			setTimeout(function() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}, 1000);
			
		}).catch(err => {
			console.log('表单错误信息：', err);
		}) 
	}

	// 验证规则
	const rules = {
		username: {
			rules: [{
					required: true,
					errorMessage: '请输入用户名',
				},
				{
					minLength: 3,
					maxLength: 50,
					errorMessage: '用户长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
		password: {
			rules: [{
					required: true,
					errorMessage: '请输入密码',
				},
				{
					minLength: 6,
					maxLength: 20,
					errorMessage: '用户长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
	}
</script>

<style lang="scss">
	.form-view {
		padding: 30px 30px 10px;
	}

	.other-view {
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
		color: blue;
	}

	.bottom-view {
		box-sizing: border-box;
		position: fixed;
		bottom: 50px;
		padding: 0 30px;
		display: flex;
		justify-content: space-around;
		width: 100%;

		.icon {
			width: 46px;
			height: 46px;
			border-radius: 23px;
			background-color: white;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>