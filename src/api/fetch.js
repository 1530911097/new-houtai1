/* 封装axios方法 */
import {
	Message
} from 'element-ui'; //导入element-ui 提示组件
import axios from 'axios'; //导入axios
import router from '@/router';
import utils from '@/common/utils'/*设置基础URL  (动态的根据当前的环境不一样,设置不一样的baseurl)*/
//const BASEURL =  process.env.NODE_ENV === 'production'?'https://api.gc-chain.com/':'http://192.168.3.143:8080/';
const BASEURL =  process.env.NODE_ENV === 'production'?'https://api.gc-chain.com/':'http://192.168.3.10:9092/';


let request = axios.create({
	baseURL: BASEURL,
	timeout: 300 * 1000
})
// 创建一个axios实例,设置实例的基础url和 超时时间
//requset.拦截器.请求.使用111000000000000000000000000

request.interceptors.request.use(
	config => {
		var loginInfo = JSON.parse(sessionStorage.getItem("loginInfo")) || '';
		config.headers.token = loginInfo.token;
		return config
	},
	err => Promise.reject(err)
)

//requset.拦截器-响应
request.interceptors.response.use(
	res => {
		// 写一些业务逻辑  关闭加载提示,301 404 500 等错误响应
		//  res.data.code ==0 ==403 == 1 响应的公共逻辑
		if (res.data.code == 0) {
			Message({
				showClose: true,
				message: res.data.errMsg,
				type: 'error'
			});
			return Promise.reject();
		} else if (res.data.code == 403) { //登录过期
			Message({
				showClose: true,
				message: res.data.errMsg,
				type: 'error'
			});
			sessionStorage.clear();
			router.push('/Login');
			return Promise.reject()
		} else {
			return res;
		}
	},
	err => {
		let status = err.response.status;
		if (err.code === 'ECONNABORTED' || err.message === 'Network Error' || err.message.includes('timeout')) {
			Message({
				showClose: true,
				message: '网络超时',
				type: 'error'
			});
			return Promise.reject(err)
		} else {
			Message({
				showClose: true,
				message: `请求异常:${status}`,
				type: 'error'
			});
			return Promise.reject(err)
		}
	}
)
// 拦截器就是再请求前，响应前 做一些额外的公共的的事情  请求前添加loading显示 响应前 移除loading
// request是有方法 也是 对象 对象的属性是可以动态的添加（动态添加了一个方法叫postURL）
// prosmie对象的实例 有两个结果 .then .catch（异步拿到-等待任意时间获取） 回调函数 成功 
// .then 异步获取到 reslove 返回的数
// .catch 获取到 reject返回的 错误信息
request.post = function(url, data, option = {}) {
	return new Promise(function(resolve, reject) {
		request({
				url: url,
				method: "post",
				data: data,
				...option,
				headers: {
					"Content-Type": "application/json",
					...option.headers
				},
			})
			.then(res => {
				if(option.responseType){
					let contentDisposition = res.headers['content-disposition'];
					if (!contentDisposition) {
						reject();
					}else{
						utils.exportExcel(res.data,res)
						resolve(res.data)
					}
				}else{
					resolve(res.data)
				}
			})
			.catch(err => {
				reject(err)
			})
	})
}
request.get = function(url, params, option = {}) {
	return new Promise(function(resolve, reject) {
		request({
				url: url,
				method: "get",
				params: params,
				...option,
			})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
export default request;
// 导出 request对象
