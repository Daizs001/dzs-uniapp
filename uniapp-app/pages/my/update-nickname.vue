<template>
	<view style="padding: 50px 20px 0;">
		<input type="text" class="nickname" v-model="nickname" />
		<view style="padding: 0 10px; color: gray; font-size: 14px;margin: 10px 0 50px;">
			好昵称可以让大家更容易记住你
		</view>
		<button @tap="updateNickname" type="primary" :disabled="isDisable" class="round-button">保 存</button>
	</view>
</template>

<script setup>
	import { ref, watch } from 'vue';

	import { useUserStore } from '@/stores/user.js'
	const userStore = useUserStore()

	const nickname = ref('')
	nickname.value = userStore.user.nickname;

	const isDisable = ref(true)

	watch(nickname, value => {
		if (value == userStore.user.nickname || value.length == 0) {
			isDisable.value = true;
		} else {
			isDisable.value = false;
		}
	})

	import userApi from '@/api/user.js'
	const updateNickname = async () => {
		let updateRes = await userApi.updateNickname(userStore.user.id,nickname.value)
		userStore.refresh(updateRes.data.token, updateRes.data.user);
		uni.showToast({
			title: "昵称已更新"
		})
	}
</script>

<style lang="scss">
	.nickname {
		border-bottom: 1px solid #e89a98;
		padding: 10px;
		font-size: 16px;
	}
</style>