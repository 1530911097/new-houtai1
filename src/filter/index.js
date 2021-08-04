	/*交易类型*/
	function formatTxType(val){
	    if(val==1) return '买';
	    if(val==2) return '卖';
	}
    /*委托状态*/
    function formatTxFlag(val){
        if(val==1) return '未成交';
        if(val==2) return '部分成交';
        if(val==3) return '已完成';
    }
	/*btc委托状态*/
	function formatpayType(val){
	    if(val==0) return 'gc余额支付';
	    if(val==1) return 'all win余额支付';

	}
	/*撤销状态*/
	function formatTxCancelFlag(val){
	    if(val==0) return '未撤销';
	    if(val==1) return '已撤销';
	}
	/*充值状态*/
	function formatFlag(val){
	    if(val==1) return '充值中';
	    if(val==2) return '充值完成';
	    if(val==3) return '充值失败';
	}
	/*提现状态*/
	function formatWithdrFlag(val){
	    if(val==0) return '待确认';
	    if(val==1) return '已确认';
	    if(val==2) return '已汇出';
	    if(val==9) return '待提币处理';
	}
	/*是否开放交易*/
	function formatIsOpen(val){
	    if(val==0) return '未开放';
	    if(val==1) return '开放';
	}
	/*矿池收益结算*/
	function formatOpenPool(val){
	    if(val==0) return '未开放';
	    if(val==1) return '开放';
	}
	/*释放状态*/
	function formatStatus(val){
	    if(val==0) return '未开始';
	    if(val==1) return '释放中';
	    if(val==2) return '已完成';
	}
	/*释放状态2*/
	function formatReleaseFlag(val){
	    if(val==0) return '未释放';
	    if(val==1) return '已释放';
	}
    export{
        formatTxFlag,
		formatTxCancelFlag,
		formatTxType,
		formatFlag,
		formatWithdrFlag,
		formatIsOpen,
		formatOpenPool,
		formatStatus,
		formatReleaseFlag,
		formatpayType
    }