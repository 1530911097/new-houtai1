<template>
	<div>
		<div class="tom-table-export">
			<el-select v-model="export_index" placeholder="请选择" size="small" style="margin-right: 20px;">
				<el-option label="导出当前页数据" :value="0"></el-option>
				<el-option label="导出所有数据" :value="1"></el-option>
			</el-select>
			<el-button type="primary" icon="el-icon-download" size="small" @click="exportVisible = true">导出excel</el-button>
			<slot></slot>
		</div>
		<el-dialog title="导出" :visible.sync="exportVisible" width="500px">
			<div style="margin-bottom: 10px;font-weight: bold;display: flex;align-items: center;">
				<span style="background-color:#1890ff;height:13px;width: 3px;margin-right: 5px;"></span>
				<span style="margin-right: 10px;">选择导出项</span>
				<!-- <el-checkbox :checked="ListLength == Number(list.length - 1) ? true : false"  @change="checkAll">全选</el-checkbox> -->
			</div>
			<div style="overflow: hidden;">
				<div v-if="file_is_show">
				<el-col v-for="(item, index) in columns" :key="index" :span="8" style="margin-bottom: 5px;">
					<el-checkbox :checked="item.checked" @change="exportItemChange($event, index)">{{ item.title }}</el-checkbox>
				</el-col>
				</div>
				
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="exportVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="exportOk" :loading="Excel_loading" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: '',
	props: {
		list: {
			type: Array,
			default: [],
		}
	},
	data() {
		return {
			export_index: 0,/*导出类型索引*/
			exportVisible: false,
			file_is_show:true,
			Excel_loading:false,
			ListLength:0,
			columns: [],/*选择项-列表*/
		};
	},

	methods: {
		defaultCheckall() {/*处理数据*/
			let a = [];
			let arr = this.list;
			arr.forEach(item => {
				if (item.title && item.title != '操作') {
					item.checked = true;
					a.push(item);
				}
			});
			this.columns = a;
		},
		exportItemChange(target, item) {
			/*多选框列表-点击事件*/
			this.columns[item].checked = target;
			this.exportCheckedText();
			this.exportChecked();
			
		},
		exportCheckedText(type = 1,Is) {/*当前选中的列表表头-text*/
			let arr = [];
			if(type){
				this.columns.forEach(item => {
					if (item.checked) {
						arr.push(item.title)
					}
				})
			}else{
				this.columns.forEach(item => {
					if (item.title) {
						item.checked = Is;arr.push(item);
					}
				});
			}
			return arr;
		},
		exportChecked(type = 1,Is) {/*当前选中的列表表头-key*/
			let arr = [];
			this.columns.forEach(item => {
				if(type){
					if (item.checked) {arr.push(item.dataIndex)}
				}else{
					if (item.title) {item.checked = Is;arr.push(item);}
				}
			})
			this.ListLength = arr.length
			return arr;
		},
		checkAll(type) { /*全选/反选*/
			this.file_is_show = false;
			this.$nextTick(()=>{ 
				this.exportChecked(0,type);
				this.file_is_show = true;
			})
		},
		exportOk(){
			this.$emit('exportOk',)
		}
	},
	mounted() {
		this.defaultCheckall();
		// this.exportChecked();
		
	}
};
</script>

<style>
.tom-table-export {
	text-align: right;
	margin-bottom: 20px;
}
</style>
