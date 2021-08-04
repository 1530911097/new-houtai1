import request  from './fetch.js'

export default{
	/*代币列表导出*/
	exportTokenListExcel(params){
		return request.post('/backstage/tokenManage/exportTokenListExcel',params,{
			responseType: 'blob'
		})
	},
	/*用户信息excel导出*/
	exportUserListExcel(params){
		return request.post('/backstage/userManage/exportUserListExcel',params,{
			responseType: 'blob'
		})
	},
	/*用户usdt地址导出*/
	exportUserEthereumAddressExcel(params){
		return request.post('/backstage/userManage/exportUserEthereumAddressExcel',params,{
			responseType: 'blob'
		})
	},
	/*用户trc钱包导出*/
	exportUserTrcWalletListExcel(params){
		return request.post('/backstage/userManage/exportUserTrcWalletListExcel',params,{
			responseType: 'blob'
		})
	},
	/*管理界面用户记录导出*/
	exportBackstageManageUserRecordListExcel(params){
		return request.post('/backstage/userManage/exportBackstageManageUserRecordListExcel',params,{
			responseType: 'blob'
		})
	},
	/*公告导出*/
	exportSysNewsListExcel(params){
		return request.post('/backstage/massageManage/exportSysNewsListExcel',params,{
			responseType: 'blob'
		})
	},
	/*系统参数列表导出*/
	exportSysConfigListExcel(params){
		return request.post('/backstage/massageManage/exportSysConfigListExcel',params,{
			responseType: 'blob'
		})
	},
	/*快信息导出*/
	exportBlockInfoListExcel(params){
		return request.post('/backstage/blockchain/exportBlockInfoListExcel',params,{
			responseType: 'blob'
		})
	},
	/*节点信息导出*/
	exportBlockNodeInfoListExcel(params){
		return request.post('/backstage/blockchain/exportBlockNodeInfoListExcel',params,{
			responseType: 'blob'
		})
	},
	/*块交易导出*/
	exportTransactionListExcel(params){
		return request.post('/backstage/blockchain/exportTransactionListExcel',params,{
			responseType: 'blob'
		})
	},
	/*成交订单导出*/
	exportOrderDealNotesListExcel(params){
		return request.post('/backstage/userTransaction/exportOrderDealNotesListExcel',params,{
			responseType: 'blob'
		})
	},
	/*用户交易记录导出*/
	exportUserTransactionNotesListExcel(params){
		return request.post('/backstage/userTransaction/exportUserTransactionNotesListExcel',params,{
			responseType: 'blob'
		})
	},
	/*委托记录导出*/
	exportOrderEntrustNotesListExcel(params){
		return request.post('/backstage/userTransaction/exportOrderEntrustNotesListExcel',params,{
			responseType: 'blob'
		})
	},
	/*btc购买记录导出*/
	exportBtcBuyPowerRecordListExcel(params){
		return request.post('/backstage/userTransaction/exportBtcBuyPowerRecordListExcel',params,{
			responseType: 'blob'
		})
	},
	/* 云矿开户记录导出*/
	exportUserInfoExtListExcel(params){
		return request.post('/backstage/userTransaction/exportUserInfoExtListExcel',params,{
			responseType: 'blob'
		})
	},
	/* 游戏记录导出*/
	exportGameRecordInfoListExcel(params){
		return request.post('/backstage/allwin/exportGameRecordInfoListExcel',params,{
			responseType: 'blob'
		})
	},
	/* 游戏场次导出*/
	exportGameInfoListExcel(params){
		return request.post('/backstage/allwin/exportGameInfoListExcel',params,{
			responseType: 'blob'
		})
	},
	/* 用户矿池资产导出*/
	exportUserMiningPoolAccountExcel(params){
		return request.post('/backstage/allwin/exportUserMiningPoolAccountExcel',params,{
			responseType: 'blob'
		})
	},
	/* 用户提现记录导出*/
	exportUserWithdrawRecordExcel(params){
		return request.post('/backstage/allwin/exportUserWithdrawRecordExcel',params,{
			responseType: 'blob'
		})
	},
	
	/*用户资产导出*/
	exportUserAssetListExcel(params){
		return request.post('/backstage/userAsset/exportUserAssetListExcel',params,{
			responseType: 'blob'
		})
	},
	/*充值记录导出*/
	exportUserDepositRecordListExcel(params){
		return request.post('/backstage/userAsset/exportUserDepositRecordListExcel',params,{
			responseType: 'blob'
		})
	},
	/*提现记录导出*/
	exportUserWithdrawalsRecordExcel(params){
		return request.post('/backstage/userAsset/exportUserWithdrawalsRecordExcel',params,{
			responseType: 'blob'
		})
	},
	/*TRC充值记录导出*/
	exportUserDepositRecordListExcelTrc(params){
		return request.post('/backstage/userAsset/exportUserDepositRecordListExcelTrc',params,{
			responseType: 'blob'
		})
	},
	/*TRC提现记录导出*/
	exportUserWithdrawalsRecordExcelTrc(params){
		return request.post('/backstage/userAsset/exportUserWithdrawalsRecordExcelTrc',params,{
			responseType: 'blob'
		})
	},
	/*用户算力导出*/
	exportUserPowerListExcel(params){
		return request.post('/backstage/userAsset/exportUserPowerListExcel',params,{
			responseType: 'blob'
		})
	},
	/*奖励发放管理导出*/
	exportReleaseProcessListExcel(params){
		return request.post('/backstage/poolManage/exportReleaseProcessListExcel',params,{
			responseType: 'blob'
		})
	},
	/*用户奖励发放记录导出*/
	exportUserRewardRecordListExcel(params){
		return request.post('/backstage/poolManage/exportUserRewardRecordListExcel',params,{
			responseType: 'blob'
		})
	},
	/*最佳持币区记录表导出*/
	exportSysGoodHoldListExcel(params){
		return request.post('/backstage/poolManage/exportSysGoodHoldListExcel',params,{
			responseType: 'blob'
		})
	},
	/*奖励统计信息导出*/
	exportRewardTaskLogListExcel(params){
		return request.post('/backstage/poolManage/exportRewardTaskLogListExcel',params,{
			responseType: 'blob'
		})
	},
	/*添加用户算力任务*/
	exportAllocatePowerListExcel(params){
		return request.post('/backstage/userManage/exportAllocatePowerListExcel',params,{
			responseType: 'blob'
		})
	},
}