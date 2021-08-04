import request  from './fetch.js'

export default{
	/* 游戏记录 */
	getGameRecordInfoList(params){
		return request.get('/backstage/allwin/getGameRecordInfoList',params)
	},
	/* 游戏场次 */
	getGameInfoList(params){
		return request.get('/backstage/allwin/getGameInfoList',params)
    },
    /* 用户矿池资产 */
	getUserMiningPoolAccount(params){
		return request.get('/backstage/allwin/getUserMiningPoolAccount',params)
    },
    /* 用户提现记录 */
	getUserWithdrawRecord(params){
		return request.get('/backstage/allwin/getUserWithdrawRecord',params)
	},
}