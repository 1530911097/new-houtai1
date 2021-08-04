<template>
	<div class="wrap">
		<el-form ref="Login_form" :model="form" class="login-form" :rules="rules" label-width="80px">
			<h3 class="title"><img class="logo" src="@/assets/logo.png">GC管理系统</h3>
			<el-form-item class="form-item" prop="name" label-width="0"><el-input v-model="form.name" placeholder="请输入账号" autocomplete="on" clearable></el-input></el-form-item>
			<el-form-item class="form-item" prop="password" label-width="0">
				<el-input type="password" v-model="form.password" show-password placeholder="请输入密码" @keyup.enter.native="submitForm"></el-input>
			</el-form-item>
			
			<div class="form-item-fixe">
				<el-form-item class="form-item" prop="code" label-width="0"><el-input v-model="form.code" placeholder="请输入验证码" autocomplete="on" @keyup.enter.native="submitForm" clearable ></el-input></el-form-item>
				<div class="code" @click="changeCode">
					<!-- 引入验证码组件 -->
					<identify :identifyCode="identifyCode"></identify>
				</div>
			</div>
			<el-button type="primary" @click="submitForm()" style="width: 100%;" :loading="login_loading">登录</el-button>
		</el-form>
	</div>
</template>

<script>
// 引入验证码组件
import identify from '@/components/identify.vue';
export default {
	name: 'Login',
	data() {
		let validateCode = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入验证码'));
			} else if (value !== this.identifyCode) {
				callback(new Error('请输入正确的验证码'));
			} else {
				callback();
			}
		};
		return {
			login_loading: false,
			// 验证码初始值
			identifyCode: '1234',
			// 验证码的随机取值范围
			identifyCodes: '1234567890',
			form: {
				name: '',
				password: ''
			},
			rules: {
				name: [{ required: true, message: '请输入账号', trigger: 'change' }],
				password: [{ required: true, message: '请输入密码', trigger: 'change' }],
				code: [{ validator: validateCode, trigger: 'change' }]
			}
		};
	},
	mounted() {
		// 显示页面就生成随机验证码
		this.identifyCode = '';
		this.makeCode(this.identifyCodes, 4);
	},
	methods: {
		submitForm() {
			var that = this;
			this.$refs.Login_form.validate(valid => {
				if (valid) {
					that.login_loading = true;
					that.$api.loginApi
						.login({
							account: that.form.name,
							password: that.form.password
						})
						.then(res => {
							console.log(res);
							that.$store.commit('getLogin', res.data);
							that.$router.replace({ path: '/' });
							that.$message({
								showClose: true,
								message: '登陆成功',
								type: 'success'
							});
							that.login_loading = false;
						})
						.catch(res => {
							that.login_loading = false;
						});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 点击验证码刷新验证码
		changeCode() {
			this.identifyCode = '';
			this.makeCode(this.identifyCodes, 4);
		},
		// 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
		randomNum(min, max) {
			max = max + 1;
			return Math.floor(Math.random() * (max - min) + min);
		},
		// 随机生成验证码字符串
		makeCode(data, len) {
			for (let i = 0; i < len; i++) {
				this.identifyCode += data[this.randomNum(0, data.length - 1)];
			}
			console.log(this.identifyCode);
		}
	},
	components: {
		identify
	}
};
</script>

<style lang="scss" scoped="scoped">
.wrap {
	background-color: var(--login_bg) !important;
	.login-form {
		position: relative;
		width: 450px;
		padding: 160px 35px 0;
		margin: 0 auto;
		.title {
			font-size: 26px;
			color: #eee;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
			display: flex;
			align-items: center;
			justify-content: center;
			.logo{
				width: 40px;height: 40px;
				margin-right: 10px;
				border-radius: 4px;
			}
		}
		.form-item {
			margin-bottom: 30px;
			.el-form-item__content {
				margin: 0px !important;
			}
		}
		.form-item-fixe {
			display: flex;
			.form-item{
				width: 100%;
			}
			.code {
				margin-left: 10px;
				margin-top: 1px;
			}
		}
	}
}
</style>
