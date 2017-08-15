window.onload=function(){
   document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
   window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
   }
   //以上是rem布局代码

   

	$.ajax({
    	url:`https://www.kpmaolv.com/maolv/Integral/showapp`,
        dataType:'json', 
        cache:false,
        type:'post',
        success:function(r){
           	console.log(r.data);
				if(r.result=='0000'){
					for(var i=0;i<r.data.length;i++){
			            $(`<li>
							<a href="Exchange.html?integralMallId=${r.data[i].integral_mall_id}">
								<img src="${r.data[i].commodity_coverimg}"/>
								<span>${r.data[i].commodity_name}</span>
								<div class="exchange">
									<i class="fl"></i>
									<p class="fl">${r.data[i].commodity_stock}</p>
								</div>
							</a>
						</li>`).appendTo('#commodity');
			        }
				}else{
			       alert("无此类商品");
			       $("#search-s").val("请输入商品名称");
				}
        },
        error:()=>{
            alert('加载错误请重新刷新');
        }
    })
	
	//后台提取数据渲染页面

    $.ajax({
        url:`https://www.kpmaolv.com/maolv/Integral/showapp`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data);
            if(r.result=='0000'){
                for(var i=0;i<r.data.length;i++){
                    $(`<li>
							<a href="Exchange.html?integralMallId=${r.data[i].integral_mall_id}">
								<img src="${r.data[i].commodity_coverimg}"/>
								<span>${r.data[i].commodity_name}</span>
								<div class="exchange">
									<i class="fl"></i>
									<p class="fl">${r.data[i].commodity_stock}</p>
								</div>
							</a>
						</li>`).appendTo('#commodity');
                }
            }else{
                alert("无此类商品");
                $("#search-s").val("请输入商品名称");
            }
        },
        error:()=>{
            alert('加载错误请重新刷新');
        }
    })
}