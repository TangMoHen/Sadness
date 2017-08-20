window.onload=function(){
	
	$.ajax({
 		url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val1+";]&currentPage=1&pagesize=10&isfather=1`,
	    dataType:'json', 
	    cache:false,
	    type:'post',
	    success:function(r){
	        // console.log(r);
            if(r.result=='2002'){
            	for(let i=1;i<r.categorylist.length;i++){
	$(`<li id="sss${i}">${r.categorylist[i].commodity_category_name}</li>`).appendTo('#classification');
                }

                //动态加载
                $("#classification").on("click","li",function(){
                    $( this).addClass( "white").siblings().removeClass( "white");
                })

				//动态加载生成新dom并为dom注册事件
				$(function() {
			        $("nav #classification #sss").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;16b82e4b-660c-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl xxsc"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
				
				$(function() {
			        $("nav #classification #sss1").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;25d6e5e1-660c-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl pzsg"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
				
				$(function() {
			        $("nav #classification #sss2").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;7c190a80-66cc-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl mmly"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
								
				$(function() {
			        $("nav #classification #sss3").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;873d4baa-6622-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl gggg"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
								
				$(function() {
			        $("nav #classification #sss4").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;87cd6c67-66cc-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl tlzq"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
								
				$(function() {
			        $("nav #classification #sss5").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;e344984e-661f-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl dlzq"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
								
				$(function() {
			        $("nav #classification #sss6").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;ed4fabc0-66d9-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl myyp"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
								
				$(function() {
			        $("nav #classification #sss7").click(function() {
			            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
			            $.ajax({
			                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;f745c2b3-661f-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
			                dataType:'json',
			                cache:false,
			                type:'post',
			                success:function(r){
			                     
			                    if(r.result=='0000'){
			                        for(var i=0;i<r.commoditylist.length;i++){
			                            $(`<li>
											<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
												<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
												<div class="jies">
													<i class="fl dhyl"></i>
													<span class="introduce">
														${r.commoditylist[i].commodity_name}
													</span>
												</div>
												<div class="fl" id="money">
													￥
													<b>${r.commoditylist[i].commodity_imgprice}</b>
												</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
											</a>
											
						<div class="m-tip" id="char">
							
						</div>
										</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
										function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
			                        }
			                    }else{
			                        alert("无数据");
			                    }
			                },
			                error:()=>{
			                    alert('错了404');
			                }
			            });
			        });
			    })
            }else{
            	alert(r.reMessage);
            }
	    },
	    error:()=>{
	        alert('错了404');
	    }
    });
    //以上是分类获取以及点击事件



    $.ajax({
        url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;16b82e4b-660c-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
             
            if(r.result=='0000'){
                for(var i=0;i<r.commoditylist.length;i++){
                    $(`<li>
					<a href="https://www.kpmaolv.com/maolv/PC/goofs/goods-details.html?id=${r.commoditylist[i].commodity_id}">
						<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
						<div class="jies">
							<i class="fl xxsc"></i>
							<span class="introduce">
								${r.commoditylist[i].commodity_name}
							</span>
						</div>
						<div class="fl" id="money">
							￥
							<b>${r.commoditylist[i].commodity_imgprice}</b>
						</div>
						<div class="fl sell">
							已售${r.commoditylist[i].commodity_sales}笔
						</div>
					</a>
						<div class="m-tip" id="char">
							
						</div>
				</li>`).appendTo('#detailed');
				$('.m-tip').on('click', addCart);
					function addCart(event) {
						var offset = $('#end').offset(),
							flyer = $('<img class="u-flyer" src="images/购物车-红-72_01.png"/>');
						flyer.fly({
						    start: {
						        left: event.pageX,
						        top: event.pageY
						    },
						    end: {
						        left: offset.left,
						        top: offset.top,
						        width: 20,
						        height: 20
						    }
						});
					}
                }
            }else{
                alert("无数据");
            }
        },
        error:()=>{
            alert('错了404');
        }
    });
};
