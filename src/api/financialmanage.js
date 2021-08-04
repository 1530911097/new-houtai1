import request from './fetch.js'

export default {
	//提现申请审批
	withdrawalApprove(params) {
		return request.post('/backstage/finance/withdrawalApprove', params)
	},
	// 提现申请
	getUserWithdrawalInfoList(params) {
		return request.get('/backstage/finance/getUserWithdrawalInfoList', params)
	},
	// 用户合约列表
	getUserContractList(params) {
		return request.get('backstage/finance/getUserContractList', params)
	},
	//、用户资产
/* 	getUserAssetList(params) {
		return request.get('/backstage/finance/getUserAssetList', params)
	}, */
	getUserAssetChangeList(params) {
		return request.get('/backstage/finance/getUserAssetChangeList', params)
	},
	//查询算力任务列表
	getPowerTaskList(params) {
		return request.get('/backstage/finance/getPowerTaskList', params)
	},
	// 添加用户算力列表-新增
	savePowerTask(params) {
		return request.post('/backstage/finance/savePowerTask', params)
	},
	// 添加用户算力列表-删除
	deletePowerTask(params) {
		return request.get('/backstage/finance/deletePowerTask', params)
	},
	// 添加用户算力列表-用户下拉
	getUserOptList(params) {
		return request.get('/backstage/userManage/getUserOptList', params)
	},

	updateUserContract(params) {
		return request.post('/backstage/finance/updateUserContract', params)
	},

	//表格导入
	uploadExcelAddPower(params) {
		return request.post('/backstage/finance/uploadExcelAddPower', params, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
	},
	// 矿工推荐奖励记录

	getShareRewardList(params) {
		return request.get('/backstage/finance/getShareRewardList', params)
	},
	// 收益提现记录
	getUserWithdrawalInfoList(params) {
		return request.get('/backstage/finance/getUserWithdrawalInfoList', params)
	},

	// 资产USDT充值记录
	getUsdtDepositRecordList(params) {
		return request.get('/backstage/finance/getUsdtDepositRecordList', params)
	},
	// 用户收益列表
	getContractIncome(params) {
		return request.get('/backstage/finance/getContractIncome', params)
	},
	// 用户订单列表
	getOrderList(params) {
		return request.get('/backstage/finance/getOrderList', params)
	},
	// 用户算力列表
	getUserPowerList(params) {
		return request.get('/backstage/finance/getUserPowerList', params)
	},
	// 用户资产列表
/* 	getUserAssetList(params) {
		return request.get('/backstage/finance/getUserAssetList', params)
	}, */
	// 用户添加资产
	getAddAssetList(params) {
		return request.get('/backstage/finance/getAddAssetList', params)
	},
	// 用户添加资产-充值-下拉
	getUserList(params) {
		return request.get('/backstage/user/getUserList', params)
	},
	// 用户添加资产-充值
	addAsset(params) {
		return request.post('/backstage/finance/addAsset', params)
	},
	// 添加用户算力列表
	addPowerList(params) {
		return request.get('/backstage/finance/addPowerList', params)
	},
	/* 系统参数列表 */
		getSysConfigList(params){
			return request.get('/backstage/massageManage/getSysConfigList',params)
		},
		/* 修改参数列表 */
		updateSysConfig(params){
			return request.post('/backstage/massageManage/updateSysConfig',params)
		},

}
