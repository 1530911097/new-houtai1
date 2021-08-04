<template>
	<div class="wrap">
		<!-- 查询条件k -->
		<div class="wrap-block">
			<el-form :model="formInline" inline size="small">
				<el-form-item label="昵称"><el-input v-model="formInline.account" clearable placeholder="请输入昵称"></el-input></el-form-item>
				<el-button type="primary" @click="search" size="small">查 询</el-button>
				<el-button type="warning" @click="back" size="small">返回上级</el-button>
			</el-form>
			<div class="Tree-Title">钱包名称&nbsp;|&nbsp;地址&nbsp;|&nbsp;网体持币量&nbsp;|&nbsp;注册时间</div>
			<el-tree ref="eltree" :data="data" :props="props" :load="loadNode" lazy :indent="20" v-loading="loading"></el-tree>
		</div>
		<!-- 查询条件j -->
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			loading: false,
			formInline: {
				/*查询*/
				account: '',
			},
			data: [],
			props: {
				label: 'content',
				children: 'zones',
				isLeaf: 'leaf'
			},
			id:'',
		};
	},
	methods: {
		async loadNode(node, resolve) {/*点击terr控件的回调*/
			this.node = node;
			if (node.level === 0) {
				var i = await this.recommendTree();
				return resolve(i);
			}
			if (node.level >= 1){
				console.log(node.data.id)
				let list = await this.recommendTreeChildNode(node.data.id);
				return resolve(list);
			};
			
		},
		async search() {/*查 询-回调*/
			var w = await this.recommendTree();
			this.data = w
		},
		back() {/*返回上级-回调*/
			this.loading = true;
			this.$api.usermanageApi
				.getParentNode({
					id:this.id,
				})
				.then(res => {
					res.data.forEach(item => {
						item.leaf = item.isThereLeafNode == 0 ? true : false;
					});
					this.data = res.data;
					this.loading = false;
				});
		},
		// 推荐树——子节点查询
		recommendTreeChildNode(id) {
			return new Promise(resolve => {
				this.$api.usermanageApi
					.getRecommendTreeLeafNode({
						id,
					})
					.then(res => {
						res.data.forEach(item => {
							item.leaf = item.isThereLeafNode == 0 ? true : false;
						});
						resolve(res.data);
					});
			});
		},
		// 推荐树——根节点查询
		recommendTree() {
			return new Promise(resolve => {
				this.loading = true;
				this.$api.usermanageApi.getRecommendTreeRootNode({
						userName: this.formInline.account
					})
					.then(res => {
						console.log(res.data.length)
						if(res.data.length){
							this.id = res.data[0].id;
						}
						resolve(res.data);
						this.loading = false;
					});
			});
		},
	},
	mounted() {
	}
};
</script>

<style lang="scss" scoped="scoped">
.Tree-Title {
	font-size: 14px;
	margin: 0px 0px 10px 35px;
}
</style>
