window.onload=function(){
   document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
   window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
   };
   //以上是rem布局代码

    var user = JSON.parse(sessionStorage.getItem("user"));
    var user_id = "";
    if(user !== null ){
       user_id = user.date.user_id;
    }else{
        alert("请登录")
    }
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null){
        var userId=user.date.user_id;
    }else{
        window.location.href='./userlogin/index1.html'
    }


    // function mall(){
    //
    // }






    $.ajax({
        url:"https://www.kpmaolv.com/maolv/userInfo/searchUserInfo?user_id="+userId+"",
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
        	console.log(r);
            if(r.result=="0000"){
                // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
                $('#userIntegral').append(r.data.user_info_integral);
            }
        },
        error:function(){
            alert('加载错误请重新刷新');
        }
    })


 $.ajax({
 	url:'https://www.kpmaolv.com/maolv/Integral/showapp',
     dataType:'json',
     cache:false,
     type:'post',
     success:function(r){
 	    console.log(r.data[0]);
				if(r.result=='0000'){
					for(var i=0;i<r.data.length;i++){
                        $("<li>" +
                            "<a href='Exchange.html?integralMallId="+r.data[i].integral_mall_id+"'>" +
                                "<img src="+r.data[i].commodity_coverimg+"/>" +
                                "<span>"+r.data[i].commodity_name+"</span>" +
                                "<div>" +
                                    "<i class='fl'></i>" +
                                    "<p class='fl'>"+r.data[i].integral_mall_price+"</p>" +
                                "</div>" +
                            "</a>" +
                        "</li>").appendTo('#commodity');
                        // $(`<li>
						// 	<a href="Exchange.html?integralMallId=${r.data[i].integral_mall_id}">
						// 		<img src="${r.data[i].commodity_coverimg}"/>
						// 		<span>${r.data[i].commodity_name}</span>
						// 		<div class="exchange">
						// 			<i class="fl"></i>
						// 			<p class="fl">${r.data[i].integral_mall_price}</p>
						// 		</div>
						// 	</a>
						// </li>`).appendTo('#commodity');
			        }
				}else{
			       alert("无此类商品");
			       $("#search-s").val("请输入商品名称");
				}
     },
     error:function () {
         alert('加载错误请重新刷新');
     },
 })
//	
//	// 后台提取数据渲染页面
 var userId=user.date.user_id;
 $('#szmx').attr("Detailed.html?userId="+userId+"");

 $(".detailed").click(function(){
     $("#szmx").attr("href","Detailed.html?"+userId+"");
 });
};