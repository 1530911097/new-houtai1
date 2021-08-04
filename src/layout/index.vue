<template>
	<div class="wrap">
		<el-container class="admin_container">
			<!-- 左侧-侧边栏K -->
			<el-aside class="admin_left">
				<el-header class="logo">
					<img class="logo_img" src="@/assets/logo.png" />
					<h1 class="logo_title">GC管理系统</h1>
				</el-header>
				<!-- 列表k -->
				<el-menu :default-active="$route.path" background-color="transparent" text-color="#bfcbd9"
					active-text-colo="#409eff" unique-opened router>
					<el-menu-item :index="item.path" v-for="(item, index) in list" :key="index" v-if="!item.children">
						<i class="el-icon-menu"></i>
						<span slot="title">{{ item.meta.title }}</span>
					</el-menu-item>
					<el-submenu :index="item.path" v-else>
						<template slot="title">
							<i :class="item.meta.icon"></i>
							<span slot="title">{{ item.meta.title }}</span>
						</template>
						<el-menu-item-group>
							<el-menu-item :index="Children.path" v-for="(Children, index) in item.children"
								:key="index">{{ Children.name }}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
				<!-- 列表k -->
			</el-aside>
			<!-- 左侧-侧边栏j -->
			<!-- 右侧-主体k -->
			<el-container class="admin_right">
				<!-- 头部k -->
				<el-header class="header">
					<el-dropdown @command="handleCommand">
						<el-avatar class="avatar" shape="square" size="medium"
							src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-avatar>
						<el-dropdown-menu slot="dropdown" style="white-space: nowrap">
							<el-dropdown-item command="/ChangePassword">修改密码</el-dropdown-item>
							<el-dropdown-item command="LogOut" style="border-top: 1px solid #eee">退出登录
							</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-header>
				<!-- 头部j -->
				<!-- 主视图k -->
				<el-main class="">
					<router-view></router-view>
				</el-main>
				<!-- 主视图j -->
			</el-container>
			<!-- 右侧-主体j -->
		</el-container>
	</div>
</template>

<script>
	export default {
		name: "Layout",
		data() {
			return {
				list: [],
			};
		},
		methods: {
			handleCommand(command) {
				/*头像-下拉菜单-回调*/
				if (command == "LogOut") {
					sessionStorage.clear();
					this.$router.push("/Login");
					this.$message("退出成功");
				} else {
					this.$router.push(command);
				}
			},
		},
		mounted() {
			this.list = this.$store.state.menus[0].children;
			// console.log(this.$store.state.menus[0]);
		},
	};
</script>
<style lang="scss">
	.admin_container {
		overflow: auto;

		.admin_left {}

		.admin_right {}
	}

	.admin_left {
		background-color: var(--left_sidebar_bg);
		width: var(--left_sidebar_width) !important;

		.logo {
			display: flex;
			align-items: center;
			color: #fff;

			.logo_img {
				width: 30px;
				height: 30px;
				border-radius: 3px;
			}

			.logo_title {
				margin-left: 10px;
			}
		}
	}

	.header {
		height: var(--top_header_height) !important;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		display: flex;
		justify-content: flex-end;
		align-items: center;
		border-bottom: 1px solid var(--top_border_color);

		.avatar {
			cursor: pointer;
		}
	}

	.el-menu {
		border: none !important;
	}

	.admin_left .el-menu-item-group__title {
		padding: 0;
	}

	.el-submenu__title:hover,
	.el-menu-item:hover,
	.el-submenu__title:focus,
	.el-menu-item:focus {
		background-color: #263445 !important;
	}

	.is-active .el-submenu__title,
	.is-active .el-submenu__title i {
		color: #fff !important;
	}

	.el-main {
		background-color: var(--main_view);
	}
</style>
