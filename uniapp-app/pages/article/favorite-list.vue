<template>
	<view>
		<m-card @tap="viewDetail(item.id)"  v-for="(item,index) in dataList" :key="item.id" :localdata="item"></m-card>
	</view>
</template>

<script setup>

import { onLoad } from '@dcloudio/uni-app'
import articleApi from '@/api/article.js'
import { ref } from 'vue';

const viewDetail = (id) => {
		uni.navigateTo({
			url: '/pages/article/article?id=' + id
		})
	}

const dataList = ref([])
onLoad( async (option) => {
	let res = await  articleApi.getFavoriteList(option.userId);
	dataList.value = res.data;
})


</script>

<style lang="scss">

</style>
