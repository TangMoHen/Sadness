window.onload=function(){
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px';
    window.onresize=function(){
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px'
    }
    //以上是rem布局代码

    var search=window.location.search;

     $.ajax({
         url:`https://www.kpmaolv.com/maolv//Integral/queryintegralinfo${search}`,
         dataType:'json',
         cache:false,
         type:'post',
         success:function(r){
             console.log(r.data);
			 if(r.result=='0000'){
				 $(`
				 <nav>
					<ul class="clearFix">
						<li>
							<img src="${r.data[0].commodity.commodity_coverimg}" alt="">
						</li>
					</ul>
				</nav>
				<div class="commodity-name">
					<span>${r.data[0].commodity.commodity_name}</span>
					<div class="exchange clearFix">
						<i class="fl"></i>
						需要积分：<span>${r.data[0].integral_mall_price}</span>
					</div>
				</div>
				<div class="describe">
					<h4>产品描述</h4>
					<p>
						${r.data[0].commodity.commodity_description_word}
					</p>
				</div>
				<div class="qd">
					<a href="javasrcipt:;">
						兑换
					</a>
				</div>
				 `).appendTo('body');
			 }
			 $(".qd").click(function(){
			     var important=r.data[0].commodity.business_id;
			     var userId=sessionScope.user_id;
			     // console.log(important);
                 $.post(url,txt,function (data) {
                     if(data.msg==1){
                        alert(userId)
                     }
                 })
             })
         },
         error:()=>{
             alert('加载错误请重新刷新');
         }
     })

    //后台提取数据渲染页面

}