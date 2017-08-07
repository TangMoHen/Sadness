
window.onload=function(){
//	var oSeq=$('#search-q');
//	oSeq.onclick=function(){
//		var oSes=$('#search-s').val();
//	    console.log('oSes');
//	}
//	function search1(){
//		var oSearchs=document.getElementById("search-s");
//		var name=oSearchs.value;
		$.ajax({
		url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;]&currentPage=0&isfather=1`,
		    dataType:'json', 
		    cache:false,
		    type:'post',
		    success:function(r){
		        console.log(r);
		    },
		    error:()=>{
		        alert('错了404');
		    }
	    })
//	}
}