window.onload=function(){
	$("#search-q").click(function(){
		$("nav .search-goods").children('li').remove();  // 删除ul下的子元素li
		var value=$("#search-s").val();
		$.ajax({
			url:`https://www.kpmaolv.com/maolv/commodity/search?currentPage=1&keyWord=[;commodity_name;:;${value};,;commodity_status;:;1;]&pageSize=999`,
			dataType:'json',
			cache:false,
			type:'post',
			success:function(r){
				console.log(r);
				if(r.result=='0000'){
					for(var i=0;i<r.data.commodityList.length;i++){
			            if(r.data.commodityList[i].commodity_category_id=="5096d338-6903-11e7-ae62-525400aa263a"){
							$(`<li>
								<a href="../goods/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
									<img class="shangp" src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
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
									<img class="fdzq" src="../images/特供_01.png" alt="">
								</a>
							</li>`).appendTo('.search-goods');
						}else if(r.data.commodityList[i].commodity_category_id=="5e355b83-6903-11e7-ae62-525400aa263a"){
							$(`<li>
								<a href="../goods/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
									<img class="shangp" src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
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
									<img class="fdzq" src="../images/特供_01.png" alt="">
								</a>
							</li>`).appendTo('.search-goods');
						}else if(r.data.commodityList[i].commodity_category_id=="64d7a287-6903-11e7-ae62-525400aa263a"){
							$(`<li>
								<a href="../goods/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
									<img class="shangp" src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
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
									<img class="fdzq" src="../images/特供_01.png" alt="">
								</a>
							</li>`).appendTo('.search-goods');
						}else if(r.data.commodityList[i].commodity_category_id=="6b9f0aa8-6903-11e7-ae62-525400aa263a"){
							$(`<li>
								<a href="../goods/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
									<img class="shangp" src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
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
									<img class="fdzq" src="../images/特供_01.png" alt="">
								</a>
							</li>`).appendTo('.search-goods');
						}else{
							$(`<li>
								<a href="../goods/goods-details.html?id=${r.data.commodityList[i].commodity_id}" class="clearFix">
									<img class="shangp" src="${r.data.commodityList[i].commodity_coverimg}" alt="" />
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
	
	
	
	$("#cart img").click(function(){
		 window.location.href="../shopping-cart/shopping-cart.html";
	});
	
	//点击跳转购物车页面

}