$(function(){
    $("#second").click(function (){
        sendCode($("#second"));
    });
    checkCountdown();
})
//校验打开页面的时候是否要继续倒计时
function checkCountdown(){
    var secondsremained = $.cookie("secondsremained");
    if(secondsremained){
        var date = new Date(unescape(secondsremained));
        setCoutDown(date,$("#second"));
    }
}
//发送验证码
function sendCode(obj){
    var phonenum = $("#iphone").val();
    var result = isPhoneNum();
    if(result){
//加载ajax 获取验证码的方法
// doPostBack('${base}/login/getCode.htm',backFunc1,{"phonenum":phonenum});
        var date = new Date();
        addCookie("secondsremained",date.toGMTString(),60);//添加cookie记录,有效时间60s
        setCoutDown(date,obj);
    }
}
var nowDate = null;
var time_difference = 0;
var count_down = 0;
function setCoutDown(date,obj) {
    nowDate = new Date();
    time_difference = ((nowDate- date)/1000).toFixed(0);
    count_down = 60 - time_difference;
    console.log(count_down);
    if(count_down<=0){
        obj.removeAttr("disabled");
        obj.val("免费获取验证码");
        addCookie("secondsremained","",60);//添加cookie记录,有效时间60s
        return;
    }
    obj.attr("disabled", true);
    obj.val("重新发送(" + count_down + ")");
    setTimeout(function() { setCoutDown(date,obj) },1000) //每1000毫秒执行一次
}
//发送验证码时添加cookie
function addCookie(name,value,expiresHours){
//判断是否设置过期时间,0代表关闭浏览器时失效
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresHours*1000);
        $.cookie(name, escape(value), {expires: date});
    }else{
        $.cookie(name, escape(value));
    }
}
//    (/^1(3|4|5|7|8)\d{9}$/.test(phone))
//校验手机号是否合法
function isPhoneNum(){
    var phonenum = $("#iphone").val();
    var myreg = /^1(3|4|5|7|8)\d{9}$/;
    if(!myreg.test(phonenum)){
        alert('请输入有效的手机号码！');
        return false;
    }else{
        return true;
    }
}