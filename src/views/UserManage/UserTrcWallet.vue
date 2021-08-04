<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="地址"><el-input v-model="formInline.address" clearable placeholder="请输入地址"></el-input></el-form-item>
				<el-form-item label="TRC地址"><el-input v-model="formInline.trcAddress" clearable placeholder="请输入ERC20"></el-input></el-form-item>
				<el-form-item label="创建日期">
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
		<!-- 查询条件j -->
		<div class="wrap-table">
			<ExportExcel ref="Excel" :list="columns" @exportOk="exportOk"></ExportExcel>
			<!-- 数据表格k -->
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
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
			<!-- 分页 k -->
			<el-pagination
				class="paging"
				@current-change="getData"
				:page-size="pageSize"
				layout="total, prev, pager, next, jumper"
				:total="total"
				:hide-on-single-page="true"
			></el-pagination>
			<!-- 分页 j -->
		</div>
	</div>
</template>

<script>
import Drawer from '@/components/Drawer.vue';
import ExportExcel from '@/components/ExportExcel.vue';
/*表头k*/
const columns = [
	{
		title: '用户地址',
		dataIndex: 'userAddr',
		align: 'center'
	},
	{
		title: 'TRC20地址',
		dataIndex: 'userTrc20WalletAddr',
		align: 'center'
	},
	{
		title: 'TRC20私钥',
		dataIndex: 'userTrc20WalletPk',
		align: 'center'
	},
	{
		title: '创建时间',
		dataIndex: 'createDate',
		align: 'center',
		sortable: true
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
			formInline: {
				/*查询*/
				address: '', 
				trcAddress: '', 
				time:[]
			},
			columns /*表头*/,
			tableData: [] /*表格-数据*/
		};
	},
	methods: {
		exportOk() {
			/* 导出 */
			this.$refs.Excel.Excel_loading = true;
			this.$api.exportExcelApi
				.exportUserTrcWalletListExcel({
					page: this.page,
					pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
					titles: this.$refs.Excel.exportCheckedText(),
					columns: this.$refs.Excel.exportChecked(),
					/**/
					address: this.formInline.address,
					trcAddress: this.formInline.trcAddress,
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || ''
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
			/*页面数据*/
			this.page = info;
			this.loading = true;
			this.$api.usermanageApi
				.getUserTrcWalletList({
					page: this.page,
					pageSize: this.pageSize,
					/**/
					address: this.formInline.address,
					trcAddress: this.formInline.trcAddress,
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || ''
					/**/
				})
				.then(res => {
					this.tableData = res.data || [];
					this.total = res.total;
					this.loading = false;
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
