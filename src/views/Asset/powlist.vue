<template>
	<div class="wrap">
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="用户地址">
					<el-input v-model="formInline.address" clearable placeholder="请输入用户地址"></el-input>
				</el-form-item>
				<el-form-item label="币种">
					<el-select v-model="formInline.isSuccess" placeholder="请选择购买状态" style="width: 140px;">
						<el-option label="未购买" value="0"></el-option>
						<el-option label="已购买" value="1"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="创建时间">
					<el-date-picker v-model="formInline.time" type="datetimerange" range-separator="至"
						start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>


				<el-form-item label="单价">
					<el-input-number v-model="formInline.startAmount" controls-position="right" @change="InputNumber">
					</el-input-number>
					<span style="margin:0px 10px;">-</span>
					<el-input-number v-model="formInline.endAmount" controls-position="right"
						:min="formInline.startAmount"></el-input-number>
				</el-form-item>
				<el-button type="primary" @click="getData(1)" size="small">查 询</el-button>
				<el-button type="primary" @click="Edit(false, 'add')" size="small" icon="el-icon-plus"
					style="margin-right: 10px;">添 加</el-button>
			</el-form>
		</div>
		<div class="wrap-table">
			<ExportExcel ref="Excel" :list="columns" @exportOk="exportOk">
		
			</ExportExcel>
			<el-table :data="tableData" v-loading="loading">
				<el-table-column v-for="(item, index) in columns" :key="index" :prop="item.dataIndex"
					:label="item.title" :align="item.align" :fixed="item.fixed" :sortable="item.sortable">
					<template slot-scope="scope">
						<!-- 默认的数据渲染k -->
						<span v-if="!item.slot">{{ scope.row[item.dataIndex] }}</span>
						<!-- 默认的数据渲染j -->
						<div v-if="item.title == '是否购买成功'">
							<span>{{scope.row.isSuccess =="0"? '未购买' : '已购买' }}</span>
						</div>
					
						<div v-if="item.title == '是否质押fil'">
							<span>{{scope.row.isPledge =="1"? '是' : '否' }}</span>
						</div>
						<div v-if="item.title == '是否发放奖励'">
							<span>{{scope.row.isReward =="1"? '是' : '否' }}</span>
						</div>

						<div v-if="item.title == '操作'">
							<el-popconfirm title="是否确认删除该项?" icon="el-icon-info" icon-color="red"
								@confirm="Delete(scope.row)">
								<el-button slot="reference" icon="el-icon-delete" type="danger" size="small"
									:loading="Delete_loading">删除</el-button>
							</el-popconfirm>
							<div style="margin-bottom: 10px;"></div>
							<!-- 	<el-button icon="el-icon-edit" type="primary" @click.native.prevent="Edit(scope.row)" size="small">编辑</el-button> -->
						</div>
						<!-- 以下单独 slot 如果不需要可以删除 j -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
		</div>
		<el-dialog :title="title" :visible.sync="visible" width="500px" top="9vh">
			<div>
				<el-form label-position="right" :model="form" label-width="100px" size="small" :rules="rules"
					ref="ruleForm" class="ruleForm">

					<el-form-item label="用户地址" prop="address">
						<el-input v-model="form.address" allow-clear></el-input>
					</el-form-item>
					<el-form-item label="矿机名称:" prop="machineName">
						<el-select v-model="form.machineName" filterable remote reserve-keyword placeholder="请输入矿机名称"
							value-key="account" :remote-method="remoteMethod" @change="handleSelect"
							:loading="loading_select" style="width: 100%;">
							<el-option v-for="(item, inex) in options" :key="inex" :label="`${item.name}`"
								:value="item"></el-option>
						</el-select>

					</el-form-item>
					<el-form-item label="数量" prop="powerAmount">
						<el-input v-model="form.powerAmount" allow-clear></el-input>
					</el-form-item>
					<el-form-item label="单价￥" prop="powerPrice">
						<el-input v-model="form.powerPrice" allow-clear></el-input>
					</el-form-item>
					<el-form-item label="实付USDT" prop="factFeeUsdt">
						<el-input v-model="form.factFeeUsdt" allow-clear></el-input>
					</el-form-item>
					<el-form-item label="挖矿周期">
						<el-input v-model="form.miningDate" allow-clear></el-input>
					</el-form-item>
					<el-form-item label="币种类型">
						<el-select v-model="form.chainName" placeholder="请选择币种类型" style="width: 140px;">
							<el-option label="BTC" value="BTC"></el-option>
							<el-option label="ETH" value="ETH"></el-option>
							<el-option label="FIL" value="FIL"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否质押fil">
						<el-radio v-model="form.isPledge" :label="0">否</el-radio>
						<el-radio v-model="form.isPledge" :label="1">是</el-radio>
					</el-form-item>
					<el-input v-if="form.isPledge" style="width: 100px;" v-model="form.specifyBuyDate" allow-clear>
					</el-input>
					<span v-if="form.isPledge" style="margin-left: 5px;">{{ form.specifyBuyDate }}天后</span>
					<el-form-item label="是否发放奖励">
						<el-radio v-model="form.isReward" :label="0">否</el-radio>
						<el-radio v-model="form.isReward" :label="1">是</el-radio>

					</el-form-item>

					<el-form-item label="指定下单时间">
						<el-radio v-model="form.isBuyDate" :label="0">默认</el-radio>
						<el-radio v-model="form.isBuyDate" :label="1">指定</el-radio>
					</el-form-item>
					<el-input v-if="form.isBuyDate" style="width: 100px;" v-model="form.pledgeAmount" allow-clear>
					</el-input>
					<span v-if="form.isBuyDate" style="margin-left: 5px;">{{ form.pledgeAmount }}天后</span>
					</el-form-item>
					<el-form-item label="交付时间">
						<el-radio v-model="form.isDeli" :label="0">默认</el-radio>
						<el-radio v-model="form.isDeli" :label="1">指定</el-radio>
						<el-input v-if="form.isDeli" style="width: 100px;" v-model="form.specifyDeliveryDate"
							allow-clear></el-input>
						<span v-if="form.isDeli" style="margin-left: 5px;">{{ form.specifyDeliveryDate }}天后</span>
					</el-form-item>


				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="(visible = false), $refs.ruleForm.resetFields()" size="small">取 消</el-button>
				<el-button type="primary" @click="visibleOk" :loading="visible_loading" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import XLSX from 'xlsx';
	import ExportExcel from '@/components/ExportExcel.vue';
	/*表头k*/
	const columns = [{
			title: '用户地址',
			dataIndex: 'address',
			align: 'center'
		},
		{
			title: '购买数量',
			dataIndex: 'powerAmount',
			align: 'center',
			sortable: true
		},
		{
			title: '单价',
			dataIndex: 'powerPrice',
			align: 'center',
			sortable: true
		},
		
		
		
		{
			title: '是否购买成功',
			dataIndex: 'isSuccess',
			align: 'center',
			slot: true,
		},
		{
			title: '购机订单号',
			dataIndex: 'buyOrderCode',
			align: 'center'
		},
		{
			title: '是否质押fil',
			dataIndex: 'isPledge',
			align: 'center',
			slot: true
		},
		{
			title: '指定购买时间',
			dataIndex: 'specifyBuyDate',
			align: 'center',
			sortable: true
		},
		{
			title: '指定交付时间',
			dataIndex: 'specifyDeliveryDate',
			align: 'center',
			sortable: true
		},
		{
			title: '创建时间',
			dataIndex: 'createDate',
			align: 'center',
			sortable: true
		},
		{
			title: '购买时间',
			dataIndex: 'buyDate',
			align: 'center',
			sortable: true
		},
		{
			title: '实付USDT',
			dataIndex: 'factFeeUsdt',
			align: 'center',
			sortable: true
		},
		{
			title: '是否发放奖励',
			dataIndex: 'isReward',
			align: 'center',
			slot: true

		},
		{
			title: '矿机名称',
			dataIndex: 'machineName',
			align: 'center'
		},
		{
			title: '挖矿周期',
			dataIndex: 'miningDate',
			align: 'center'
		},
		{
			title: '总质押FIL',
			dataIndex: 'pledgeAmount',
			align: 'center'
		},
		{
			title: '操作',
			dataIndex: '',
			align: 'center',
			fixed: 'right',
			slot: true
		}
	];
	/*表头j*/
	export default {
		name: '',
		data() {
			return {
				page: 1,
				title: '',
				pageSize: 10,
				total: 0,
				userlist: [],
				loading: false,
				columns /*表头*/ ,
				fetching: false,
				name: undefined,
				options: [],
				loading_select: false,
				tableData: [],
				formInline: {
					account: '', //账号
					isSuccess: '', //是否购买成功,0未购买,1已购买
					time: [],
					startAmount: 0 /*数量*/ ,
					endAmount: 0 /*数量2*/
				},
				rules: {
					address: [{
						required: true,
						message: '请输入用户地址',
						trigger: 'change'
					}],
					machineId: [{
						required: true,
						message: '请输入矿机id',
						trigger: 'change'
					}],
					powerAmount: [{
						required: true,
						message: '请输入数量',
						trigger: 'change'
					}],
					powerPrice: [{
						required: true,
						message: '请输入单价',
						trigger: 'change'
					}]
				},
				form: {
					isReward: 0,
					isPledge: 0,
					isBuyDate: 0,
					isDeli: 0,
					specifyBuyDate: 0,
					specifyDeliveryDate: 30,
					factFeeUsdt: 0,
					miningDate: '',
					pledgeAmount: '',
					chainName: 'FIL'
				},
				title: '' /*弹出层标题*/ ,
				visible_loading: false /*弹出层loading*/ ,
				visible: false /*弹出层show*/ ,
				Delete_loading: false
			};
		},
		methods: {
			exportOk() {
				/* 导出 */
				this.$refs.Excel.Excel_loading = true;
				this.$api.exportExcelApi
					.exportAllocatePowerListExcel({
						page: this.page,
						pageSize: this.$refs.Excel.export_index == 1 ? this.total : this.pageSize,
						titles: this.$refs.Excel.exportCheckedText(),
						columns: this.$refs.Excel.exportChecked(),
						/**/
						sortingRules: this.sortOrder,
						startPrice: this.formInline.startAmount || '',
						endPrice: this.formInline.endAmount || '',
						startCreateDate: this.formInline.time[0] || '',
						endCreateDate: this.formInline.time[1] || ''
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
				/* 页面数据 */
				this.page = info;
				this.loading = true;
				this.$api.millApi
					.addPowerList({
						address: this.formInline.address,
						isSuccess: this.formInline.isSuccess,
						page: this.page,
						pageSize: this.pageSize,
						column: this.sortOrder != '' ? this.sortField : '',
						sortingRules: this.sortOrder,
						startPrice: this.formInline.startAmount || '',
						endPrice: this.formInline.endAmount || '',
						startCreateDate: this.formInline.time[0] || '',
						endCreateDate: this.formInline.time[1] || ''
						/**/
					}).then(res => {
						this.tableData = res.data || [];
						this.total = res.total;
						this.loading = false;
					});
			},
			Edit(data, type) {
				/*编辑/添加*/
				console.log(data);
				console.log(this.form);
				this.title = type == 'add' ? '添加' : '编辑';
				if (data) {
					this.form = Object.assign({}, data);
				} else {
					this.form = {};
				}
				this.visible = true;
			},
			Delete(e) {
				/*删除*/
				console.log(e);
				this.Delete_loading = true;
				this.$api.millApi
					.deleteAddPowerList({
						id: e.id
					})
					.then(res => {
						this.$message.success(res.data);
						this.getData();
						this.Delete_loading = false;
					});
			},
			remoteMethod(name) {
				/*搜索下拉*/
				if (name !== '') {
					this.loading_select = true;
					this.$api.millApi
						.getMachineDropDownList({
							machineName: name,
							machineType: 2
						})
						.then(res => {
							console.log(this.options)
							this.options = res.data;
							this.loading_select = false;
						});
				} else {
					this.options = [];
				}
			},
			handleSelect(info) {
				/*搜索下拉-选择*/
				this.form.machineId = info.id;
				this.form.machineName = info.name;

			},
			InputNumber(e) {
				console.log(e);
				if (this.formInline.endAmount <= this.formInline.startAmount) {
					this.formInline.endAmount = this.formInline.startAmount;
				}
			},
		
			visibleOk() {
				/*弹窗确定回调*/
				console.log(this.form)
				// return false;
				let that = this;
				this.visible_loading = true;
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						this.$api.millApi
							.savePower({
								machineId: that.form.machineId,
								machineName: that.form.machineName,
								address: that.form.address,
								powerAmount: that.form.powerAmount,
								powerPrice: that.form.powerPrice,
								isPledge: that.form.isPledge,
								specifyBuyDate: that.form.isBuyDate ? that.form.specifyBuyDate : null,
								specifyDeliveryDate: that.form.isDeli ? that.form.specifyDeliveryDate : null,
								factFeeUsdt: that.form.factFeeUsdt,
								isReward: that.form.isReward,
								chainName: that.form.chainName,
								miningDate: Number(that.form.miningDate),
								pledgeAmount: that.form.isPledge ? Number(that.form.pledgeAmount) : '',
							})
							.then(res => {
								this.getData();
								this.visible = false;
								this.visible_loading = false;
								this.$message.success(res.data);
								this.$refs.ruleForm.resetFields();
								this.fileList = [];
							})
							.catch(res => {
								this.visible_loading = false;
							});
					} else {
						this.visible_loading = false;
						return false;
					}
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

<style lang="scss" scoped="scoped">
	.upload-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 15px;
		padding: 8px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;

		.upload-list-left {
			line-height: 0;
			display: flex;
			align-items: center;

			span {
				margin-left: 10px;
			}
		}

		.el-icon-delete {
			cursor: pointer;
		}
	}
</style>
