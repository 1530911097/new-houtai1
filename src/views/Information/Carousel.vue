<template>
	<div class="wrap">
		<div class="wrap-block">
			<el-button type="primary" @click="Edit(false, 'add')" size="small" icon="el-icon-plus">添 加</el-button>
			<!-- 以一个按钮 @click="Edit(false, 'add')" -->
		</div>
		<div class="wrap-table">
			<el-table :data="tableData" v-loading="loading">
				<el-table-column v-for="(item, index) in columns" :key="index" :prop="item.dataIndex"
					:label="item.title" :align="item.align" :fixed="item.fixed" :sortable="item.sortable">
					<template slot-scope="scope">
						<!-- 默认的数据渲染k -->
						<span v-if="!item.slot">{{ scope.row[item.dataIndex] }}</span>
						<!-- 默认的数据渲染j -->
						<!-- 以下单独 slot 如果不需要可以删除 k -->
						<div v-if="item.title == '图片'">
							<el-image style="width: 100px; height: 100px" :src="scope.row.url" fit="contain"
								:preview-src-list="[scope.row.url]"></el-image>
						</div>
					
						<div v-if="item.title == '操作'">
							<el-popconfirm title="是否确认删除该项?" icon="el-icon-info" icon-color="red"
								@confirm="Delete(scope.row)">
								<el-button slot="reference" icon="el-icon-delete" type="danger" size="small"
									:loading="Delete_loading">删除</el-button>
							</el-popconfirm>
							<div style="margin-bottom: 10px;"></div>
							<el-button icon="el-icon-edit" type="primary" @click.native.prevent="Edit(scope.row)"
								size="small">编辑</el-button>
						</div>
						<!-- 以下单独 slot 如果不需要可以删除 j -->
					</template>
				</el-table-column>
			</el-table>
			<!-- 数据表格j -->
		</div>
		<el-dialog :title="title" :visible.sync="visible" width="500px">
			<div>
				<el-form label-position="right" :model="form" label-width="100px" size="small" :rules="rules"
					ref="ruleForm" class="ruleForm">
					<el-form-item label="跳转链接:" prop="link">
						<el-input v-model="form.link" placeholder="跳转链接"></el-input>
					</el-form-item>
					<el-form-item label="序号:" prop="sort">
						<el-input v-model="form.sort" placeholder="请输入序号"></el-input>
					</el-form-item>
					<el-form-item label="图片:" prop="file">
						<el-upload :file-list="form.fileList" action="string" list-type="picture"
							accept="image/jpeg,image/png,image/jpg" :http-request="UploadImage" :show-file-list="false">
							<el-button size="small" type="primary" icon="el-icon-upload2" :loading="upload_loading">点击上传
							</el-button>
						</el-upload>
						<div class="upload-list" v-if="uploadList">
							<div class="upload-list-left">
								<el-image style="width: 48px; height: 48px" :src="form.fileList[0].url"
									:preview-src-list="[form.fileList[0].url]" :z-index="2009"></el-image>
								<span>{{ form.fileList[0].name }}</span>
							</div>
							<i class="el-icon-delete" @click="uploadList_Delete"></i>
						</div>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="visible = false, $refs.ruleForm.resetFields()" size="small">取 消</el-button>
				<el-button type="primary" @click="visibleOk" :loading="visible_loading" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	//思维逻辑（请求数据getData=> data =>标签里 ）
	//1.getData请求表格数据(tableData), 定义表格加载的一个加载状态（location），定义total列表数目。 
	//2.数据操作
	//删除，表格定义操作,html定义slot=>{}通过v-if进行
	
	
	/*表头k*/
