window.onload=function(){
   document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
   window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
   }
   //以上是rem布局代码
   
   

//	$.ajax({
//  	url:'https://www.kpmaolv.com/maolv/Integral/showapp',
//      dataType:'json', 
//      cache:false,
//      type:'post',
//      success:function(r){
//         	console.log(r);
//          if(r.result=='0000'){
//          	for(let i=0;i<r.data.length;i++){
//              	$(`<li><a href="${r.data[i].ss}"><img src="${r.data[i].commodity_coverimg}" alt="${r.data[i].commodity_name}" /><span>${r.data[i].commodity_name}</span><div class="exchange"><i class="fl"></i><p class="fl">${r.data[i].integral_mall_price}</p></div></a></li>`).appendTo('#commodity');
//              }	
//          }else{
//          	alert(r.reMessage);
//          }
//      },
//      error:()=>{
//          alert('错了404');
//      }
//  })
//	
	//后台提取数据渲染页面

}