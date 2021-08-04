import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/* let loginInfo = JSON.parse(sessionStorage.getItem('loginInfo')) || {}; */
export default new Vuex.Store({
	state: {
		/* token: loginInfo.token, */
		/* loginInfo: loginInfo, */
		menus: [],/*菜单列表*/
	},
	/*存登录信息*/
	mutations: {
	/* 	getLogin(state, Info) {
			// console.log(Info)
			sessionStorage.setItem("loginInfo", JSON.stringify(Info));
			state.loginInfo = Info;
			state.token = Info.token;
		}, */
		getMenus(state, Info) {/*存路由信息*/
			/* sessionStorage.setItem("menus", JSON.stringify(Info)); */
			state.menus = Info;
			// console.log(state.menus)
		},
	},
	actions: {},
	modules: {}
})
