import request  from './fetch.js'

export default{
    // 登入
    login(params){
        return request.post('/backstage/staff/login',params)
    },
	// 首页统计报表
	getHomeData(params){
	    return request.get('/backstage/home/getHomeData',params)
	},
}