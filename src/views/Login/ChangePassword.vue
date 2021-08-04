<template>
	<div class="wrap">
		<el-form ref="Login_form" :model="form" class="login-form" :rules="rules" label-position="top" label-width="80px">
			<h3 class="title">修改密码</h3>
			<el-form-item class="form-item" prop="name" label="账号">
				<el-input v-model="form.name" placeholder="请输入账号" autocomplete="on" size="medium"></el-input>
			</el-form-item>
			<el-form-item class="form-item" prop="password" label="旧密码">
				<el-input type="password" v-model="form.password" show-password placeholder="请输入旧密码" size="medium"></el-input>
			</el-form-item>
			<el-form-item class="form-item" prop="newPassword" label="新密码">
				<el-input type="password" v-model="form.newPassword" show-password placeholder="请输入新密码" size="medium"  @keyup.enter.native="submitForm"></el-input>
			</el-form-item>
			<div style="margin-top: 40px;"><el-button type="primary" @click="submitForm()" style="width: 100%;" :loading="login_loading">确定</el-button></div>
			<div style="margin-top: 20px;"><el-button type="info" @click="$router.go(-1)" style="width: 100%;">取消</el-button></div>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			login_loading: false,
			form: {
				name: '',
				password: '',
				newPassword: ''
			},
			rules: {
				name: [{ required: true, message: '请输入账号', trigger: 'change' }],
				password: [{ required: true, message: '请输入旧密码', trigger: 'change' }],
				newPassword: [{ required: true, message: '请输新密码', trigger: 'change' }]
			}
		};
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
							that.$router.go(-1);
							that.$message({
								showClose: true,
								message: '修改成功',
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
		}
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
		}
		.form-item {
			margin-bottom: 20px;
		}
	}
}
</style>
