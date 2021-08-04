export default {
	install(Vue) {
		Vue.prototype.$public_Time = function(info) {
			var info_time = new Date(info)
			var time_stamp = info_time.valueOf()
			return time_stamp;
		};
		Vue.prototype.$export2Excel = function(columns, list, name = '数据列表') {
			require.ensure([], () => {
				const {
					export_json_to_excel
				} = require('@/excel/Export2Excel.js');
				let tHeader = []
				let filterVal = []
				console.log(columns)
				if (!columns) {
					return;
				}
				columns.forEach(item => {
					tHeader.push(item.title)
					filterVal.push(item.key)
				})
				const data = list.map(v => filterVal.map(j => v[j]))
				export_json_to_excel(tHeader, data, name);
			})
		};
	},
	exportExcel(data, res) {
		let fileName;
		let contentDisposition = res.headers['content-disposition'];
		if (contentDisposition) {
			fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1], "UTF-8");
		} else {
			fileName = new Date().getTime() + 'xls';
		}
		console.log(fileName)
		let url = window.URL.createObjectURL(new Blob([data]));
		let link = document.createElement('a');
		link.style.display = 'none';
		link.href = url;
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},
}
