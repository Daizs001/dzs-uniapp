import { defineStore } from 'pinia';
import { ref } from 'vue';

import userApi from '@/api/user.js'
import storage from '@/utils/storage.js'


export const useUserStore = defineStore('user', () => {

	const user = ref({})
	const token = ref("")


	function login(username, password) {
		return new Promise((resolve, reject) => {
			userApi.login({ username, password }).then(res => {
				token.value = res.data;
				resolve(res);
			});
		}).catch(err => {
			reject(err)
		})


	}

	function getUserInfo(token) {
		return new Promise((resolve, reject) => {
			userApi.getUserInfo(token).then(res => {
				user.value = res.data;
				storage.setStorageToken(token);
				resolve(res);
			});
		}).catch(err => {
			reject(err)
		})
	}
	
	
	function logout() {
		return new Promise((resolve, reject) => {
			userApi.logout().then(res => {
				user.value = {};
				token.value = "";
				storage.removeStorageToken()
				resolve(res)
			})
		}).catch(err => {
			reject(err)
		})
	}
	
	function refresh(newToken,newUser){
		token.value = newToken;
		user.value = newUser;
		storage.setStorageToken(newToken);
	}
	
	
	
	

	return { user, token, login, getUserInfo, logout, refresh }
})