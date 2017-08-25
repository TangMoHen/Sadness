window.onload=function () {
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/1080+'px';
    window.onresize=function(){
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/1080+'px'
    }
    //以上是rem布局代码

    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null){
        var userId=user.date.user_id;
    }else{
        window.location.href='./userlogin/index1.html'
    }


    $.ajax({
        url:`https://www.kpmaolv.com/maolv/userInfo/searchUserInfo?user_id=${userId}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            if(r.result=="0000"){
                // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
                $('#jifen').append(`${r.data.user_info_integral}`);
            }
        },
        error:()=>{
            alert('加载错误请重新刷新');
        }
   })

    $('#goumai').click(function () {
        sessionStorage.removeItem('date');
        sessionStorage.removeItem('arr');
        sessionStorage.removeItem('class-left');
        sessionStorage.removeItem('class-top');
        sessionStorage.setItem('selected',56);

        window.location.href="./index.html";

    })
    
    $.ajax({
        url:`https://www.kpmaolv.com/maolv/sign/sign?user_id=${userId}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
        	console.log(r)
            if(r.result=="0000"){
                // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
                $("#jifen").empty();
            	$(`
            	<li id="qiandao2">
					<img src="images/签到01_01.png" alt="" class="qd"/>
					<div>
						已签到
					</div>
				</li>
            	`).appendTo('.task-b');
            	alert('签到成功！');
            	$.ajax({
		            url:`https://www.kpmaolv.com/maolv/userInfo/searchUserInfo?user_id=${userId}`,
		            dataType:'json',
		            cache:false,
		            type:'post',
		            success:function(r){
		                if(r.result=="0000"){
		                    // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
		                    $('#jifen').append(`${r.data.user_info_integral}`);
		                }
		            },
		            error:()=>{
		               alert('加载错误请重新刷新');
		            }
   				})
            }else if(r.result=="4447"){
                $("#jifen").empty();
            	$(`
            	<li id="qiandao2">
					<img src="images/签到01_01.png" alt="" class="qd"/>
					<div>
						已签到
					</div>
				</li>
            	`).appendTo('.task-b');
            	alert('今日已签到!');
            	$.ajax({
            		url:`https://www.kpmaolv.com/maolv/userInfo/searchUserInfo?user_id=${userId}`,
            		dataType:'json',
	           		cache:false,
		            type:'post',
		            success:function(r){
		                if(r.result=="0000"){
		                    // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
		                    $('#jifen').append(`${r.data.user_info_integral}`);
		                }
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
}
