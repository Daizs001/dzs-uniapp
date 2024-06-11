<template>
	<view class="container">
		<view class="top" :style="{paddingTop: safeTop+'px'}">
			<view class="title">
				罗德岛 · 首页
			</view>
			<view class="search">
				<uni-search-bar style="margin: 0; padding: 0;" v-model="queryParam.title" radius="100"
					placeholder="快速搜索..." clearButton="auto" cancelButton="none" @confirm="search"
					@clear="clearSearch" />
			</view>
			<view class="categoryTab">
				<view @tap="changeCategory(index,item.paramValue)" class="item" :class="{active: index == activeIndex }"
					v-for="(item,index) in categoryList" :key="item.id">
					<text>{{item.paramName}}</text>
					<text v-if="index == activeIndex" style="line-height: 8px;">—</text>
				</view>
			</view>
		</view>
		<scroll-view :scroll-top="scrollTop" @scrolltolower="loadMore" scroll-y="true"
			:style="{height: 'calc(100vh - ' + (safeTop+110) + 'px)'}" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="100" refresher-background="lightgreen"
			@refresherrefresh="onRefresh">
			<m-card @tap="viewDetail(item.id)"  v-for="(item,index) in articleList" :key="item.id" :localdata="item"></m-card>
			<view class="no-data" v-if="articleList.length == 0">
				<image src="/static/icon/fail.png" mode="widthFix"></image>
				<text>没有找到你要的数据</text>
			</view>
			<view style="height: 200px;" v-else>
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
		</scroll-view>

	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const viewDetail = (id) => {
		uni.navigateTo({
			url: '/pages/article/article?id=' + id
		})
	}
	
	const triggered = ref(false)
	const onRefresh = async () => {
		console.log('下拉刷新.........');
		triggered.value = true;
		await search()
		triggered.value = false;
	}
	

	const scrollTop = ref(0);


	const loadMoreStatus = ref('more')
	const loadMore = async () => {
		console.log('上拉到底........', scrollTop.value);
		if (loadMoreStatus.value == 'noMore') {
			return false;
		}

		loadMoreStatus.value = 'loading'
		queryParam.value.pageNum++;
		let res = await articleApi.getArticleList(queryParam.value);

		setTimeout(function() {
			articleList.value = articleList.value.concat(res.data.rows);
			if (articleList.value.length < res.data.total) {
				loadMoreStatus.value = 'more'
			} else {
				loadMoreStatus.value = 'noMore'
			}
		}, 2000);


	}



	const activeIndex = ref(0)

	const changeCategory = (index, categoryId) => {
		activeIndex.value = index;
		queryParam.value.categoryId = categoryId;
		search()
	}

	const categoryList = ref([
		{ id: 0, paramName: '全部', paramValue: '' }
	])

	import baseApi from '@/api/base.js'
	onLoad(async () => {
		let res = await baseApi.getParamListByBaseName("articleType")
		categoryList.value = categoryList.value.concat(res.data);
	})



	const articleList = ref([])
	const queryParam = ref({
		pageNum: 1,
		pageSize: 5
	})
	import articleApi from '@/api/article.js'
	const search = async () => {
		scrollTop.value = 1;
		setTimeout(function() {
			scrollTop.value = 0;
		}, 10);

		queryParam.value.pageNum = 1;
		let res = await articleApi.getArticleList(queryParam.value);
		console.log('getArticleList....', res);
		articleList.value = res.data.rows;
		if (articleList.value.length < res.data.total) {
			loadMoreStatus.value = 'more'
		} else {
			loadMoreStatus.value = 'noMore'
		}
	}

	const clearSearch = () => {
		queryParam.value.title = ''
		console.log('新搜索...');
		search()
	}
	onLoad(() => {
		search();
	})




	let safeTop = ref(0)
	import { onLoad } from '@dcloudio/uni-app'
	onLoad(() => {
		let { safeArea } = uni.getSystemInfoSync();
		safeTop.value = safeArea.top + 10;
	})
</script>

<style lang="scss">
	.top {
		height: 110px;
		background-color: #d2302c;
		color: white;
		font-size: 22px;
		padding: 20px 20px 5px;

		.search {
			.uni-searchbar {
				padding: 10px 0;
			}
		}

		.categoryTab {
			display: flex;
			font-size: 14px;

			.item {
				margin-right: 10px;
				color: lightgray;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.active {
				color: white;
				font-weight: bold;
			}
		}

	}

	.no-data {
		font-size: 14px;
		color: gray;
		display: flex;
		flex-direction: column;
		align-items: center;

		image {
			width: 80px;
			margin: 100px 0 30px;
		}
	}
</style>