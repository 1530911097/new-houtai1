	<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="交易hash"><el-input v-model="formInline.hash" clearable placeholder="请输入交易hash"></el-input></el-form-item>
				<el-form-item label="转出地址"><el-input v-model="formInline.fromAddr" clearable placeholder="请输入转出地址"></el-input></el-form-item>
				<el-form-item label="转入地址"><el-input v-model="formInline.toAddr" clearable placeholder="请输入转入地址"></el-input></el-form-item>
				<el-form-item label="交易数量">
					<el-input-number v-model="formInline.startActivePower" controls-position="right" @change="InputNumber"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endActivePower" controls-position="right" :min="formInline.startActivePower"></el-input-number>
				</el-form-item>
				<el-form-item label="出块时间">
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
		title: '交易hash值',
		dataIndex: 'hash',
		align: 'center'
	},
	{
		title: '转出地址',
		dataIndex: 'fromAddr',
		align: 'center',
		sortable: true
	},
	{
		title: '转入地址',
		dataIndex: 'toAddr',
		align: 'center',
		sortable: true
	},
	{
		title: '交易币种',
		dataIndex: 'token',
		align: 'center',
		sortable: true
	},
	{
		title: '交易数量',
		dataIndex: 'amount',
		align: 'center',
		sortable: true
	},
	{
		title: '区块高度',
		dataIndex: 'blockHeight',
		align: 'center',
		sortable: true
	},
	{
		title: '区块hash',
		dataIndex: 'blockHash',
		align: 'center'
	},
	{
		title: '交易时间',
		dataIndex: 'inputData',
		align: 'center',
		sortable: true
	},
	{
		title: '出块时间',
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
				hash: '',
				fromAddr: '',
				toAddr: '',
				startActivePower: 0,
				endActivePower: 0,
				time: [],
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
				.exportTransactionListExcel({
					page: this.page,
					pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
					titles: this.$refs.Excel.exportCheckedText(),
					columns: this.$refs.Excel.exportChecked(),
					/**/
					hash: this.formInline.hash,
					fromAddr: this.formInline.fromAddr,
					toAddr: this.formInline.toAddr,
					startAmount: this.formInline.startActivePower || '',
					endAmount: this.formInline.endActivePower || '',
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
				.transactionList({
					page: this.page,
					pageSize: this.pageSize,
					/**/
					hash: this.formInline.hash,
					fromAddr: this.formInline.fromAddr,
					toAddr: this.formInline.toAddr,
					startAmount: this.formInline.startActivePower || '',
					endAmount: this.formInline.endActivePower || '',
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || '',
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
			if (this.formInline.endActivePower <= this.formInline.startActivePower) {
				this.formInline.endActivePower = this.formInline.startActivePower;
			}
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
