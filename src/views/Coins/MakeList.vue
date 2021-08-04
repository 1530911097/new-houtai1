<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址"><el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input></el-form-item>
				<el-form-item label="交易类型">
					<el-select v-model="formInline.txType" placeholder="请选择交易类型" style="width: 140px;">
						<el-option label="买" value="1"></el-option>
						<el-option label="卖" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="委托状态">
					<el-select v-model="formInline.txFlag" placeholder="请选择委托状态" style="width: 140px;">
						<el-option label="未成交" value="1"></el-option>
						<el-option label="部分成交" value="2"></el-option>
						<el-option label="已完成" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="撤销状态">
					<el-select v-model="formInline.txCancelFlag" placeholder="请选择撤销状态" style="width: 140px;" >
						<el-option label="未撤销" value="0"></el-option>
						<el-option label="已撤销" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="下单时间">
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
						<div v-if="item.title == '交易类型'">
							<span>{{scope.row.txType|formatTxType }}</span>
						</div>
						<div v-if="item.title == '委托状态'">
							<span>{{scope.row.txFlag | formatTxFlag }}</span>
						</div>
						<div v-if="item.title == '撤销状态'">
							<span>{{scope.row.txCancelFlag | formatTxCancelFlag }}</span>
						</div>
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
		dataIndex: 'address',
		align: 'center'
	},
	{
		title: '交易类型',
		dataIndex: 'txType',
		align: 'center',
		slot: true,
	},
	{
		title: '挂单价格',
		dataIndex: 'price',
		align: 'center',
		sortable: true
	},
	{
		title: '总挂单数量',
		dataIndex: 'amount',
		align: 'center',
		sortable: true,
	},
	{
		title: '已成交数',
		dataIndex: 'txAmount',
		align: 'center',
		sortable: true,
	},
	{
		title: '已完成金额',
		dataIndex: 'txUsdt',
		align: 'center',
		sortable: true,
	},
	{
		title: '委托状态',
		dataIndex: 'txFlag',
		align: 'center',
		slot: true,
	},
	{
		title: '撤销状态',
		dataIndex: 'txCancelFlag',
		align: 'center',
		slot: true,
	},
	{
		title: '交易hash',
		dataIndex: 'txHash',
		align: 'center'
	},
	{
		title: '下单时间',
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
				address: '' /*用户地址*/,
				txType:0,
				txFlag: 0,
				txCancelFlag: undefined,
				time: []
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
				.exportOrderEntrustNotesListExcel({
					page: this.page,
					pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
					titles: this.$refs.Excel.exportCheckedText(),
					columns: this.$refs.Excel.exportChecked(),
					/**/
					address: this.formInline.address,
					txType: this.formInline.txType || '',
					txFlag: this.formInline.txFlag || '',
					txCancelFlag: this.formInline.txCancelFlag === undefined ? this.formInline.txCancelFlag: this.formInline.txCancelFlag,
					column: this.sortField,  
					sortingRules:this.sortOrder,
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || '',
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
				.getOrderEntrustNotesList({
					page: this.page,
					pageSize: this.pageSize,
					/**/
					address: this.formInline.address,
					txType: this.formInline.txType || '',
					txFlag: this.formInline.txFlag || '',
					txCancelFlag: this.formInline.txCancelFlag === undefined ? this.formInline.txCancelFlag: this.formInline.txCancelFlag,
					column: this.sortField,  
					sortingRules:this.sortOrder,
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || '',
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
