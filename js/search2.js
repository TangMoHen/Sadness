window.onload=function(){
	$("#search-q").click(function(){
		$("nav .search-goods").children('li').remove();  // 删除ul下的子元素li
		var value=$("#search-s").val();
		$.ajax({
			url:`https://www.kpmaolv.com/maolv/commodity/search?currentPage=1&keyWord=[;commodity_name;:;${value};]&pageSize=999`,
			dataType:'json',
			cache:false,
			type:'post',
			success:function(r){
				// console.log(r.data.commodityList);
				if(r.result=='0000'){
					for(var i=0;i<r.data.commodityList.length;i++){
			            $(`<li>
							<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
								<img src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
								<i class="fl"></i>
								<span class="introduce">
									${r.data.commodityList[i].commodity_name}
								</span>
								<div class="fl">
									￥
									<b>${r.data.commodityList[i].commodity_imgprice}</b>
								</div>
								<div class="fr sell">
									已售${r.data.commodityList[i].commodity_sales}笔
								</div>
							</a>
						</li>`).appendTo('.search-goods');
			        }
				}else{
			       alert("无此类商品");
			       $("#search-s").val("请输入商品名称");
				}
			},
			error:()=>{
				alert('错了404');
			}
		});
	})
	
	
	
	
	
	

}