<template>
	<div class="wrap">
		<div class="wrap-block">
			<el-button type="primary" @click="Emit(false,'add')">添加</el-button>
		</div>
		<div class="wrap-table">
			<el-table :data="tableDate">
				<el-table-column v-for-="(item,index) in coums" :label="item.label" prop="age">
                      <template slot-scope="scope">
						  
					  </template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	const coums = [{
			label: '李明',
			age: 20
		},
		{
			label: '李白',
			age: 22
		},
		{
			label: '李琴',
			age: 18
		},
		{
			label: '李明',
			age: 30
		},
		{
			label: '李敏',
			age: 15
		},
		{
			label: '李察',
			age: 17
		},
		{
			title: '操作',
			dataIndex: '',
			align: 'center',
			fixed: 'right',
			slot: true
		}


	]
	export default {
		data() {
			return {
				dialogVisible: false,
				coums, //存放表头
				tableDate: [{
						label: '李明',
						age: 20
					},
					{
						label: '李白',
						age: 22
					},
					{
						label: '李琴',
						age: 18
					},
					{
						label: '李明',
						age: 30
					},
					{
						label: '李敏',
						age: 15
					},
					{
						label: '李察',
						age: 17
					},
					{
						label: '操作',
						age: ''
					}

				]
			}
		},
		methods: {
			Emit() {
				this.dialogVisible = true
			}
		}
	}
</script>


<style></style>
