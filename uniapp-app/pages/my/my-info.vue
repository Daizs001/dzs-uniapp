<template>
	<view style="padding: 20px;">
		<view class="item">
			<view class="label">
				头像
			</view>
			<view class="value">
				<image :src="user.avatarUrl" style="width: 56px;border-radius: 28px;background-color: gray;" mode="widthFix"></image>
				<uni-icons type="right" color="gray" size="16"></uni-icons>
			</view>
		</view>
		<view class="item">
			<view class="label">
				登录账号
			</view>
			<view class="value">
				<text>{{user.username}}</text>
				<uni-icons type="right" color="gray" size="16"></uni-icons>
			</view>
		</view>
		<view class="item" @tap="updateNickname">
			<view class="label">
				昵称
			</view>
			<view class="value">
				<text>{{user.nickname}}</text>
				<uni-icons type="right" color="gray" size="16"></uni-icons>
			</view>
		</view>
		<view class="item">
			<view class="label">
				用户等级
			</view>
			<view class="value">
				<text>{{user.level}}</text>
				<uni-icons type="right" color="white" size="16"></uni-icons>
			</view>
		</view>
		<view class="item">
			<view class="label">
				性别
			</view>
			<view class="value">
				<text>{{sex}}</text>
				<uni-icons type="right" color="gray" size="16"></uni-icons>
			</view>
		</view>
		<view class="item">
			<view class="label">
				电话
			</view>
			<view class="value">
				<text>{{user.phone}}</text>
				<uni-icons type="right" color="gray" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useUserStore } from '@/stores/user.js'
	import { storeToRefs } from 'pinia'
	const userStore = useUserStore()
	const { user } = storeToRefs(userStore);
	
	
	const updateNickname = () => {
		uni.navigateTo({
			url: '/pages/my/update-nickname'
		})
	}
	
	import { computed } from 'vue'
	let sex = computed(() => {
		if(user.value.sex == 'M'){
			return "男"
		}else if(user.value.sex == 'F'){
			return "女"
		}else{
			return "保密"
		}
	})
	
</script>

<style lang="scss">
.item{
	border-bottom: 1px solid #eeeeee;
	padding: 20px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 16px;
	color: #333333;
	.value{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		text{
			margin-left: 10px;
		}
	}
}
</style>