window.onload=function(){
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px';
    window.onresize=function(){
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px'
    }
    //以上是rem布局代码

    var search=window.location.search;


    var user = JSON.parse(sessionStorage.getItem("user"));
    var userId=user.date.user_id;
    console.log(user);

    $.ajax({
        url:`https://www.kpmaolv.com/maolv/userInfo/searchUserInfo?user_id=${userId}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data.user_info_integral);
            if(r.result=="0000"){
                // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
                var b=r.data.user_info_integral; //获取用户总积分
                $.ajax({
                    url:`https://www.kpmaolv.com/maolv/Integral/queryintegralinfo${search}`,
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
						兑换
				</div>
				 `).appendTo('body');

                            var important=r.data[0].commodity.business_id;
                            console.log(r.data[0].user_info_integral);
                        }
                        $(".qd").click(function(){
                            var a=r.data[0].integral_mall_price;  //获取商品所需积分

                            if (b>a){
                                window.location.href=`Exchange-confirm.html?integralMallId=${r.data[0].integral_mall_id}`;
                            }else{
                                alert('您的积分不足！')
                            }
                            // alert(a);
                            // alert(b);
                            // alert(userId);
                            // alert(important);
                            // $.post(url,txt,function (data) {
                            //     if(data.msg==1){
                            //         // console.log(userId);
                            //         // console.log(important);
                            //     }
                            // })
                        })
                    },
                    error:()=>{
                        alert('加载错误请重新刷新');
                    }
                })
            }
        },
        error:()=>{
            alert('加载错误请重新刷新');
        }
    })




    //后台提取数据渲染页面
}