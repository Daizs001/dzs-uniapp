<script>
	import storage from '@/utils/storage.js'
	import { useUserStore } from '@/stores/user.js'
	export default {
		onLaunch: async function() {
			let token = storage.getStorageToken();
			if(token){
				let userStore = useUserStore()
				// 获取用户信息
				await userStore.getUserInfo(token);
				// 提示
				uni.showToast({
					title: "自动登录成功"
				})
				// 跳转首页
				setTimeout(function() {
					uni.switchTab({
						url: '/pages/index/index'
					})
				}, 0);
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #ffffff;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
	.round-button{
		border-radius: 23px;
	}
</style>
