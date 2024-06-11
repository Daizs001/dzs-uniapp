<template>
	<view style="padding: 20px;">
		<uni-forms ref="articleFormRef" :rules="rules" :model="articleForm">
			<uni-forms-item label="" name="title">
				<uni-easyinput v-model="articleForm.title" placeholder="标题" />
			</uni-forms-item>
			<uni-forms-item label="" name="categoryId">
				<uni-data-select v-model="articleForm.categoryId" :localdata="categoryList"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="" name="details">
				<editor class="detailsEditor" id="detailsEditor" placeholder="输入正文..." @input="editorInput"></editor>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" class="round-button" @tap="publish">发 布</button>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	
	const editorInput = (e) => {
		articleForm.value.details = e.detail.html;
	}

	import articleApi from '@/api/article.js'
	const publish = () => {
		articleFormRef.value.validate().then(async res => {
			
			await articleApi.addArticle(articleForm.value);
			articleForm.value = {}
			// 清理表单验证
			articleFormRef.value.clearValidate()
			// 富文本编辑器数据清理
			uni.createSelectorQuery().select('#detailsEditor').context((res) => {
						res.context.clear()
					}).exec() 
					
			
			uni.navigateTo({
				url: '/pages/article/publish-success'
			})
			
		}).catch(err => {
			console.log('err', articleForm.value);
		})
	}

	const articleFormRef = ref()
	const rules = ref({
		title: {
			rules: [{
				required: true,
				errorMessage: '请输入标题',
			}]
		},
		categoryId: {
			rules: [{
				required: true,
				errorMessage: '请选择分类',
			}]
		},
		details: {
			rules: [{
				required: true,
				errorMessage: '请输入正文',
			}]
		}
	})
	const articleForm = ref({})


	const categoryList = ref([
		{ value: 0, text: "篮球" },
		{ value: 1, text: "足球" },
		{ value: 2, text: "游泳" },
	])

	import baseApi from '@/api/base.js'
	import { onLoad } from '@dcloudio/uni-app'
	onLoad(async () => {
		let res = await baseApi.getParamListByBaseName("articleType")
		categoryList.value = res.data.map(item => {
			return {
				value: item.paramValue,
				text: item.paramName
			}
		});
	})
</script>

<style lang="scss">
	.detailsEditor {
		border: 1px solid #e5e5e5;
		padding: 10px;
		border-radius: 5px;
		height: 100vh-35;
	}
</style>