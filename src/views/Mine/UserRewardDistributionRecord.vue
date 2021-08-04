<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="释放期数:">
					<el-input v-model="formInline.cycle" clearable placeholder="请输入释放期数"></el-input>
				</el-form-item>
				<el-form-item label="用户地址:">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>
				<el-form-item label="当期总奖励">
					<el-input-number v-model="formInline.startRewardAmountTotal" controls-position="right" @change="InputNumber2">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endRewardAmountTotal" controls-position="right"
						:min="formInline.startRewardAmountTotal"></el-input-number>
				</el-form-item>

				<el-form-item label="发放时间">
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
						<div v-if="item.title=='释放状态'"><span>{{scope.row.releaseFlag=="1"?'已释放':'未释放'}}</span></div>
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
			title: '期数',
			dataIndex: 'cycle',
			align: 'center',
			sortable:true
		},
		{
			title: '用户地址',
			dataIndex: 'address',
			align: 'center',
			///
		},
		{
			title: '持仓量',
			dataIndex: 'holdAmount',
			align: 'center',
			sortable:true
		},
		{
			title: '推广算力',
			dataIndex: 'zonePow',
			align: 'center',
			sortable:true
		},
		{
			title: '持币收益',
			dataIndex: 'rewardAmount1',
			align: 'center',
			sortable:true
		},
		{
			title: '推广收益',
			dataIndex: 'rewardAmount2',
			align: 'center',
			sortable:true
		},
		{
			title: '当期总收益',
			dataIndex: 'rewardAmountTotal',
			align: 'center',
			sortable:true
		},
		{
			title: '奖励结算时间',
			dataIndex: 'rewardDate',
			align: 'center',
			sortable:true
		},
		{
			title: '奖励发放时间',
			dataIndex: 'releaseDate',
			align: 'center',
			sortable:true
		},
		{
			title: '释放状态',
			dataIndex: 'releaseFlag',
			align: 'center',
			slot: true
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
					cycle:'',
					address:'',
					startRewardAmountTotal:0,
					endRewardAmountTotal:0,
					startDate:[],
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
					.exportUserRewardRecordListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						column: this.sortField,
						sortingRules:this.sortOrder,
						/**/
						cycle:this.formInline.cycle,
						address:this.formInline.address,
						startRewardAmountTotal:this.formInline.startRewardAmountTotal || '',
						endRewardAmountTotal:this.formInline.endRewardAmountTotal || '',
						startDate: this.formInline.startDate[0] || '',
						endDate: this.formInline.startDate[1] || '',
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
					.getUserRewardRecordList({
						page: this.page,
						pageSize: this.pageSize,
						column: this.sortField,
						sortingRules: this.sortOrder,

					cycle:this.formInline.cycle,
					address:this.formInline.address,
					startRewardAmountTotal:this.formInline.startRewardAmountTotal || '',
					endRewardAmountTotal:this.formInline.endRewardAmountTotal || '',
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
				if (this.formInline.endActivePower <= this.formInline.startActivePower) {
					this.formInline.endActivePower = this.formInline.startActivePower;
				}
			},
			InputNumber2(e) {
				console.log(e);
				if (this.formInline.endActivePower2 <= this.formInline.startActivePower2) {
					this.formInline.endActivePower2 = this.formInline.startActivePower2;
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
