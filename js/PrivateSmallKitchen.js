
window.onload=function(){
	document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px';
   window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px'
   }
   //以上是rem布局代码

	var oNav=document.getElementById("kitchen");
	var aLi=oNav.getElementsByTagName('li');
	for( var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for( var i=0;i<aLi.length;i++){
				aLi[i].className='';
			}
			this.className='red';
		}
	}
}