const columns = [{
			title: '图片',
			dataIndex: 'url',
			align: 'center',
			slot: true
		},
		
		{
			title: '序号',
			dataIndex: 'sort',
			align: 'center',
			sortable: true
		},
		{
			title: '跳转链接',
			dataIndex: 'link',
			align: 'center',
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
			var checkAge = (rule, value, callback) => {
				console.log(this.form)
				console.log(this.form.file)
				if (this.form.file == undefined) {
					return callback(new Error('请选择图片'));
				} else {
					callback('');
				}
			};  //效验如果file图片地址为空就报错请选择图片
			return {
				page: 1,
				pageSize: 10,
				total: 0,
				loading: false,
				tableData: [],
				columns /*表头*/ ,
				rules: {
					/*表单验证*/
					link: [{
						required: true,
						message: '请输入跳转链接',
						trigger: 'change'
					}],
					sort: [{
						required: true,
						message: '请输入序号',
						trigger: 'change'
					}],
					file: [{
						validator: checkAge,
						trigger: 'change'
					}]
				},
				form: {},
				title: '' /*弹出层标题*/ ,
				visible_loading: false /*弹出层loading*/ ,
				visible: false /*弹出层show*/ ,
				uploadList: false,
				upload_loading: false,        /*上传状态*/
				Delete_loading: false
			};
		},
		methods: {
			getData(info = 1) {                            //只做了请求数据，绑定状态，请求了表格数据
				/* 页面数据 */                        
				this.page = info;
				this.loading = true;
				this.$api.informationmanageApi.getSysBanner().then(res => {
					this.tableData = res.data || [];
					this.total = res.total;
					this.loading = false;
				});
			},                                
			Delete(e) {
				/*删除*/
				console.log(e);
				this.Delete_loading = true;
				this.$api.informationmanageApi
					.deleteBannerById({
						id: e.id
					})
					.then(res => {
						this.$message.success(res.data);
						this.getData();
						this.Delete_loading = false;
					});
			},
			Edit(data, type) {
				/*编辑/添加*/
				console.log(data);
				console.log(this.form);
				this.title = type == 'add' ? '添加' : '编辑';
				if (data) {
					this.form = Object.assign({}, data);
					this.form.fileList = [{
						uid: '-1',
						status: 'done',
						name: 'image',
						url: this.form.url
					}];
					this.form.file = this.form.url;
					this.uploadList = true;
					console.log(this.form);
				} else {
					this.uploadList = false;
					this.form = {
						
					};
				}
				this.visible = true;
			},
			visibleOk() {
				/*弹窗确定回调*/
				this.visible_loading = true;
				this.$refs.ruleForm.validate(valid => {
					if (valid) {
						this.$api.informationmanageApi
							.addOrUpdateBanner({
								id: this.form.id,
								title: this.form.title,
								sort: this.form.sort,
								link: this.form.fileList[0].url,

							})
							.then(res => {
								this.getData();
								this.visible = false;
								this.visible_loading = false;
								this.$message.success(res.data);
								this.$refs.ruleForm.resetFields();
							})
							.catch(res => {
								this.visible_loading = false;
							});
					} else {
						this.visible_loading = false;
						return false;
					}

				});
			},
			UploadImage(param) {
				/*上传文件*/
				this.upload_loading = true;
				const formData = new FormData();
				formData.append('file', param.file);
				formData.append('imageType', 'homePage');
				this.$api.informationmanageApi
					.addOrUpdateBanner(formData)
					.then(res => {
						this.uploadList = false;
						this.uploadList = true;
						this.form.fileList = [{
							name: res.data.id,
							url: res.data.fileUrl
						}];
						this.form.file = res.data.fileUrl;
						this.upload_loading = false;
						this.$message.success('上传图片成功');
						this.$refs.ruleForm.validateField('file');
					})
					.catch(res => {
						this.upload_loading = false;
						this.$message.error(errMsg);
					});
			},
			uploadList_Delete() {
				/*删除上传图片列表*/
				this.uploadList = false;
				this.form.fileList = [];
				this.form.file = undefined;
			}
		},
		mounted() {
			this.getData();
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
