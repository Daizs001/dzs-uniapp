<template>
	<view>
		<m-card @touchstart="touchstart" @touchend="touchend" @longtap="deleteArticle(item.id)" @tap="viewDetail(item.id)"  v-for="(item,index) in dataList" :key="item.id" :localdata="item"></m-card>
	</view>
</template>

<script setup>

import { onLoad } from '@dcloudio/uni-app'
import articleApi from '@/api/article.js'
import { ref } from 'vue';




let touchStartTime = 0;
let touchEndTime = 0;

const touchstart = () => {
	touchStartTime = new Date().getTime()
}

const touchend = () => {
	touchEndTime = new Date().getTime()
}


const viewDetail = (id) => {
	if( (touchEndTime-touchStartTime) < 350 ){  // 判断短按
		uni.navigateTo({
				url: '/pages/article/article?id=' + id
			})
		}
	}
		
let authorId = ''
const dataList = ref([])
onLoad( async (option) => {
	let res = await  articleApi.getMyPublish(option.authorId);
	dataList.value = res.data;
	authorId = option.authorId;
})

const deleteArticle = (id) => {
    uni.showModal({
    	title: '删除确认',
    	content: '您确认删除改记录？',
    	success: function (res) {
    		if (res.confirm) {
    			articleApi.deleteArticle(id).then(async deleteRes => {
					uni.showToast({
						title: '删除成功'
					})
					let res = await  articleApi.getMyPublish(authorId);
					dataList.value = res.data;
				})
				
				
    		} else if (res.cancel) {
    			console.log('用户点击取消');
    		}
    	}
    });
}



</script>

<style lang="scss">

</style>
