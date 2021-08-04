import request from './fetch.js'

export default {
	/*用户列表*/
	getUserList(params) {
		return request.get('/backstage/user/getUserInfoList', params)
	},
	/*用户列表-编辑*/
	updateUserInfo(params) {
		return request.post('/backstage/userManage/updateUserInfo', params)
	},
	//用户管理——用户算力快照
	getUserPowerLogList(params) {
		return request.get('/backstage/userManage/getUserPowerLogList', params)
	},
	// 添加用户算力列表-用户下拉
	getUserOptList(params) {
		return request.get('/backstage/userManage/getUserOptList', params)
	},
	// 查询根节点
	getRecommendTreeRootNode(params) {
		return request.get('/backstage/userManage/getRootTree', params)
	},
	// 查询父节点
	getParentNode(params) {
		return request.get('/backstage/userManage/getTreeParentNode', params)
	},
	// 查询叶节点
	getRecommendTreeLeafNode(params) {
		return request.get('/backstage/userManage/getTreeLeafNode', params)
	},
	// 用户解封
	updateUserType(params) {
		return request.post('/backstage/user/updateUserType', params)
	},
	/* 用户信息 */
	getUserList(params) {
		return request.get('/backstage/userManage/getUserList', params)
	},
	/* 用户USDT地址 */
	getUserEthereumAddress(params) {
		return request.get('/backstage/userManage/getUserEthereumAddress', params)
	},
	/* 用户trc钱包 */
	getUserTrcWalletList(params) {
		return request.get('/backstage/userManage/getUserTrcWalletList', params)
	},
	/* 管理界面用户记录 */
	getBackstageManageUserRecordList(params) {
		return request.get('/backstage/userManage/getBackstageManageUserRecordList', params)
	},
	/* 区块信息 */
	blockInfoList(params) {
		return request.get('/backstage/blockchain/blockInfoList', params)
	},
	/* 节点信息 */
	blockNodeInfoList(params) {
		return request.get('/backstage/blockchain/blockNodeInfoList', params)
	},
	/* 块交易信息 */
	transactionList(params) {
		return request.get('/backstage/blockchain/transactionList', params)
	},
	/* 用户交易记录 */
	getUserTransactionNotesList(params) {
		return request.get('/backstage/userTransaction/getUserTransactionNotesList', params)
	},
	/* 成交订单 */
	getOrderDealNotesList(params) {
		return request.get('/backstage/userTransaction/getOrderDealNotesList', params)
	},
	/* 委托记录 */
	getOrderEntrustNotesList(params) {
		return request.get('/backstage/userTransaction/getOrderEntrustNotesList', params)
	},
}
