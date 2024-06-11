import config from '@/config/config.js'

export default {
	uploadFile(tempfile) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: `${config.apiBaseUrl}/file/upload`, //仅为示例，非真实的接口地址
				filePath: tempfile,
				name: 'file',
				formData: {
				},
				success: (uploadFileRes) => {
					console.log(uploadFileRes.data);
					resolve(JSON.parse(uploadFileRes.data))
				},
				fail(err) {
					console.log("文件上传错误：" , err);
				}
			});
		})
	}
}