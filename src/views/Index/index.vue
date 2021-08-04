<template>
	<div class="wrap">
		<div class="head">
			<el-row>
				<el-col :span="8">
					<div class="row2 box-item">
						<div class="row2-item">
							<span class="row2-item-label">ETH当前监听区块高度：</span>
							<span class="row2-item-value">{{tableData.blockHeight || '--'}}</span>
						</div>
						<div class="row2-item">
							<span class="row2-item-label">TRX当前监听区块高度：</span>
							<span class="row2-item-value">{{tableData.trxNextBlockNum || '--'}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row1 box-item">
						<span class="row1-label">当前USDT汇率</span>
						<span class="row1-value">{{tableData.usdtToCny || '--'}}</span>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row1 box-item">
						<span class="row1-label">提币手续费</span>
						<span class="row1-value">{{tableData.usdtFee || '--'}}</span>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<div class="row3 box-item box-item-3">
						<div class="row3-address">
							<div class="row3-address-label">ETH归集钱包地：</div>
							<div class="row3-address-value">
								<span>{{tableData.coolWalletAddr || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">ETH 余额：</span>
							<span class="row3-item-value">{{tableData.coolWalletAddrEth || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.coolWalletAddrUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row3 box-item box-item-3">
						<div class="row3-address">
							<div class="row3-address-label">ETH热钱包提现地址：</div>
							<div class="row3-address-value">
								<span>{{tableData.hotWalletAddrOne || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">ETH 余额：</span>
							<span class="row3-item-value">{{tableData.hotWalletAddrOneEth || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.hotWalletAddrOneUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row3 box-item box-item-3">
						<div class="row3-address">
							<div class="row3-address-label">ETH热钱包分发油费地址：</div>
							<div class="row3-address-value">
								<span>{{tableData.hotWalletAddrTwo || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">ETH 余额：</span>
							<span class="row3-item-value">{{tableData.hotWalletAddrTwoEth || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.hotWalletAddrTwoUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<div class="row3 box-item box-item-2">
						<div class="row3-address">
							<div class="row3-address-label">TRX冷钱包归集地址：</div>
							<div class="row3-address-value">
								<span>{{tableData.tronCoolWalletAddr || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">TRX 余额：</span>
							<span class="row3-item-value">{{tableData.tronCoolWalletAddrTrx || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.tronCoolWalletAddrUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row3 box-item box-item-2">
						<div class="row3-address">
							<div class="row3-address-label">TRX热钱包提现地址：</div>
							<div class="row3-address-value">
								<span>{{tableData.tronHotOutAddr || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">TRX 余额：</span>
							<span class="row3-item-value">{{tableData.tronHotOutAddrTrx || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.tronHotOutAddrUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<div class="row3 box-item box-item-2">
						<div class="row3-address">
							<div class="row3-address-label">TRX钱包分发手续费地址：</div>
							<div class="row3-address-value">
								<span>{{tableData.tronHotSerChargeAddr || '--'}}</span>
							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">TRX 余额：</span>
							<span class="row3-item-value">{{tableData.tronHotSerChargeAddrTrx || '--'}}</span>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">USDT 余额：</span>
							<span class="row3-item-value">{{tableData.tronHotSerChargeAddrUsdt || '--'}}</span>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="8">
					<div class="row3 box-item box-item-6">
						<div class="row3-address">
							<div class="row3-address-label">游戏合约</div>
							<div class="row3-address-value">
								<span>{{tableData.sysGameAddr || '--'}}</span>

							</div>
						</div>
						<div class="row3-address">
							<div class="row3-address-label">收益合约</div>
							<div class="row3-address-value">
								<span>{{tableData.sysGameGainAddr || '--'}}</span>

							</div>
						</div>
						<div class="row3-item">
							<span class="row3-item-label">收益合约余额：</span>
							<span class="row3-item-value">{{tableData.sysGameGainAddrBalance || '--'}} GC</span>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="wrap-table">
			<!-- 导出的k 1111111111-->
			<div class="tom-table-export">
				<!-- 	<el-select default-value="0" v-model="export_index" style="width: 200px;margin-right: 20px;"
					@change="exportChange">
					<el-option value="0">
						导出当前页数据
					</el-option>
					<a-select-option value="1">
						导出所有数据
					</a-select-option>
				</el-select> -->
				<el-button @click="exportVisible = true" icon="download" type="primary">
					导出excel
				</el-button>
				<!-- 弹出层 -->
				<el-dialog title="导出" :visible.sync="exportVisible" :confirmLoading="confirmLoading">
					<div style="margin-bottom: 10px;font-weight: bold;display: flex;align-items: center;">
						<span style="background-color:#1890ff;height:13px;width: 3px;margin-right: 5px;"></span>选择导出项
						<!-- <el-checkbox :checked="checkList.length == exportChecked.length ? true : false"
							@change="checkAll" style="margin-left: 15px;">全选</el-checkbox> -->
							
					</div>
					
					<div style="overflow: hidden;">
						<el-col v-for="(item, index) in checkList" :key="index" :span="8" style="margin-bottom: 5px;">
							<el-checkbox :checked="item.checked" @change="exportItemChange($event, index)">
								{{ item.title }}
							</el-checkbox>
						</el-col>

					</div>
					<span slot="footer" class="dialog-footer">
						<el-button @click="exportVisible = false" size="small">取 消</el-button>
						<el-button type="primary" @click="exportConfirm" :loading="Excel_loading" size="small">确 定
						</el-button>
					</span>
				</el-dialog>
				<!-- 弹出层 -->
			</div>
			<!-- 数据表格k -->
			<el-table :data="data" v-loading="loading">
				<el-table-column v-for="(item, index) in columns" :data-source="data" :key="index"
					:prop="item.dataIndex" :label="item.title" :align="item.align" :fixed="item.fixed"
					:sortable="item.sortable" :width="item.width" :columns="columns" :loading="loading"
					:rowKey="(record,index)=>{return index}">

				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
			<!-- 分页 k -->
			<!-- 	<el-pagination
				class="paging"
				@current-change="getData"
				:page-size="pageSize"
				layout="total, prev, pager, next, jumper"
				:total="total"
				:hide-on-single-page="true"
			></el-pagination> -->
			<!-- 分页 j -->
		</div>
	</div>
</template>

<script>
	import ExportExcel from '../../components/ExportExcel.vue'
	import Blob from '../../excel/Blob.js'
	import Export2Excel from '../../excel/Export2Excel.js'
	const columns = [{
			title: '日期',
			dataIndex: 'date',
		},
		{
			title: '新增矿工数',
			dataIndex: 'newPeopleQuantity',
			align: 'center'
		},
		{
			title: '充值矿工数',
			dataIndex: 'depositCount',
			align: 'center'
		},
		{
			title: '充值总额(UDST)',
			dataIndex: 'depositAmount',
			align: 'center'
		},
		{
			title: '提现矿工数',
			dataIndex: 'withdrawalsCount',
			align: 'center'
		},
		{
			title: '提现总额(UDST)',
			dataIndex: 'withdrawalsAmount',
			align: 'center'
		}
	];
	export default {
		data() {
			return {
				export_index: 0,
				titles: '',
				tableData: [],
				data: [],
				loading: false,
				columns,
				Excel_loading: false,
				/*导出的k 22222222222*/
				confirmLoading: false,
				exportType: 0,
				exportVisible: false,
				checkList: [],
				item: []
				/*导出的j*/
			};
		},
		components: {
			ExportExcel,
			Export2Excel,
			Blob
		},
		created() {
			this.getData()
			this.defaultCheckall();
			/*导出的k 33333333333*/

			/*导出的j*/
		},
		computed: {
			// 当前选中的列表表头
			exportCheckedText() {
				let arr = [];
				this.checkList.forEach(item => {
					
					if (item.checked) {
						arr.push({
							title: item.title,
							key: item.dataIndex
						})
					}
				})
				return arr;
			},
			// 当前选中的列表key
			exportChecked() {
				let arr = [];
				this.checkList.forEach(item => {
					
					if (item.checked) {
						arr.push(item.dataIndex)
					}
				})
				return arr;
			},
		},
		methods: {
			/*导出的k 4444444444444*/
			defaultCheckall() {
				/*开始赋值*/
				let a = [];
				let arr = this.columns.slice(0);
				arr.forEach(item => {
					if (item.dataIndex) {
						item.checked = true;
						a.push(item)
					}
				})
				this.checkList = a;
			},
			exportChange(value) {
				/* 导出类型选择 */
				console.log(value)
				this.exportType = value;
			},
			checkAll({target}) {
				/*全选/反选*/
				//console.log(target.checked)
				this.checkList.forEach(item => {
					//item.checked = target.checked;
					/* console.log(item.checked) */
				})
				this.checkList = this.checkList.slice(0)
			},
			exportItemChange({
				target
			}, item) {
				/*多选框的事件*/
				/* console.log(target.checked) */
				//item.checked = target.checked;
				this.checkList = this.checkList.slice(0)
			},
			exportConfirm() {
				/*确认的回调*/
				if (this.exportChecked.length == 0) return this.$message.info({
					content: '未选择导出项',
					key: 1
				});
				this.confirmLoading = true;
				console.log(this.exportCheckedText)
				console.log(this.data)
				this.$export2Excel(this.exportCheckedText, this.data, '');
				this.confirmLoading = false;
				this.exportVisible = false;
				this.$message.success('导出成功');
			},

			getData(info = 1) {
				this.page = info;
				this.loading = true;
				this.$api.financial.getHomepageData()
					.then(res => {
						console.log(this.tableData)
						this.loading = false;
						this.data = res.data.data;
						this.tableData = res.data || {};
						console.log(this.tableData)

					})
			},

		}
	};
</script>

<style lang="scss" scoped>
	.head {
		margin-top: 20px;

		.box-item {
			height: 130px;
			background: linear-gradient(to right, #ffbf96, #fe7096);
			color: #fff;
			border-radius: 10px;
			padding: 0 30px;
			font-size: 16px;

			&-2 {
				background: linear-gradient(to right, #90caf9, #047edf 99%);
			}

			&-3 {
				background: linear-gradient(to right, #84d9d2, #07cdae);
			}

			&-4 {
				background: linear-gradient(to right, #84d9ae, #2fcd07);
			}

			&-5 {
				background: linear-gradient(to right, #d984ce, #cd07cd);
			}

			&-6 {
				background: linear-gradient(to right, #d15390, #bb703a);
			}

			&-7 {
				background: linear-gradient(to right, #ee0979, #ff6a00);
			}

			&-head {
				font-size: 18px;
				font-weight: bold;
				letter-spacing: 1px;

				&-label {
					display: block;
					margin: 0px 0px 5px 0px;
				}
			}

			&-value {
				font-size: 18px;
				font-weight: bold;
				margin-top: 10px;
			}
		}

		.row2 {
			display: flex;
			flex-direction: column;
			justify-content: center;

			&-item {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&:last-child {
					margin-top: 10px;
				}
			}
		}

		.row1 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 0px 10px 10px 10px;
		}

		.row3 {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin: 10px;

			&-address {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				&-value {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;

					span {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 5px;
						font-size: 14px;
					}
				}
			}

			&-item {
				margin-top: 5px;
			}
		}
	}

	.winht_On {
		// max-width: 250px;
		margin-right: 5px;
	}

	.describe {
		margin: 3px 0px 0px 0px;
	}

	.box-item2 {
		color: #fff;
		border-radius: 10px;
		padding-top: 30px;
		padding-bottom: 30px;

		.box-item-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 15px;

			.left {
				min-width: 185px;
				font-size: 18px;
				font-weight: bold;
			}

			.right {
				flex: 1;
				overflow: hidden;
				display: flex;
				align-items: center;
			}
		}
	}
</style>
