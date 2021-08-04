<template>
	<div class="wrap">
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small" ref="ruleForm">
				<el-form-item label="key"><el-input v-model="formInline.key" placeholder="请输入key" clearable></el-input></el-form-item>
				<el-button type="primary" @click="getData(1)" size="small">查 询</el-button>
			</el-form>
		</div>
		<div class="wrap-table">
			<ExportExcel ref="Excel" :list="columns" @exportOk="exportOk"></ExportExcel>
			<el-table :data="tableData" v-loading="loading">
				<el-table-column
					v-for="(item, index) in columns"
					:key="index"
					:prop="item.dataIndex"
					:label="item.title"
					:align="item.align"
					:fixed="item.fixed"
					:sortable="item.sortable"
					:width="item.width"
				>
					<template slot-scope="scope">
						<!-- 默认的数据渲染k -->
						<span v-if="!item.slot">{{ scope.row[item.dataIndex] }}</span>
						<!-- 默认的数据渲染j -->
						<!-- 以下单独 slot 如果不需要可以删除 k -->

						<div v-if="item.title == '操作'"><el-button icon="el-icon-edit" type="primary" @click.native.prevent="Edit(scope.row)" size="small">编辑</el-button></div>
						<!-- 以下单独 slot 如果不需要可以删除 j -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
			<el-pagination
				class="paging"
				@current-change="getData"
				:page-size="pageSize"
				layout="total, prev, pager, next, jumper"
				:total="total"
				:hide-on-single-page="true"
			></el-pagination>
		</div>
		<el-dialog title="编辑" :visible.sync="visible" width="500px">
			<div>
				<el-form label-position="right" :model="form" label-width="130px" size="small" :rules="rules" ref="ruleForm" class="ruleForm">
					<el-form-item label="参数key:" prop="configKey">
						<el-input v-model="form.configKey" placeholder="请输入参数key"></el-input>
					</el-form-item>
					<el-form-item label="参数value:" prop="configValue">
						<el-input v-model="form.configValue" placeholder="请输入参数value"></el-input>
					</el-form-item>
					<el-form-item label="枚举描述:" prop="remark">
						<el-input v-model="form.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入枚举描述"></el-input>
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
import ExportExcel from '@/components/ExportExcel.vue';
/*表头k*/
const columns = [
	{
		title: '参数key',
		dataIndex: 'configKey',
		align: 'center'
	},
	{
		title: '参数value',
		dataIndex: 'configValue',
		align: 'center',
	},
	{
		title: '枚举描述',
		dataIndex: 'remark',
		align: 'center',
	},
	{
		title: '创建时间',
		dataIndex: 'createDate',
		align: 'center',
		sortable: true,
	},
	{
		title: '操作',
		dataIndex: '',
		align: 'center',
		fixed: 'right',
		slot: true,
		width: 100
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
			formInline: {
				key: ''
			},
			form: {},
			rules: {
				/*表单验证*/
				configKey: [
					{
						required: true,
						message: '请输入参数key',
						trigger: 'change'
					}
				],
				configValue: [
					{
						required: true,
						message: '请输入参数value',
						trigger: 'change'
					}
				],
				remark: [
					{
						required: true,
						message: '请输入枚举描述',
						trigger: 'change'
					}
				]
			},
			tableData: [],
			Refuse_loading: false,
			visible: false,
			visible_loading: false
		};
	},
	methods: {
		exportOk() {
			/* 导出 */
			this.$refs.Excel.Excel_loading = true;
			this.$api.exportExcelApi
				.exportSysConfigListExcel({
					page: this.page,
					pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
					titles: this.$refs.Excel.exportCheckedText(),
					columns: this.$refs.Excel.exportChecked(),
					/**/
					key: this.formInline.key
					/**/
				})
				.then(res => {
					this.$refs.Excel.Excel_loading = false;
					this.$refs.Excel.exportVisible = false;
					this.$message.success('导出成功');
				})
				.catch(err => {
					this.$refs.Excel.Excel_loading = false;
					this.$message.error('导出失败');
				});
		},
		getData(info = 1) {
			/* 页面数据 */
			this.page = info;
			this.loading = true;
			console.log(this.formInline.time);
			this.$api.financialmanageApi
				.getSysConfigList({
					page: this.page,
					pageSize: this.pageSize,
					/**/
					key: this.formInline.key
					/**/
				})
				.then(res => {
					this.tableData = res.data || [];
					this.total = res.total;
					this.loading = false;
				});
		},
		Edit(info) {
			this.form = Object.assign({}, info);
			this.visible = true;
		},
		visibleOk() {/*弹窗确定回调*/
			this.visible_loading = true;
			this.$refs.ruleForm.validate(valid => {
				if (valid) {
					this.visible_loading = true;
					this.$api.financialmanageApi
						.updateSysConfig({
							id:this.form.id,
							configKey:this.form.configKey,
							configValue:this.form.configValue,
							remark:this.form.remark,
							createDate:this.form.createDate,
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
	},
	components: {
		ExportExcel
	}
};
</script>

<style lang="scss" scoped="scoped"></style>
