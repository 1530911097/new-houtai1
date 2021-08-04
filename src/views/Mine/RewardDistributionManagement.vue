<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">

				<el-form-item label="币种:">
					<el-select v-model="formInline.tokens" placeholder="请选择交易类型" style="width: 140px;">
						<el-option label="GC" value="GC"></el-option>
						<el-option label="KING" value="KING"></el-option>
						<el-option label="SPX" value="SPX"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="期数释放状态: ">
					<el-select v-model="formInline.tokenName" placeholder="请选择交易类型" style="width: 140px;">
						<el-option label="未开始" value="1"></el-option>
						<el-option label="释放中" value="2"></el-option>
						<el-option label="已完成" value="3"></el-option>
					</el-select>
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
						<div v-if="item.title=='释放状态'"><span>{{scope.row.status|formatStatus}}</span></div>

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
			ellipsis: true,
			sortable: true
		},
		{
			title: '当前期数总释放量',
			dataIndex: 'basicAmount',
			align: 'center',
			sortable: true
		},
		{
			title: '每日释放总量',
			dataIndex: 'dayAmount',
			align: 'center',
			sortable: true
		},
		{
			title: '释放状态',
			dataIndex: 'status',
			align: 'center',
			slot: true
		},
		{
			title: '已释放天数',
			dataIndex: 'releaseDays',
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
					status: -1,
					tokenName: '',
					tokens:''
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
					.exportReleaseProcessListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
						status: this.formInline.status == -1 ? '' : this.formInline.status,
						tokenName: this.formInline.tokenName == -1 ? '' : this.formInline.tokenName,
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
					.getReleaseProcessList({
						page: this.page,
						pageSize: this.pageSize,
						status: this.formInline.status == -1 ? '' : this.formInline.status,
						tokenName: this.formInline.tokenName == -1 ? '' : this.formInline.tokenName,
						column: this.sortField,
						sortingRules: this.sortOrder,
                       
						/**/
					})
					.then(res => {
						this.tableData = res.data.data || [];
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
