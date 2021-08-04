<!-- 用户矿池资产 -->

<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址:">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>

				<el-form-item label="用户投入总GC:">
					<el-input-number v-model="formInline.startBalance" controls-position="right" @change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endBalance" controls-position="right"
						></el-input-number>
				</el-form-item>
				<el-form-item label="用户矿池余额:">
					<el-input-number v-model="formInline.startMiningBalance" controls-position="right"
						@change="InputNumber1"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endMiningBalance" controls-position="right"
						></el-input-number>
				</el-form-item>
				<el-form-item label="持有奖励速度:">
					<el-input-number v-model="formInline.startKeepOutput" controls-position="right"
						@change="InputNumber2"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endKeepOutput" controls-position="right"
						></el-input-number>
				</el-form-item>
				<el-form-item label="待产gc总量:">
					<el-input-number v-model="formInline.startForecastOutput" controls-position="right"
						@change="InputNumber3"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endForecastOutput" controls-position="right"
						></el-input-number>
				</el-form-item>
				<el-form-item label="推广奖励:">
					<el-input-number v-model="formInline.startPromTotal" controls-position="right"
						@change="InputNumber4"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endPromTotal" controls-position="right"
						></el-input-number>
				</el-form-item>
				<el-form-item label="提现时间">
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
	const columns = [{
			title: '用户地址',
			dataIndex: 'userAddress',
			align: 'center',
		},
		{
			title: '用户投入总GC',
			dataIndex: 'balance',
			align: 'center',
			sortable: true
		},
		{
			title: '用户矿池余额',
			dataIndex: 'miningBalance',
			align: 'center',
			sortable: true
		},
		{
			title: '持有奖励速度',
			dataIndex: 'keepOutput',
			align: 'center',
			sortable: true
		},
		{
			title: '提现日期',
			dataIndex: 'withdrawDate',
			align: 'center',
			sortable: true
		},
		{
			title: '待产gc总量',
			dataIndex: 'forecastOutput',
			align: 'center',
			sortable: true
		},
		{
			title: '推广奖励',
			dataIndex: 'promTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '最后一次更新时间',
			dataIndex: 'updateDate',
			align: 'center',
			sortable: true
		},
		{
			title: '创建时间',
			dataIndex: 'createDate',
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
					/*查询*/
					address: '',
					startBalance: undefined,
					endBalance: undefined,
					startMiningBalance: undefined,
					endMiningBalance: undefined,
					startKeepOutput: undefined,
					endKeepOutput: undefined,
					startForecastOutput: undefined,
					endForecastOutput: undefined,
					startPromTotal: undefined,
					endPromTotal: undefined,
					time: [],
				},
				sortField:'',//升降序字段
				sortOrder:'',//升降序 descend（降序） ascend（升序）
				columns /*表头*/ ,
				tableData: [] /*表格-数据*/
			};
		},
		methods: {
			exportOk() {
				/* 导出 */
				this.$refs.Excel.Excel_loading = true;
				this.$api.exportExcelApi
					.exportUserMiningPoolAccountExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
						
					
						
						address: this.formInline.address,
						startBalance: this.formInline.startBalance,
						endBalance: this.formInline.endBalance,
						startMiningBalance: this.formInline.startMiningBalance,
						endMiningBalance: this.formInline.endMiningBalance,
						startKeepOutput: this.formInline.startKeepOutput,
						endKeepOutput: this.formInline.endKeepOutput,
						startForecastOutput: this.formInline.startForecastOutput,
						endForecastOutput: this.formInline.endForecastOutput,
						startPromTotal: this.formInline.startPromTotal,
						endPromTotal: this.formInline.endPromTotal,
						startWithdrawDate: this.formInline.time[0] || '',
						endWithdrawDate: this.formInline.time[1] || '',
						
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
				this.$api.allwinApi.getUserMiningPoolAccount({
				
						address: this.formInline.address,
						startBalance: this.formInline.startBalance,
						endBalance: this.formInline.endBalance,
						startMiningBalance: this.formInline.startMiningBalance,
						endMiningBalance: this.formInline.endMiningBalance,
						startKeepOutput: this.formInline.startKeepOutput,
						endKeepOutput: this.formInline.endKeepOutput,
						startForecastOutput: this.formInline.startForecastOutput,
						endForecastOutput: this.formInline.endForecastOutput,
						startPromTotal: this.formInline.startPromTotal,
						endPromTotal: this.formInline.endPromTotal,
						startWithdrawDate: this.formInline.time[0] || '',
						endWithdrawDate: this.formInline.time[1] || '',
						column: this.sortField,  
						sortingRules:this.sortOrder,
						
						page: this.page,
						pageSize: this.pageSize,
						/**/
					})
					.then(res => {
						console.log(res.data)
						this.tableData = res.data || [];
						this.total = res.total;
						this.loading = false;
					});
			},
			InputNumber(e) {
				console.log(e);
				if (this.formInline.startBalance <= this.formInline.endBalance) {
					this.formInline.startBalance = this.formInline.endBalance;
				}
			},
			InputNumber1(e) {
				console.log(e);
				if (this.formInline.endMiningBalance <= this.formInline.startMiningBalance) {
					this.formInline.endMiningBalance = this.formInline.startMiningBalance;
				}
			},
			InputNumber2(e) {
				console.log(e);
				if (this.formInline.endKeepOutput <= this.formInline.startKeepOutput) {
					this.formInline.endKeepOutput = this.formInline.startKeepOutput;
				}
			},
			InputNumber3(e) {
				console.log(e);
				if (this.formInline.endForecastOutput <= this.formInline.startForecastOutput) {
					this.formInline.endForecastOutput = this.formInline.startForecastOutput;
				}
			},
			InputNumber4(e) {
				console.log(e);
				if (this.formInline.endPromTotal <= this.formInline.startPromTotal) {
					this.formInline.endPromTotal = this.formInline.startPromTotal;
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
