window.onload=function(){
	var oNav=document.getElementById("classification");
	var aLi=oNav.getElementsByTagName('li');
	for( var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for( var i=0;i<aLi.length;i++){
				aLi[i].className='';
			}
			this.className='white';
		}
	}
}