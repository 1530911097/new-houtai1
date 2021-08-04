import request from './fetch.js'

export default {
	/* 公告——列表 */
	getSysNewsList(params){
		return request.get('/backstage/massageManage/getSysNewsList',params)
	},
	/* 公告——详情 */
	getSysNewsDetail(params){
		return request.get('/backstage/massageManage/getSysNewsDetail',params)
	},
	/* 公告——新增or修改 */
	addOrUpdateNews(params){
		return request.post('/backstage/massageManage/addOrUpdateNews',params)
	},
	/* 公告——删除 */
	deleteById(params){
		return request.get('/backstage/massageManage/deleteById',params)
	},
	/* 轮播图——列表 */
	getSysBanner(params){
		return request.get('/backstage/massageManage/getSysBanner',params)
	},
	/* 轮播图——新增or修改 */
	addOrUpdateBanner(params){
		return request.post('/backstage/massageManage/addOrUpdateBanner',params)
	},
	/* 轮播图——删除 */
	deleteBannerById(params){
		return request.get('/backstage/massageManage/deleteBannerById',params)
	},
	/* 系统参数列表 */
	getSysConfigList(params){
		return request.get('/backstage/massageManage/getSysConfigList',params)
	},
	/* 修改参数列表 */
	updateSysConfig(params){
		return request.post('/backstage/massageManage/updateSysConfig',params)
	},
	// 上传附件
	// uploadFiles(params) {
	// 	return request.post('/backstage/file/uploadFiles', params, {
	// 		headers: {
	// 			"Content-Type": "multipart/form-data"
	// 		}
	// 	})
	// },
	
}
