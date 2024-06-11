


const tokenKey = "Authorization"

export default{
	setStorageToken(token){
		uni.setStorageSync(tokenKey, "Bearer " + token)
	},
	getStorageToken(){
		return uni.getStorageSync(tokenKey)
	},
	removeStorageToken(){
		uni.removeStorageSync(tokenKey)
	}
}