import config from '@/config/config.js'

const request = (option) => {
	return new Promise((resolve, reject) => {
		
		if(option.params){
			let res = ""
			for(let key in option.params ){
				res += (key + "=" + option.params[key] + '&');
			}
			option.url = option.url + "?" + res.substring(0,res.length-1);
		}
		
		
		uni.request({
			url: config.apiBaseUrl + option.url,
			data: option.data || {},
			header: option.header || {},
			method: option.method || 'GET',
			success: (res) => {
				if (res.data.code == 20000) {
					resolve(res.data)//成功请求
				} else {
					console.log("-----> 操作失败：", res.data);
					let errInfo = res.data?.message || '未知错误'
					uni.showToast({
						icon: 'none',
						title: errInfo,
						duration: 3000
					})
					// setTimeout(function() {
					// 	if (res.data.code == 20003) {
					// 		uni.reLaunch({
					// 			url: '/pages/login'
					// 		})
					// 	}
					// 	reject(new Error(res.statusCode))
					// }, 3000);
				}
			},
			fail: (err) => {
				let errorInfo = '';
				if (err.errMsg.includes('timeout')) {
					errorInfo = '请求超时，请稍后重试'
				} else if (err.errMsg.includes('abort')) {
					errorInfo = '请求数据错误，请稍后重试'
				} else {
					errorInfo = '网络请求错误'
				}
				uni.showToast({
					title: errorInfo,
					duration: 5000,
					icon: "none"
				});
				reject(new Error(errorInfo))
			}
		});
	});

}

export default request;