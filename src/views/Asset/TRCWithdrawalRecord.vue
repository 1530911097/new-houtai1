<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址">
					<el-input v-model="formInline.userAddress" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>
				<el-form-item label="提现到账地址">
					<el-input v-model="formInline.toAddress" clearable placeholder="请输入提现到账地址"></el-input>
				</el-form-item>
				<el-form-item label="申请金额">
					<el-input-number v-model="formInline.startAmount" controls-position="right" @change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endAmount" controls-position="right"
						:min="formInline.startAmount"></el-input-number>
				</el-form-item>


				<el-form-item label="申请时间">
					<el-date-picker v-model="formInline.startDate" type="datetimerange" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-button type="primary" @click="getData(1)" size="small">查 询</el-button>
			</el-form>
		</div>
		<!-- 查询条件j -->
		<div class="wrap-table">
			<ExportExcel ref="Excel" :list="columns" @exportOk="exportOk"></ExportExcel>
			<!-- 数据表格k -->
			<el-table :data="tableData" v-loading="loading">
				<el-table-column v-for="(item, index) in columns" :key="index" :prop="item.dataIndex"
					:label="item.title" :align="item.align" :fixed="item.fixed" :sortable="item.sortable"
					:width="item.width">
					<template slot-scope="scope">
						<!-- 默认的数据渲染k -->
						<span v-if="!item.slot">{{ scope.row[item.dataIndex] }}</span>
						<div v-if="item.title=='提现状态'">
							<span>{{scope.row.withdrFlag|formatWithdrFlag}}</span>
						</div>
						<!-- 默认的数据渲染j -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
			<!-- 分页 k -->
			<el-pagination class="paging" @current-change="getData" :page-size="pageSize"
				layout="total, prev, pager, next, jumper" :total="total" :hide-on-single-page="true"></el-pagination>
			<!-- 分页 j -->
		</div>
	</div>
</template>

<script>
	import Drawer from '@/components/Drawer.vue';
	import ExportExcel from '@/components/ExportExcel.vue';
	/*表头k*/
	const columns = [{
			title: '用户地址',
			dataIndex: 'userAddress',
			align: 'center',

		},
		{
			title: '提现到账地址',
			dataIndex: 'toAddress',
			align: 'center',

		},
		{
			title: '申请金额',
			dataIndex: 'amount',
			align: 'center',
			sortable: true
		},
		{
			title: '提现状态',
			dataIndex: 'withdrFlag',
			align: 'center',
			slot: true
		},
		{
			title: '汇出hash',
			dataIndex: 'withdrHash',
			align: 'center',

		},
		{
			title: '申请时间',
			dataIndex: 'confirmDate',
			align: 'center',
			sortable: true
		},
		{
			title: '交易确认时间',
			dataIndex: 'createDate',
			align: 'center',
			sortable: true
		},
		{
			title: '区块链名称',
			dataIndex: 'chainToken',
			align: 'center',

		},
		{
			title: '描述',
			dataIndex: 'remark',
			align: 'center',

		},
		{
			title: '失败重发次数',
			dataIndex: 'retrySendCount',
			align: 'center',

		},
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
					userAddress: '',
					startAmount: 0,
					endAmount: 0,
					txHash: '',
					startDate: [],

				},
				columns /*表头*/ ,
				tableData: [] /*表格-数据*/
			};
		},
		methods: {
			exportOk() {
				/* 导出 */
				this.$refs.Excel.Excel_loading = true;
				this.$api.exportExcelApi
					.exportUserWithdrawalsRecordExcelTrc({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
						userAddress: this.formInline.userAddress,
						toAddress: this.formInline.toAddress,
						startAmount: this.formInline.startAmount || '',
						endAmount: this.formInline.endAmount || '',
						startDate: this.formInline.startDate[0] || '',
						endDate: this.formInline.startDate[1] || '',
						column: this.sortField,
						sortingRules: this.sortOrder,
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
				this.$api.millApi
					.getUserWithdrawalsRecordTrc({
						page: this.page,
						pageSize: this.pageSize,
						column: this.sortField,
						sortingRules: this.sortOrder,

						userAddress: this.formInline.userAddress,
						toAddress: this.formInline.toAddress,
						startAmount: this.formInline.startAmount || '',
						endAmount: this.formInline.endAmount || '',
						startDate: this.formInline.startDate[0] || '',
						endDate: this.formInline.startDate[1] || '',



						/**/
					})
					.then(res => {
						this.tableData = res.data || [];
						this.total = res.total;
						this.loading = false;
					});
			},
			InputNumber(e) {
				console.log(e);
				if (this.formInline.endAmount <= this.formInline.startAmount) {
					this.formInline.endAmount = this.formInline.startAmount;
				}
			},
		
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
