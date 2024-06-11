<template>
	<view>
		<uni-notice-bar scrollable showIcon :text="notice"></uni-notice-bar>
		<view class="reg-view">
			<uni-forms ref="userFormRef" :model="userForm" :label-width="85" :rules="rules">
				<uni-forms-item label="头像">
					<button class="avatar" size="mini" type="default" open-type="chooseAvatar" @chooseavatar="chooseavatar"  >
						<image :src="avatar" mode=""></image>
					</button>
				</uni-forms-item>
				<uni-forms-item label="昵称" required name="nickname">
					<uni-easyinput v-model="userForm.nickname" placeholder="昵称" />
				</uni-forms-item>
				<uni-forms-item label="用户名" required name="username">
					<uni-easyinput v-model="userForm.username" placeholder="用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="password">
					<uni-easyinput type="password" v-model="userForm.password" placeholder="密码" />
				</uni-forms-item>
				<uni-forms-item label="确认密码" required name="password2">
					<uni-easyinput type="password" v-model="userForm.password2" placeholder="确认密码" />
				</uni-forms-item>
				<uni-forms-item label="性别" required name="sex">
					<uni-data-checkbox v-model="userForm.sex" :localdata="sexs" />
				</uni-forms-item>
				<uni-forms-item label="手机号码" required name="phone">
					<uni-easyinput v-model="userForm.phone" placeholder="手机号码" />
				</uni-forms-item>
				<uni-forms-item label="验证码" required name="captcha">
					<view style="display: flex;justify-content: space-between;">
						<view style="width: 50%;">
							<uni-easyinput v-model="userForm.captcha" placeholder="验证码" />
						</view>
						<view style="width: 48%;">
							<button type="default" style="width: 99%;height: 35px;line-height: 35px;"
								size="mini" :disabled="isCountdown" @tap="getCaptcha">
								<text v-if="!isCountdown">获取验证码</text>
								<text v-else>{{ttl}}s后重发</text>
							</button>
						</view>
					</view>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" class="round-button" @tap="reg">注 册</button>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const sexs = ref([])
	
	//1. 什么时候发请求
	//2. 怎么发请求
	import { onLoad } from '@dcloudio/uni-app'
	import baseApi from '@/api/base.js'
	onLoad(() => {
		baseApi.getParamListByBaseName('sex').then(res => {
			console.log('baseApi 请求。。。。。。。',res);
			sexs.value = res.data.map(item => {
				return {
					text: item.paramName,
					value: item.paramValue
				}
			});
		})
	})
	
	
	const avatar = ref("/static/icon/avatar.png")
	import fileApi from '@/api/file.js'
	const chooseavatar = (e) => {
		console.log("chooseavatar: ",e);
		fileApi.uploadFile(e.detail.avatarUrl).then(res => {
			avatar.value = e.detail.avatarUrl;
			userForm.value.avatar = res.data.fileName;
			console.log(userForm.value);
		});
	}
	
	
	const isCountdown = ref(false)
	const ttl = ref(15)
	let countdownId = '';
	const getCaptcha = () => {
		if(userForm.value.phone == null || userForm.value.phone == undefined){
			uni.showToast({
				icon: 'none',
				title: '请先输入手机号码'
			})
			return false;
		}
		userApi.sendSms(userForm.value.phone).then(res => {
			isCountdown.value = true;
			countdownId = setInterval(() => {
				ttl.value--
			},1000)
		})
		
	}
	
	import {watch} from 'vue'
	watch(ttl, (value) => {
		if(value <= 0){
			clearInterval(countdownId);
			isCountdown.value = false;
			ttl.value = 15
		}
	})
	
	
	
	
	
	const userFormRef = ref()
	const reg = () => {
		userFormRef.value.validate().then(res => {
			console.log('验证通过：', res);
			userForm.value.type = '1'  // 普通注册
			userApi.regUser(userForm.value).then(regRes => {
				uni.navigateTo({
					url: '/pages/reg/reg-success'
				})
			});
			
		}).catch(err => {
			console.log('表单错误信息：', err);
		})
	}



	const notice = ref("通知，明天起，放假三天，三天后继续放假！")

	const userForm = ref({})

	
	import userApi from '@/api/user.js'
	// 验证规则
	const rules = {
		nickname: {
			rules: [{
					required: true,
					errorMessage: '请输入昵称',
				},
				{
					minLength: 2,
					maxLength: 50,
					errorMessage: '昵称长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
		username: {
			rules: [{
					required: true,
					errorMessage: '请输入用户名',
				},
				{
					minLength: 3,
					maxLength: 50,
					errorMessage: '用户长度在 {minLength} 到 {maxLength} 个字符',
				},
				{
					validateFunction: (rule, value, data, callback) => {
						// 异步需要返回 Promise 对象
						return new Promise((resolve, reject) => {
							userApi.countUserByName(value).then(res => {
								if(res.data > 0){
									reject(new Error('该用户名已存在'))
								}
								resolve()
							})
							
							
						})
					}
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
					errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
		password2: {
			rules: [{
					required: true,
					errorMessage: '请输入确认密码',
				},
				{
					minLength: 6,
					maxLength: 20,
					errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if (value != data.password) {
							callback('两次密码输入不一致')
						}
						return true
					}
				}
			]
		},
		sex: {
			rules: [{
				required: true,
				errorMessage: '请选中性别',
			}]
		},
		phone: {
			rules: [{
					required: true,
					errorMessage: '请输入手机号码',
				},
				{
					minLength: 11,
					maxLength: 11,
					errorMessage: '手机号码长度为11个字符',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
						if (!reg.test(value)) {
							callback('手机号输入有误')
						}
						return true
					}
				}
			]
		},
		captcha: {
			rules: [{
					required: true,
					errorMessage: '请输入验证码',
				},
				{
					minLength: 6,
					maxLength: 6,
					errorMessage: '验证码长度为6个字符',
				},
				{
					validateFunction: (rule, value, data, callback) => {
						// 异步需要返回 Promise 对象
						return new Promise((resolve, reject) => {
							userApi.validCaptcha(data.phone,value).then(res => {
								if(!res.data){
									reject(new Error('无效的验证码'))
								}
								resolve()
							});
							
							
						})
					}
				}
			]
		},
	}
</script>

<style lang="scss">
	.reg-view {
		padding: 20px;
		.avatar{
			width: 56px;
			height: 56px;
			padding: 0;
			background-color: gray;
			border-radius: 28px;
			box-shadow: 0 0 5px gray;
			image{
				width: 56px;
				height: 56px;
			}
		}
	}
</style>