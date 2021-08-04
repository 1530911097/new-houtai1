import request  from './fetch.js'

export default{
	/* 区块信息 */
	blockInfoList(params){
		return request.get('/backstage/blockchain/blockInfoList',params)
	},
	/* 节点信息 */
	blockNodeInfoList(params){
		return request.get('/backstage/blockchain/blockNodeInfoList',params)
	},
	/* 块交易信息 */
	transactionList(params){
		return request.get('/backstage/blockchain/transactionList',params)
	},
	
	/* 成交订单 */
	getOrderDealNotesList(params){
		return request.get('/backstage/userTransaction/getOrderDealNotesList',params)
	},
	/* 用户交易记录 */
	getUserTransactionNotesList(params){
		return request.get('/backstage/userTransaction/getUserTransactionNotesList',params)
	},
	/* 委托记录 */
	getOrderEntrustNotesList(params){
		return request.get('/backstage/userTransaction/getOrderEntrustNotesList',params)
	},
	/* btc购买记录 */
	getBtcBuyPowerRecordList(params){
		return request.get('/backstage/userTransaction/getBtcBuyPowerRecordList',params)
	},
	/* 云矿开户记录 */
	getUserInfoExtList(params){
		return request.get('/backstage/userTransaction/getUserInfoExtList',params)
	},
	/* gc开户同步btc缓存异常记录 */
	getSyncCacheFailedRecords(params){
		return request.get('/backstage/userTransaction/getSyncCacheFailedRecords',params)
	},

	
	
	
	/* 用户资产 */
	getUserAssetList(params){
		return request.get('/backstage/userAsset/getUserAssetList',params)
	},
	/* 充值记录 */
	getUserDepositRecordList(params){
		return request.get('/backstage/userAsset/getUserDepositRecordList',params)
	},
	/* 提现记录 */
	getUserWithdrawalsRecord(params){
		return request.get('/backstage/userAsset/getUserWithdrawalsRecord',params)
	},
	/* 充值记录 */
	getUserDepositRecordListTrc(params){
		return request.get('/backstage/userAsset/getUserDepositRecordListTrc',params)
	},
	/* 提现记录 */
	getUserWithdrawalsRecordTrc(params){
		return request.get('/backstage/userAsset/getUserWithdrawalsRecordTrc',params)
	},
	/* 用户算力 */
	getUserPowerList(params){
		return request.get('/backstage/userAsset/getUserPowerList',params)
	},
	
	/*代币列表*/
	getTokenList(params){
		return request.get('/backstage/tokenManage/getTokenList',params)
	},
	
	/*奖励发放管理*/
	getReleaseProcessList(params){
		return request.get('/backstage/poolManage/getReleaseProcessList',params)
	},
	/*用户奖励发放记录*/
	getUserRewardRecordList(params){
		return request.get('/backstage/poolManage/getUserRewardRecordList',params)
	},
	/*最佳持币区记录表*/
	getSysGoodHoldList(params){
		return request.get('/backstage/poolManage/getSysGoodHoldList',params)
	},
	/*奖励统计信息*/
	getRewardTaskLogList(params){
		return request.get('/backstage/poolManage/getRewardTaskLogList',params)
	},
	
	/*添加用户算力任务-列表*/
	addPowerList(params){
		return request.get('/backstage/userManage/getAllocatePowerList',params)
	},
	/*添加用户算力任务-修改*/
	savePower(params){
		return request.post('/backstage/userManage/addAllocatePower',params)
	},
	/*添加用户算力任务-删除*/
	deleteAddPowerList(params){
		return request.get('/backstage/userManage/deleteAllocatePower',params)
	},
	/*矿机下拉列表*/
	getMachineDropDownList(params){
		return request.get('/backstage/cloudMachine/getMachineOptList',params)
	},
}