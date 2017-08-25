window.onload=function(){
	document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
   	window.onresize=function(){
		document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
   	}
   	//以上是rem布局代码
    // var oNav=document.getElementById("nav");
	// var aLi=oNav.getElementsByTagName("div");
	// var oCon=document.getElementById("contentop");
	// var aUl=oCon.getElementsByTagName('ul');
	// for(let i=0;i<aLi.length;i++){
	// 	aLi[i].index=i;
	// 	aLi[i].onclick=function(){
	// 		for(var i=0;i<aLi.length;i++){
	// 			aLi[i].className='fl';
	// 			aUl[i].style.display='none';
	// 		}
	// 		this.className='fl bor-b';
	// 		aUl[this.index].style.display='block';
	// 	}
	// }
	//点击事件

    var user = JSON.parse(sessionStorage.getItem("user"));
    var userId=user.date.user_id;

    $.ajax({
        url:`https://www.kpmaolv.com/maolv/integralHistory/searchByUser?pageSize=999&currentPage=1&keyWord=[;user_id;:;${userId};]

`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data);
            if(r.result=='0000'){
                for(var i=0;i<r.data.length;i++){
                    $(`
                        <li>
                            <span class="fl">第${i+1}单</span>
                            <span class="fr">-${r.data[i].integral_history_total}</span>
                        </li>
                    `).appendTo('.record');
                    sessionStorage.did=r.data.delivery_id;
                }
            }else{
                alert(r.reMessage);
            }
        },
        error:()=>{
            alert('错了404');
        }
    });
};