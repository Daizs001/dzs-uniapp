<template>
	<view class="card">
		<view class="author">
			<image class="avatar" :src="localdata.avatar" mode="widthFix"></image>
			<text>{{localdata.authorName}}</text>
		</view>
		<view class="title">
			{{localdata.title}}
		</view>
		<view class="bottom">
			<view class="">
				{{localdata.fcd}}
			</view>
			<view class="">
				<text>{{localdata.viewsCount}}阅读</text>
				<text>·</text>
				<text>{{localdata.likesCount}}点赞</text>
				<text>·</text>
				<text>{{localdata.favoritesCount}}收藏</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { toRefs } from 'vue';
	const props = defineProps(['localdata'])
	//const localdata = props.localdata;
	const { localdata } = toRefs(props)
</script>

<style lang="scss">
	.card{
		border-bottom: 1px solid #eeeeee;
		padding: 15px 20px 10px;
		.author{
			display: flex;
			align-items: center;
			font-size: 14px;
			.avatar{
				width: 30px;
				height: 30px;
				border-radius: 15px;
				margin-right: 10px;
				background-color: gray;
			}
		}
		
		.title{
			padding: 10px 0;
			font-size: 16px;
			line-height: 26px;
			color: #333333;
		}
		
		.bottom{
			font-size: 12px;
			color: gray;
			display: flex;
			justify-content: space-between;
			text{
				margin-left: 6px;
			}
		}
	}
</style>