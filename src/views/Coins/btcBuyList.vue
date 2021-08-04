<!-- 用户矿池资产 -->

<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址:">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>

				<el-form-item label="gc消费数量:">
					<el-input-number v-model="formInline.startGcFee" controls-position="right" @change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endGcFee" controls-position="right"></el-input-number>
				</el-form-item>
				<el-form-item label="usdt消费数量:">
					<el-input-number v-model="formInline.startUsdtFee" controls-position="right" @change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endUsdtFee" controls-position="right"></el-input-number>
				</el-form-item>
				<el-form-item label="购买算力值:">
					<el-input-number v-model="formInline.startPowerTotal" controls-position="right"
						@change="InputNumber"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endPowerTotal" controls-position="right"></el-input-number>
				</el-form-item>
				<el-form-item label="购买单价:">
					<el-input-number v-model="formInline.startPowerPriceOne" controls-position="right"
						@change="InputNumber"></el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endPowerPriceOne" controls-position="right"></el-input-number>
				</el-form-item>
				<el-form-item label="gc支付类型">
					<el-select v-model="formInline.payType" placeholder="请选择交易类型" style="width: 140px;">
						<el-option label="gc余额支付" value="0"></el-option>
						<el-option label="allWin余额" value="1"></el-option>
					</el-select>
				</el-form-item>


				<el-form-item label="交易时间">
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
						<div v-if="item.title == 'gc支付类型'">
							<span>{{scope.row.payType==0?'gc余额支付' : 'all win余额支付'}}</span>
						</div>
						<div v-if="item.title == '同步云算力标志'">
							<span>{{scope.row.syncFlag ==1? '已同步' : '未同步' }}</span>
						</div>


					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
			<!-- 分页 k -->
			<el-pagination  class="paging" @current-change="getData" :page-size="pageSize"
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
			dataIndex: 'address',
			align: 'center',
			ellipsis: true,
			/* scopedSlots: {
				customRender: 'address'
			}, */
		},
		{
			title: 'gc消费数',
			dataIndex: 'gcFee',
			align: 'center',
			sortable: true
		},
		{
			title: 'GC兑cny汇率',
			dataIndex: 'gcCny',
			align: 'center',
			sortable: true
		},
		{
			title: 'usdt消费数',
			dataIndex: 'usdtFee',
			align: 'center',
			sortable: true
		},
		{
			title: 'usdt兑cny汇率',
			dataIndex: 'usdtCny',
			align: 'center',
			sortable: true
		},
		{
			title: 'cny总额',
			dataIndex: 'cnyTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '总算力（单位T）',
			dataIndex: 'powerTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '算力单价',
			dataIndex: 'powerPriceOne',
			align: 'center',
			sortable: true
		},
		{
			title: '矿机id',
			dataIndex: 'machineId',
			align: 'center',
		},
		{
			title: 'gc支付类型',
			dataIndex: 'payType',
			align: 'center',
			slot: true
			//

		},
		{
			title: '交易时间',
			dataIndex: 'createDate',
			align: 'center',
			sortable: true
		},
		{
			title: '同步云算力时间',
			dataIndex: 'syncDate',
			align: 'center',
			sortable: true
		},
		{
			title: '同步云算力标志',
			dataIndex: 'syncFlag',
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
					/*查询*/
					address: '',
					startGcFee: undefined,
					endGcFee: undefined,
					startUsdtFee: undefined,
					endUsdtFee: undefined,
					startPowerTotal: undefined,
					endPowerTotal: undefined,
					startPowerPriceOne: undefined,
					endPowerPriceOne: undefined,
					payType: undefined,
					time: [],
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
					/* 	payType: this.formInline.payType, */
					payType: this.formInline.payType === undefined ? this.formInline.payType : this.formInline.payType,

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
			this.$api.millApi.getBtcBuyPowerRecordList({
					page: this.page,
					pageSize: this.pageSize,
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
					payType: this.formInline.payType,

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
			if (this.formInline.endUsdtFee <= this.formInline.startUsdtFee) {
				this.formInline.endUsdtFee = this.formInline.startUsdtFee;
			}
			if (this.formInline.endPowerTotal <= this.formInline.startPowerTotal) {
				this.formInline.endPowerTotal = this.formInline.startPowerTotal;
			}
			if (this.formInline.endPowerPriceOne <= this.formInline.startPowerPriceOne) {
				this.formInline.endPowerPriceOne = this.formInline.startPowerPriceOne;
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
