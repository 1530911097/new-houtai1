<template>
		<div class="wrap">
			<!-- 查询条件k -->
			<div class="wrap-block">
				<el-form :model="formInline" inline size="small">
					<el-form-item label="地址">
						<el-input v-model="formInline.address" clearable placeholder="请输入地址"></el-input>
					</el-form-item>


					<el-form-item label="余额">
						<el-input-number v-model="formInline.startBalance" controls-position="right"
							@change="InputNumber"></el-input-number>
						<span style="margin:0px 10px;">-</span>
						<el-input-number v-model="formInline.endBalance" controls-position="right"
							:min="formInline.startBalance"></el-input-number>
					</el-form-item>
					<el-form-item label="币种">
						<el-select v-model="formInline.tokenName" placeholder="请选择交易类型" style="width: 140px;">
							<el-option label="GC" value="GC"></el-option>
							<el-option label="USDT" value="USDT"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="资产产生时间">
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
				title: '地址',
				dataIndex: 'address',
				align: 'center',

			},
			{
				title: '币种',
				dataIndex: 'tokenName',
				align: 'center',

			},
			{
				title: '余额',
				dataIndex: 'balance',
				align: 'center',
				sortable: true
			},
			{
				title: '冻结余额',
				dataIndex: 'freeze',
				align: 'center',
				sortable: true
			},
			{
				title: '资产产生时间',
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
						address: '',
						tokenName: '',
						startBalance: 0,
						endBalance: 0,
						time: []
					},
					State:true,
					columns /*表头*/ ,
					tableData: [] /*表格-数据*/
				};
			},
			methods: {
				exportOk() {
					/* 导出 */
					this.$refs.Excel.Excel_loading = true;
					this.$api.exportExcelApi
						.exportUserAssetListExcel({
							page: this.page,
							pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
							titles: this.$refs.Excel.exportCheckedText(),
							columns: this.$refs.Excel.exportChecked(),
							/**/
							address:this.formInline.address,
							tokenName:this.formInline.tokenName =='' ? '': this.formInline.tokenName ,
							startBalance:this.formInline.startBalance || '',
							endBalance:this.formInline.endBalance || '',
							column: this.sortField,  
							sortingRules:this.sortOrder,
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
					if(this.State){
						this.formInline.tokenName = 'GC'
					}
					this.$api.millApi
						.getUserAssetList({
							page: this.page,
							pageSize: this.pageSize,
							column: this.sortField,
							sortingRules:this.sortOrder,
							
							address:this.formInline.address,
							tokenName:this.formInline.tokenName =='' ? '': this.formInline.tokenName ,
							startBalance:this.formInline.startBalance || '',
							endBalance:this.formInline.endBalance || '',
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
					if (this.formInline.endBalance <= this.formInline.startBalance) {
						this.formInline.endBalance = this.formInline.startBalance;
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
