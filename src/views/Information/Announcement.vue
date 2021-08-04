<template>
	<div class="wrap">
		<!--查询条件 -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-button type="primary" @click="Edit(false, 'add')" size="small" icon="el-icon-plus" style="margin-right: 10px;">添 加</el-button>
				<el-form-item label="创建时间">
					<el-date-picker
						v-model="formInline.time"
						type="datetimerange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-button type="primary" @click="getData(1)" size="small">查 询</el-button>
			</el-form>
		</div>
		
		<!-- 表格 -->
		<div class="wrap-table">
			<el-table :data="tableData" v-loading="loading">
				<el-table-column
					v-for="(item, index) in columns"
					:key="index"
					:prop="item.dataIndex"
					:label="item.title"
					:align="item.align"
					:fixed="item.fixed"
					:sortable="item.sortable"
				>
					<template slot-scope="scope">
						<!-- 默认的数据渲染k -->
						<span v-if="!item.slot">{{ scope.row[item.dataIndex] }}</span>
						<!-- 默认的数据渲染j -->
						<div v-if="item.title == '操作'">
							<el-popconfirm title="是否确认删除该项?" icon="el-icon-info" icon-color="red" @confirm="Delete(scope.row)">
								<el-button slot="reference" icon="el-icon-delete" type="danger" size="small" :loading="Delete_loading">删除</el-button>
							</el-popconfirm>
							<div style="margin-bottom: 10px;"></div>
							<el-button icon="el-icon-edit" type="primary" @click.native.prevent="Edit(scope.row)" size="small">编辑</el-button>
						</div>
						<!-- 以下单独 slot 如果不需要可以删除 j -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
		</div>
		
		<!-- 弹框导出操作 -->
		<el-dialog :title="title" :visible.sync="visible" width="500px">
			<div>
				<el-form label-position="right" :model="form" label-width="100px" size="small" :rules="rules" ref="ruleForm" class="ruleForm">
					<el-form-item label="标题:" prop="title"><el-input v-model="form.title" placeholder="请输入标题"></el-input></el-form-item>
					<el-form-item label="序号:" prop="sort"><el-input v-model="form.sort" placeholder="请输入序号"></el-input></el-form-item>
					<el-form-item label="创建时间:" prop="createDate">
						<el-date-picker v-model="form.createDate" type="datetime" placeholder="选择日期时间" style="width: 100%;"></el-date-picker>
					</el-form-item>
				
					<el-form-item label="内容:" prop="content"><el-input type="textarea" v-model="form.content" :autosize="{ minRows: 2, maxRows: 4 }"></el-input></el-form-item>
					<el-form-item label="详细内容:" prop="richContent">
						<el-input type="textarea" v-model="form.richContent" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="(visible = false), $refs.ruleForm.resetFields()" size="small">取 消</el-button>
				<el-button type="primary" @click="visibleOk" :loading="visible_loading" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
/*表头k*/
const columns = [
	{
		title: '标题',
		dataIndex: 'title',
		align: 'center'
	},
	{
		title: '内容',
		dataIndex: 'content',
		align: 'center'
	},
	{
		title: '序号',
		dataIndex: 'sort',
		align: 'center',
		sortable: true
	},
	{
		title: '创建时间',
		dataIndex: 'createDate',
		align: 'center',
		sortable: true
	},
	{
		title: '操作',
		dataIndex: '',
		align: 'center',
		fixed: 'right',
		slot: true
	}
];
/*表头j*/
export default {
	name: '',
	data() {
		return {
			page: 1,
			pageSize: 10,
			total: 0,
			loading: false,
			columns /*表头*/,
			tableData: [],
			formInline: {
				/*查询*/
				time: []
			},
			rules: {
				/*表单验证*/
				/* title: [
					{
						required: true,
						message: '请输入标题',
						trigger: 'change'
					}
				],
				sort: [
					{
						required: true,
						message: '请输入序号',
						trigger: 'change'
					}
				],
				createDate: [
					{
						required: true,
						message: '请选择时间',
						trigger: 'change'
					}
				],
				content: [
					{
						required: true,
						message: '请输入内容',
						trigger: 'change'
					}
				],
				richContent: [
					{
						required: true,
						message: '请输入详细详情',
						trigger: 'change'
					}
				] */
			},
			form: {
				title: '',
				newsFlag: '',
				createDate: [],
				richContent: '',
				sort: undefined,
				updateDate:''
			},
			title: '' /*弹出层标题*/,
			visible_loading: false /*弹出层loading*/,
			visible: false /*弹出层show*/,
			Delete_loading: false
		};
	},
	methods: {
		getData(info = 1) {
			/* 页面数据 */
			this.page = info;
			this.loading = true;
			this.$api.informationmanageApi.getSysNewsList({
				page: this.page,
				pageSize: this.pageSize,
				/**/
				startDate: this.formInline.time[0] || '',
				endDate: this.formInline.time[1] || ''
				/**/
			}).then(res => {
				this.tableData = res.data || [];
				this.total = res.total;
				this.loading = false;
			});
		},
		Edit(data, type) {
			/*编辑/添加*/
			console.log(data);
			console.log(this.form);
			this.title = type == 'add' ? '添加' : '编辑';
			if (data) {
				this.form = Object.assign({}, data);
			} else {
				this.form = {};
			}
			this.visible = true;
		},
		Delete(e) {
			/*删除*/
			console.log(e);
			this.Delete_loading = true;
			this.$api.informationmanageApi
				.deleteById({
					id: e.id
				})
				.then(res => {
					this.$message.success(res.data);
					this.getData();
					this.Delete_loading = false;
				});
		},
		visibleOk() {
			/*弹窗确定回调*/
			console.log(this.form)
			// return false;
			this.visible_loading = true;
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.$api.informationmanageApi
						.addOrUpdateNews({
							id:this.form.id,
							content:this.form.content,
						    createDate: this.$public_Time(this.form.createDate) || '',
							updateDate: this.$public_Time(this.form.updateDate) || '',
							richContent: this.form.richContent,
							sort: parseInt(this.form.sort),
							title: this.form.title,
						})
						.then(res => {
							this.getData();
							this.visible = false;
							this.visible_loading = false;
							this.$message.success(res.data);
							this.$refs.ruleForm.resetFields();
						})
						.catch(res => {
							this.visible_loading = false;
						});
				} else {
					this.visible_loading = false;
					return false;
				}
			});
		}
	},
	mounted() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped="scoped">
.upload-list {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 15px;
	padding: 8px;
	border: 1px solid #d9d9d9;
	border-radius: 4px;
	.upload-list-left {
		line-height: 0;
		display: flex;
		align-items: center;
		span {
			margin-left: 10px;
		}
	}
	.el-icon-delete {
		cursor: pointer;
	}
}
</style>
