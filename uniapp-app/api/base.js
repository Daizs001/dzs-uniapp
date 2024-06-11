import request from '@/utils/request.js'

export default{
	getParamListByBaseName(baseName){
		return request({
			url: `/base/${baseName}`
		})
	}
}