<template>
	<div class="wrap">
		<div class="wrap-block">
			<el-form layout="inline" :model="formInline" @submit.native.prevent>
				<el-form-item label="领导地址">
					<el-input allow-clear v-model="formInline.rootAddress" placeholder="请输入地址"></el-input>
				</el-form-item>
				<el-form-item label="快照时间">
					<a-range-picker format="YYYY-MM-DD HH:mm:ss" :placeholder="['开始时间', '结束时间']" v-model="formInline.time1"
					 valueFormat='YYYY-MM-DD HH:mm:ss' />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" html-type="submit" @click="getData('search')">
						查询
					</a-button>
				</el-form-item>
				<el-form-item label="领导地址">
					<el-input allow-clear v-model="formInline.rootAddress2" placeholder="请输入地址"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="danger" html-type="submit" @click="getData2('search')">
						快照伞下用户
					</a-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="tom-table">
			<el-table @change="tabChange" :pagination="false" :columns="columns" :data-source="data" :loading="loading" :rowKey="record => record.id">
			
			</el-table>
			<div class="tom-pagination">
				<el-pagination show-quick-jumper @change="getData" v-model="page" :defaultPageSize="pageSize" hideOnSinglePage
				 :total="total" :show-total="total => `共 ${total} 条数据，当前第 ${page} 页`" />
			</div>

		</div>
	</div>
</template>

<script>
	const columns = [{
			title: '领导地址',
			dataIndex: 'rootAddress',
			align: 'center',
			ellipsis: true,
			scopedSlots: {
				customRender: 'rootAddress'
			},
		},
		{
			title: '伞下用户名',
			dataIndex: 'userName',
			align: 'center',
			ellipsis: true,
		},
		{
			title: '伞下地址',
			dataIndex: 'zoneAddress',
			align: 'center',
			scopedSlots: {
				customRender: 'zoneAddress'
			},
		},
		{
			title: '伞下持币量',
			dataIndex: 'holdAmount',
			align: 'center',
			sorter:true
		},
		{
			title: '伞下用户层级',
			dataIndex: 'tireNum',
			align: 'center',
		},
		{
			title: '统计数',
			dataIndex: 'statisticsNum',
			align: 'center',
			sorter:true
		},
		{
			title: '快照时间',
			dataIndex: 'createDate',
			align: 'center',
			sorter:true
		},
	];
	export default {
		data() {
			return {
				formInline: {
					rootAddress: '', //地址
					time1: [],
					rootAddress2: '',
				},
				data: [],
				page: 1,
				pageSize: 10,
				total: 0,
				loading: false,
				columns,
				sortField:'',//升降序字段
                sortOrder:'',//升降序 descend（降序） ascend（升序）
			};
		},
		created() {
			this.getData()
		},
		methods: {
			tabChange(pagination, filters, sorter){
                console.log('params', sorter);
                this.sortOrder=sorter.order || '';
                this.sortField=this.sortOrder ? sorter.field : '';
                console.log(this.sortOrder)
                this.getData('search')
            },
			// 已注册会员列表
			getData(info) {
				this.loading = true;
				if (info == 'search') {
					this.page = 1;
				}
				this.$api.vipApi.getUnderUmbByAddressList({
						page: this.page,
						pageSize: this.pageSize,
						rootAddress: this.formInline.rootAddress,
						startCreateDate: this.formInline.time1[0] || '',
						endCreateDate: this.formInline.time1[1] || '',
						column: this.sortField,  
                        sortingRules:this.sortOrder,
					})
					.then(res => {
						this.loading = false;
						this.data = res.data || [];
						this.total = res.total;
					})
			},
			getData2(info) {
				this.loading = true;
				if (info == 'search') {
					this.page = 1;
				}
				let that = this
				this.$api.vipApi.saveUnderUmbByAddress({
						page: this.page,
						pageSize: this.pageSize,
						rootAddress: this.formInline.rootAddress2,
					})
					.then(res => {
						that.loading = false;
						that.$success({
							title: '快照成功',
						});
						// console.log(,'3243242')
						that.$api.vipApi.getUnderUmbByAddressList({
								page: that.page,
								pageSize: that.pageSize,
								statisticsNum: res.data,
							})
							.then(res => {
								that.loading = false;
								that.data = res.data || [];
								that.total = res.total;
							})
					})
			}
		},
	}
</script>

<style>

</style>
