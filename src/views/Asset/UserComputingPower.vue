<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>

				<el-form-item label="持币量">
					<el-input-number v-model="formInline.startHoldAmount" controls-position="right"
						@change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endHoldAmount" controls-position="right"
						:min="formInline.startHoldAmount"></el-input-number>
				</el-form-item>
				<el-form-item label="推广算力">
					<el-input-number v-model="formInline.startZonePow" controls-position="right" @change="InputNumber2">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endZonePow" controls-position="right"
						:min="formInline.startZonePow"></el-input-number>
				</el-form-item>


				<el-form-item label="算力计算时间">
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
			dataIndex: 'address',
			align: 'center',

		},
		{
			title: '父级地址',
			dataIndex: 'parentAddress',
			align: 'center',
		},
		{
			title: '持币量',
			dataIndex: 'holdAmount',
			align: 'center',
			sortable: true
		},
		{
			title: '持币算力',
			dataIndex: 'holdPow',
			align: 'center',
			sortable: true
		},
		{
			title: '推广算力',
			dataIndex: 'zonePow',
			align: 'center',
			sortable: true
		},
		{
			title: '总算力',
			dataIndex: 'powTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '小区总持币',
			dataIndex: 'zoneHoldTotal',
			align: 'center',
			sortable: true
		},
		{
			title: '直推数量',
			dataIndex: 'inviteCount',
			align: 'center',
			sortable: true
		},
		{
			title: '算力计算时间',
			dataIndex: 'regDate',
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
					address: '',
					startHoldAmount: 0,
					endHoldAmount: 0,
					startZonePow: 0,
					endZonePow: 0,
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
					.exportUserPowerListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
						address: this.formInline.address,
						startHoldAmount: this.formInline.startHoldAmount || '',
						endHoldAmount: this.formInline.endHoldAmount || '',
						startZonePow: this.formInline.startZonePow || '',
						endZonePow: this.formInline.endZonePow || '',
						column: this.sortField,
						sortingRules: this.sortOrder,
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
					.getUserPowerList({
						page: this.page,
						pageSize: this.pageSize,
						column: this.sortField,
						sortingRules: this.sortOrder,

						address: this.formInline.address,
						startHoldAmount: this.formInline.startHoldAmount || '',
						endHoldAmount: this.formInline.endHoldAmount || '',
						startZonePow: this.formInline.startZonePow || '',
						endZonePow: this.formInline.endZonePow || '',
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
				if (this.formInline.endHoldAmount <= this.formInline.startHoldAmount) {
					this.formInline.endHoldAmount = this.formInline.startHoldAmount;
				}
			},
			InputNumber2(e) {
				console.log(e);
				if (this.formInline.endZonePow <= this.formInline.startZonePow) {
					this.formInline.endZonePow = this.formInline.startZonePow;
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
