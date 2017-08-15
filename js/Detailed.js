window.onload=function(){
	document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px';
   	window.onresize=function(){
		document.documentElement.style.fontSize=100*document.documentElement.clientWidth/750+'px'
   	}
   	//以上是rem布局代码
    var oNav=document.getElementById("nav");
	var aLi=oNav.getElementsByTagName("div");
	var oCon=document.getElementById("contentop");
	var aUl=oCon.getElementsByTagName('ul');
	for(let i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className='fl';
				aUl[i].style.display='none';
			}
			this.className='fl bor-b';
			aUl[this.index].style.display='block';
		}
	}
	//点击事件
}