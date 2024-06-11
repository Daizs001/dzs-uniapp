
import storage from '@/utils/storage.js'

uni.addInterceptor('request', {
	invoke(args) {
		args.header = {
			'Authorization': storage.getStorageToken()
		}
	}
})