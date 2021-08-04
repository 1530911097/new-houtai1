import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "@/store";
Vue.use(VueRouter)

const BasicLayout = () => import("@/layout/index.vue");
const RouteView = {
	name: 'RouteView',
	render: (h) => h('router-view')
}
const constantRouter = [{
		path: '/',
		name: 'index',
		component: BasicLayout,
		redirect: '/index',
		children: [{
				path: '/index',
				name: 'index',
				component: () => import('@/views/Index/index'),
				meta: {
					icon: 'el-icon-menu',
					title: '统计报表'
				}
			}, {
				path: '/UserManage',
				name: 'UserManage',
				component: RouteView,
				meta: {
					icon: 'el-icon-user-solid',
					title: '用户管理'
				},
				redirect: '/UserManage/Tree',
				children: [
					/* 	{
							path: "/UserManage/Snapshot",
							name: "快照伞下用户",
							component: () => import("@/views/UserManage/Snapshot.vue")
						}, */
					{
						path: "/UserManage/Tree",
						name: "推荐树",
						component: () => import("@/views/UserManage/Tree.vue")
					}, {
						path: "/UserManage/UserInformation",
						name: "用户信息",
						component: () => import("@/views/UserManage/UserInformation.vue")
					}, {
						path: "/UserManage/UserAddress",
						name: "用户usdt地址",
						component: () => import("@/views/UserManage/UserAddress.vue")
					}, {
						path: "/UserManage/UserTrcWallet",
						name: "用户trc钱包",
						component: () => import("@/views/UserManage/UserTrcWallet.vue")
					}, {
						path: "/UserManage/UserRecord",
						name: "管理界面用户记录",
						component: () => import("@/views/UserManage/UserRecord.vue")
					}
				]
			}, {
				path: '/Information',
				name: 'Information',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-order',
					title: '信息管理'
				},
				redirect: '/Information/Announcement',
				children: [{
					path: "/Information/Announcement",
					name: "公告管理",
					component: () => import("@/views/Information/Announcement.vue")
				}, {
					path: "/Information/Carousel",
					name: "轮播广告",
					component: () => import("@/views/Information/Carousel.vue")
				}, {
					path: "/Information/SystemParameterList",
					name: "系统参数列表",
					component: () => import("@/views/Information/SystemParameterList.vue")
				}]
			}, {
				path: '/Mill',
				name: 'Mill',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-platform',
					title: '链上交易'
				},
				redirect: '/Mill/list',
				children: [{
					path: "/Mill/list",
					name: "区块信息",
					component: () => import("@/views/Mill/list.vue")
				}, {
					path: "/Mill/Order",
					name: "节点列表",
					component: () => import("@/views/Mill/Order.vue")
				}, {
					path: "/Mill/OrderHold",
					name: "区块交易信息",
					component: () => import("@/views/Mill/OrderHold.vue")
				}, ]
			}, {
				path: '/Coins',
				name: 'Coins',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-custom',
					title: '用户交易'
				},
				redirect: '/Coins/BuyList',
				children: [{
						path: "/Coins/BuyList",
						name: "用户交易记录",
						component: () => import("@/views/Coins/BuyList.vue")
					}, {
						path: "/Coins/SellList",
						name: "下单成交记录",
						component: () => import("@/views/Coins/SellList.vue")
					}, {
						path: "/Coins/MakeList",
						name: "下单委托记录",
						component: () => import("@/views/Coins/MakeList.vue")
					}, {
						path: '/Coins/btcBuyList',
						name: 'btc购买记录',
						component: () => import('@/views/Coins/btcBuyList'),
					},
					{
						path: '/Coins/CloudOpenList',
						name: '云矿开户记录',
						component: () => import('@/views/Coins/CloudOpenList'),
					},
					{
						path: '/Coins/CacheFailedRecords',
						name: 'gc开户同步btc缓存异常记录',
						component: () => import('@/views/Coins/CacheFailedRecords'),
					},
				]
			}, {
				path: '/Allwin',
				name: 'Allwin',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-help',
					title: 'Allwin管理'
				},
				redirect: '/Allwin/GameRecord',
				children: [{
						path: "/Allwin/GameRecord",
						name: "游戏记录",
						component: () => import("@/views/Allwin/GameRecord.vue")
					}, {
						path: '/Allwin/GameSession',
						name: '游戏场次',
						component: () => import('@/views/Allwin/GameSession'),
					},
					{
						path: '/Allwin/UserOrepoolAsset',
						name: '用户矿池资产',
						component: () => import('@/views/Allwin/UserOrepoolAsset'),
					},
					{
						path: '/Allwin/UserWithdrawRecord',
						name: '用户提现记录',
						component: () => import('@/views/Allwin/UserWithdrawRecord'),
					},
				]
			},
			{
				path: '/Asset',
				name: 'Asset',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-goods',
					title: '资产管理'
				},
				redirect: '/Asset/UserAssetInformation',
				children: [{
						path: "/Asset/UserAssetInformation",
						name: "用户资产信息",
						component: () => import("@/views/Asset/UserAssetInformation.vue")
					}, {
						path: '/Asset/UserRechargeRecord',
						name: 'ETH充值记录',
						component: () => import('@/views/Asset/UserRechargeRecord.vue'),
					},
					{
						path: '/Asset/WithdrawalRecord',
						name: 'ETH提现记录',
						component: () => import('@/views/Asset/WithdrawalRecord'),
					},
					{
						path: '/Asset/TRCUserRechargeRecord',
						name: 'TRC充值记录',
						component: () => import('@/views/Asset/TRCUserRechargeRecord.vue'),
					},
					{
						path: '/Asset/TRCWithdrawalRecord',
						name: 'TRC提现记录',
						component: () => import('@/views/Asset/TRCWithdrawalRecord'),
					},
					{
						path: '/Asset/UserComputingPower',
						name: '用户算力',
						component: () => import('@/views/Asset/UserComputingPower'),
					},
					{
						path: '/Asset/powlist',
						name: '添加用户算力任务',
						component: () => import('@/views/Asset/powlist'),
					}
				]
			},
			//代币管理
			{
				path: '/Token',
				name: 'Token',
				component: RouteView,
				meta: {
					icon: 'el-icon-s-ticket',
					title: '代币管理'
				},
				redirect: '/Token/TokenInformation',
				children: [{
					path: "/Token/TokenInformation",
					name: "token代币信息 ",
					component: () => import("@/views/Token/TokenInformation.vue")
				}, ]
			},
			{
				path: '/HipHop',
				name: 'HipHop',
				component: RouteView,
				meta: {
					icon: 'el-icon-upload',
					title: '舞种分类'
				},
				redirect: '/HipHop/breaking',
				children: [{
						path: '/HipHop/breaking',
						name: '地板舞',
						component: () => import('@/views/HipHop/breaking.vue')
					},
					{
						path: '/HipHop/popping',
						name: '震撼舞',
						component: () => import('@/views/HipHop/popping.vue')
					},
					{
						path: '/HipHop/locking',
						name: '手指舞',
						component: () => import('@/views/HipHop/locking.vue')
					},
					{
						path: '/HipHop/hiphop',
						name: '嘻哈舞',
						component: () => import('@/views/HipHop/hiphop.vue')
					},
				]
			},
			{
				path: '/Mine',
				name: 'Mine',
				component: RouteView,
				meta: {
					icon: 'el-icon-upload',
					title: '矿池管理'
				},
				redirect: '/Mine/RewardDistributionManagement',
				children: [{
						path: '/Mine/RewardDistributionManagement',
						name: '奖励发放管理',
						component: () => import('@/views/Mine/RewardDistributionManagement'),
					},
					{
						path: '/Mine/UserRewardDistributionRecord',
						name: '用户奖励发放记录',
						component: () => import('@/views/Mine/UserRewardDistributionRecord'),

					},
					{
						path: '/Mine/BestCurrencyHoldingInformation',
						name: '最佳持币信息',
						component: () => import('@/views/Mine/BestCurrencyHoldingInformation'),

					},
					{
						path: '/Mine/RewardStatistics',
						name: '奖励统计信息',
						component: () => import('@/views/Mine/RewardStatistics'),

					}
				]
			},
		]
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/views/Login/login'),
		meta: {
			title: '登录',
		},
	}, {
		path: '/ChangePassword',
		name: 'ChangePassword',
		component: () => import('@/views/Login/ChangePassword'),
		meta: {
			title: '修改密码',
		},
	}, {
		path: '*',
		name: '404',
		component: () => import('@/views/exception/404'),
		meta: {
			title: '修改密码',
		},
	}
]
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: constantRouter
})

store.commit("getMenus", constantRouter);
/* router.beforeEach((to, from, next) => {

	if (to.fullPath != '/Login') {
		if (store.state.token == undefined) {
			router.replace('/Login');
		}
	}
	store.commit("getMenus", constantRouter); 
	next();
}); */
export default router
