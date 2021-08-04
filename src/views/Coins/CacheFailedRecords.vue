<!-- 用户矿池资产 -->

<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址:">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>
				<el-form-item label="父级地址:">
					<el-input v-model="formInline.parentAddress" clearable placeholder="请输入父级地址"></el-input>
				</el-form-item>
				<el-form-item label="gc支付类型">
					<el-select v-model="formInline.syncFlag" placeholder="请选择购买状态" style="width: 140px;">
						<el-option label="未同步" value="0"></el-option>
						<el-option label="已同步" value="1"></el-option>
					</el-select>
				</el-form-item>


				<el-form-item label="开户时间">
					<el-date-picker v-model="formInline.time" type="datetimerange" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="同步btc缓存时间">
					<el-date-picker v-model="formInline.time1" type="datetimerange" range-separator="至"
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
						<div v-if="item.title == '同步标志'">
							<span>{{scope.row.syncFlag =="1"? '已同步' : '未同步' }}</span>
						</div>


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
			title: '开户地址',
			dataIndex: 'address',
			align: 'center',

		},
		{
			title: '父级地址',
			dataIndex: 'parentAddress',
			align: 'center',

		},
		{
			title: '开户时间',
			dataIndex: 'createDate',
			align: 'center',
			// sorter:true
		},
		{
			title: '同步btc云矿时间',
			dataIndex: 'syncDate',
			align: 'center',
			// sorter:true
		},
		{
			title: '同步标志',
			dataIndex: 'syncFlag',
			align: 'center',
          slot:true
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
					address: '',
					parentAddress: '',
					syncFlag: '',
					time: [],
					time1: [],
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
					.exportBtcBuyPowerRecordListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
					address: this.formInline.address,
					startGcFee: this.formInline.startGcFee,
					endGcFee: this.formInline.endGcFee,
					startUsdtFee: this.formInline.startUsdtFee,
					endUsdtFee: this.formInline.endUsdtFee,
					startPowerTotal: this.formInline.startPowerTotal,
					endPowerTotal: this.formInline.endPowerTotal,
					startPowerPriceOne: this.formInline.startPowerPriceOne,
					endPowerPriceOne: this.formInline.endPowerPriceOne,
					startDate: this.formInline.time[0] || '',
					endDate: this.formInline.time[1] || '',
					payType:this.formInline.payType,
					column: this.sortField,  
					sortingRules:this.sortOrder,
						/**/

						/* page: this.page,
						pageSize: this.exportType==1 ? this.total : this.pageSize,
						address: this.formInline.address,
						startGcFee: this.formInline.startGcFee,
						endGcFee: this.formInline.endGcFee,
						startUsdtFee: this.formInline.startUsdtFee,
						endUsdtFee: this.formInline.endUsdtFee,
						startPowerTotal: this.formInline.startPowerTotal,
						endPowerTotal: this.formInline.endPowerTotal,
						startPowerPriceOne: this.formInline.startPowerPriceOne,
						endPowerPriceOne: this.formInline.endPowerPriceOne,
						startDate: this.formInline.time[0] || '',
						endDate: this.formInline.time[1] || '',
						payType:this.formInline.payType,
						column: this.sortField,  
						sortingRules:this.sortOrder,
						titles: this.exportCheckedText,
						columns: this.exportChecked, */
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
				this.$api.millApi.getSyncCacheFailedRecords({
						page: this.page,
						pageSize: this.pageSize,
						/**/
					address: this.formInline.address,
					parentAddress: this.formInline.parentAddress,
					startCreateDate: this.formInline.time[0] || '',
					endCreateDate: this.formInline.time[1] || '',
					startSyncBtcDate: this.formInline.time1[0] || '',
					endSyncBtcDate: this.formInline.time1[1] || '',
					syncFlag:this.formInline.syncFlag,

						/* address: this.formInline.address,
						startGcFee: this.formInline.startGcFee,
						endGcFee: this.formInline.endGcFee,
						startUsdtFee: this.formInline.startUsdtFee,
						endUsdtFee: this.formInline.endUsdtFee,
						startPowerTotal: this.formInline.startPowerTotal,
						endPowerTotal: this.formInline.endPowerTotal,
						startPowerPriceOne: this.formInline.startPowerPriceOne,
						endPowerPriceOne: this.formInline.endPowerPriceOne,
						startDate: this.formInline.time[0] || '',
						endDate: this.formInline.time[1] || '',
						payType:this.formInline.payType,
						column: this.sortField,  
						sortingRules:this.sortOrder,
						page: this.page,
						pageSize: this.pageSize, */

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
