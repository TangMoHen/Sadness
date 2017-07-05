window.onload=function(){
	let oLogin=document.getElementById('login');
	let oLgin=document.getElementById('login-z');
	oLgin.onclick=function(){
		oLogin.style.display='block';
	};

	var oDiv=document.getElementById('recharge ');
	var oSelect=oDiv.getElementById('sel1');
	oSelect.onchange=function(){
		alert('恭喜您'+this.value+'充值成功');
	}
};