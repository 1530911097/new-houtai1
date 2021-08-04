<template>
	<router-view />
</template>

<style lang="scss">
/*全局样式*/
:root {
	--left_sidebar_bg: #2d3a4b;   /* 左侧-侧边栏-背景色 */
	--left_sidebar_width: 210px;  /* 左侧-侧边栏-背景色 */
	--top_header_height: 50px;    /* 顶部-顶栏-背景色 */
	--top_border_color: #ebeef5; /* 顶部-顶栏-边框色 */
	--login_bg: #2d3a4b; /* 登录-背景色 */
	--main_view: #f0f2f5; /* 主视图k-背景色 */
}

* {
	margin: 0;
	padding: 0;
}
html,
body {
	height: 100%;
	min-width: 1000px;
}
.wrap {
	height: 100%;
	display: flex;
	flex-direction: column;
}
/*设置页面查询和表格区域-k*/
.wrap-block {
	margin-bottom: 30px;
}
.wrap-block,
.wrap-table {
	background-color: #fff;
	padding: 20px;
	border-radius: 10px;
}
/*设置页面查询和表格区域-j*/
.wrap-block .input_section {
	/*设置区间输入框的宽度*/
	width: 100px !important;
}
.login-form {
	/*设置登录页label样式*/
	.el-form-item__label {
		color: #fff;
		padding: 0;
	}
}
/*定义数据表格样式-k*/
.wrap-table .el-table th{
	background-color:#fafafa;
}
.wrap-table .el-table th>.cell{
	font-weight: initial;
	font-size: 13px;
	color: #000;
}
.wrap-table .el-table .cell {
	font-size: 12px;
}
.wrap-table .paging{
	text-align: right;
	margin: 20px 0px 0px 0px;
}
/*定义数据表格样式-j*/
/*自定义弹出层样式-k*/
.el-dialog__header{
	padding: 15px !important;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.el-dialog__body{
	    border-top: 1px solid #e8e8e8;
	    border-bottom: 1px solid #e8e8e8;
		padding: 20px !important;
}
.el-dialog__footer{
	padding: 15px !important;
	.el-dialog__headerbtn{
		position: static;
		
	}
}
/*自定义弹出层样式-j*/
/*自定义form-item的间距k*/
.ruleForm .el-form-item{
	margin-bottom:25px !important;
}
/*自定义form-item的间距j*/
/*自定义气泡确认框样式k*/
.el-popconfirm__main{
	margin-bottom: 10px !important;
}
/*自定义气泡确认框样式j*/
</style>
