<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="hash值"><el-input v-model="formInline.blockHash" clearable placeholder="请输入hash值"></el-input></el-form-item>
				<el-form-item label="hash高度"><el-input v-model="formInline.blockHeight" clearable placeholder="请输入hash高度"></el-input></el-form-item>
				<el-form-item label="区块交易数"><el-input v-model="formInline.blockTxCount" clearable placeholder="请输入区块交易数"></el-input></el-form-item>
				<el-form-item label="节点名称"><el-input v-model="formInline.nodeName" clearable placeholder="请输入节点名称"></el-input></el-form-item>
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
		title: 'hash值',
		dataIndex: 'blockHash',
		align: 'center'
	},
	{
		title: 'hash高度',
		dataIndex: 'blockHeight',
		align: 'center',
		sortable: true
	},
	{
		title: '区块交易数',
		dataIndex: 'blockTxCount',
		align: 'center',
		sortable: true
	},
	{
		title: '总矿工费',
		dataIndex: 'minnerFee',
		align: 'center',
		sortable: true
	},
	{
		title: '出块节点名称',
		dataIndex: 'nodeName',
		align: 'center'
	},
	{
		title: '节点地址',
		dataIndex: 'nodeAddr',
		align: 'center'
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
				blockHash: '',
				/*hash值*/
				blockTxCount: '',
				/*块交易数*/
				nodeName: '',
				/*节点名称*/
				blockHeight: '',
				/*高度*/
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
				.exportBlockInfoListExcel({
					page: this.page,
					pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
					titles: this.$refs.Excel.exportCheckedText(),
					columns: this.$refs.Excel.exportChecked(),
					/**/
					blockHash: this.formInline.blockHash,
					blockTxCount: this.formInline.blockTxCount,
					nodeName: this.formInline.nodeName,
					blockHeight: this.formInline.blockHeight,
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
				.blockInfoList({
					page: this.page,
					pageSize: this.pageSize,
					/**/
					blockHash: this.formInline.blockHash,
					blockTxCount: this.formInline.blockTxCount,
					nodeName: this.formInline.nodeName,
					blockHeight: this.formInline.blockHeight,
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
