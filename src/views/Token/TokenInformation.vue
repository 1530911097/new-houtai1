<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="简称">
					<el-input v-model="formInline.tokenName" clearable placeholder="请输入简称"></el-input>
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
	
						<div v-if="item.title == '是否开放交易'">
							<span>{{scope.row.isOpen =="1"? '开放' : '未开放' }}</span>
						</div>
						
						<div v-if="item.title == '矿池收益结算'">
							<span>{{scope.row.openPool =="1"? '开放' : '未开放' }}</span>
						</div>
						<!-- 	exploereSite
						isOpen
						openPool -->
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
			title: '简称',
			dataIndex: 'symbol',
			align: 'center',
		},
		
		
		{
			title: '简称',
			dataIndex: 'tokenName',
			align: 'center',
		},
		{
			title: '发行时间',
			dataIndex: 'issueDate',
			align: 'center',
			sortable: true
		},
		{
			title: '区块浏览器地址',
			dataIndex: 'exploereSite',
			align: 'center',
			slot: true
		},
		{
			title: '收益比例',
			dataIndex: 'rewardScale',
			align: 'center',
		},
		{
			title: '是否开放交易',
			dataIndex: 'isOpen',
			align: 'center',
			slot: true
		},
		{
			title: '开源代码地址',
			dataIndex: 'githubSite',
			align: 'center',
		},
		{
			title: '矿池收益结算',
			dataIndex: 'openPool',
			align:'center',
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
					tokenName: '',

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
					.exportTokenListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
					tokenName:this.formInline.tokenName,
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
					.getTokenList({
					page: this.page,
					pageSize: this.pageSize,
					tokenName:this.formInline.tokenName,
				/* 	column: this.sortField,  
					sortingRules:this.sortOrder, */



						/**/
					})
					.then(res => {
						this.tableData = res.data || [];
						this.total = res.total;
						this.loading = false;
					});
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
