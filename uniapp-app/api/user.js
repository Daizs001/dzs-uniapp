import request from '@/utils/request.js'

export default{
	countUserByName(username){
		return request({
			url: `/user/count/${username}`
		})
	},
	sendSms(phone){
		return request({
			url: `/user/sms/${phone}`
		})
	},
	validCaptcha(phone,code){
		return request({
			url: `/user/sms/check`,
			data: {
				phone,code
			}
		})
	},
	regUser(user){
		return request({
			url: `/user/reg`,
			method: 'POST',
			data: user
		})
	},
	
	
	login(user){
		return request({
			url: `/user/login`,
			method: 'POST',
			data: user
		})
	},
	getUserInfo(token){
		return request({
			url: `/user/info`,
			method: 'get',
			data: {token}
		})
	},
	logout(){
		return request({
			url: `/user/logout`,
			method: 'POST'
		})
	},
	updateUserAvatar(userId,avatar){
		return request({
			url: `/user/avatar`,
			method: 'PUT',
			params: {
				userId,avatar
			}
		})
	},
	updateNickname(userId,nickname){
		return request({
			url: `/user/nickname`,
			method: 'PUT',
			params: {
				userId,nickname
			}
		})
	},
	
	wxlogin(jscode){
		return request({
			url: `/user/wxlogin`,
			method: 'POST',
			params: {
				jscode
			}
		})
	} 
}