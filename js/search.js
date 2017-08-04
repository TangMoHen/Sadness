window.onload=function(){

	$.ajax({
 		url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val1+";]&currentPage=1&pagesize=10&isfather=1`,
	    dataType:'json', 
	    cache:false,
	    type:'post',
	    success:function(r){
	        console.log(r);
            if(r.result=='2002'){
            	for(let i=1;i<r.categorylist.length;i++){
	$(`<li>${r.categorylist[i].commodity_category_name}</li>`).appendTo('#classification');
                }	
            }else{
            	alert(r.reMessage);
            }
	    },
	    error:()=>{
	        alert('错了404');
	    }
    });
	$("#classification").on("click","li",function(){
		// var oNav=document.getElementById("classification");
		// var aLi=oNav.getElementsByTagName('li');
		var aLi=$("#classification li");
		for( let i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				for( let i=0;i<aLi.length;i++){
					aLi[i].className='';
				}
				this.className='white';
			}
		}
	});


    //以上是分类获取以及点击事件



    $.ajax({
        url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;16b82e4b-660c-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.commoditylist);
            if(r.result=='0000'){
                for(var i=0;i<r.commoditylist.length;i++){
                    $(`<li>
					<a href="javasrcipt:;">
						<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
						<div class="jies">
							<i class="fl"></i>
							<span class="introduce">
								${r.commoditylist[i].commodity_name}
							</span>
						</div>
						<div class="fl" id="money">
							￥
							<b>${r.commoditylist[i].commodity_imgprice}</b>
						</div>
						<div class="fr sell">
							已售519笔
						</div>
					</a>
				</li>`).appendTo('#detailed');
                }
            }else{
                alert("无数据");
            }
        },
        error:()=>{
            alert('错了404');
        }
    });


    //以上是品质水果的获取渲染

    $(function(){
        $("nav #classification").click(function() {
            $("nav #xxx #detailed").children('li').remove();  // 删除ul下的子元素li
            $.ajax({
                url:`https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;25d6e5e1-660c-11e7-ae62-525400aa263a;]&currentPage=1&pagesize=999`,
                dataType:'json',
                cache:false,
                type:'post',
                success:function(r){
                    console.log(r.commoditylist);
                    if(r.result=='0000'){
                        for(var i=0;i<r.commoditylist.length;i++){
                            $(`<li>
					<a href="javasrcipt:;">
						<img class="dd" src="${r.commoditylist[i].commodity_coverimg}" alt="" />
						<div class="jies">
							<i class="fl"></i>
							<span class="introduce">
								${r.commoditylist[i].commodity_name}
							</span>
						</div>
						<div class="fl" id="money">
							￥
							<b>${r.commoditylist[i].commodity_imgprice}</b>
						</div>
						<div class="fr sell">
							已售519笔
						</div>
					</a>
				</li>`).appendTo('#detailed');
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

	//以上是点击删除所有商品

};
