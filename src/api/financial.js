import request  from './fetch.js'

export default{
	/*首页数据*/
	getHomepageData(params){
		return request.get('/backstage/homepage/getHomepageData',params)
	},
}