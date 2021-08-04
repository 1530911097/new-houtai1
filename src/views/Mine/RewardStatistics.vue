<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">


				<el-form-item label="统计时间">
					<el-date-picker v-model="formInline.time" type="datetimerange" range-separator="至"
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
	const columns = [
		// {
		// 	title: '期数',
		// 	dataIndex: 'miningPower',
		// 	align: 'center',
		// },
		{
			title: '全网持币总算力',
			dataIndex: 'holdPowTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '全网总算力',
			dataIndex: 'zonePowTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '总发放持币收益',
			dataIndex: 'rewardAmount1',
			align: 'center',
			sortable: true
		},
		{
			title: '总发放推广收益',
			dataIndex: 'rewardAmount2',
			align: 'center',
			sortable: true
		},
		{
			title: '总持仓人数',
			dataIndex: 'userCountHold',
			align: 'center',
			sortable: true
		},
		{
			title: '持币收益发放人数',
			dataIndex: 'userCountReward1',
			align: 'center',
			sortable: true
		},
		{
			title: '推广收益发放人数',
			dataIndex: 'userCountReward2',
			align: 'center',
			sortable: true
		},
		{
			title: '统计时间',
			dataIndex: 'taskStart',
			align: 'center',
			sortable: true
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
					addrOrAcct: '',
					time: []
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
					.exportRewardTaskLogListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
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
				this.$api.millApi
					.getRewardTaskLogList({
						page: this.page,
						pageSize: this.pageSize,
						startDate: this.formInline.time[0] || '',
						endDate: this.formInline.time[1] || '',
						column: this.sortField,
						sortingRules: this.sortOrder,
						/**/
					})
					.then(res => {
						this.tableData = res.data || [];
						this.total = res.total;
						this.loading = false;
					});
			},
			InputNumber2(e) {
				console.log(e);
				if (this.formInline.endGoodAmount <= this.formInline.startGoodAmount) {
					this.formInline.endGoodAmount = this.formInline.startGoodAmount;
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
