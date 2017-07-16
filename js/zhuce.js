
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
        var phone=$("#iphone").val();
        $.ajax({
            url:"http://www.kpmaolv.com/maolv/randomCode/registerCode",
            type:"post",
//                dataType:"json",
            data:{
                "phone":phone,
                "actId":"1"
            },
            success:function (ResponceText) {
                var result=ResponceText.reMessage;
                alert(result);
            },
            error:function () {
                alert("网络错误");
            }
        })
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

//密码强度
function pwStrength(pwd) {
    O_color = "#eeeeee";
    L_color = "#ff0000";
    M_color = "#f60";
    H_color = "#060";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = O_color;
    } else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = L_color;
                Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                Lcolor = L_color;
                Mcolor = M_color;
                Hcolor = H_color;
        }
    }
    $("#strength_L").css('background-color', Lcolor);
    $("#strength_M").css('background-color', Mcolor);
    $("#strength_H").css('background-color', Hcolor);
    return;
}

//判断输入密码的类型
function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 4;
    else return 8;
}
//bitTotal函数
//计算密码模式
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//返回强度级别
function checkStrong(sPW) {
    if (sPW.length <= 4) return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //密码模式
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

$(function(){
    $("#form1").validate();
});


//判断密码是否一致
function pwdflag() {
    var pwd=$("#password").val();
    var pwd1=$("#password1").val();
    if (pwd==''&&pwd==null){
        alert("不能为空")
        return false;
    }else {
        if (pwd==pwd1)
            return true;
        else
            return false;
    }
}

//注册按钮点击事件
$("#reg").click(function () {
    var xieyi=document.getElementById("xieyi").checked;
    var phoneflag=isPhoneNum();
    var password=$("#password").val();
    var passwprd1=$("#password1").val();
    var pwdflag1=(password==passwprd1);
    var invitationId=$("#number").val();
    console.log(invitationId);
    var pwdflag2=(passwprd1.length>5&&password.length>5);
    if(invitationId== undefined){
        invitationId = "";
    }else{
        invitationId = invitationId;
    }
    console.log(invitationId);
    if(xieyi){
        document.getElementById("xieyiinfo").innerHTML="";
    }else{
        document.getElementById("xieyiinfo").innerHTML="请同意用户协议!";
    }
    if (!pwdflag2){
        document.getElementById("pwdmes").innerHTML="密码不能低于6位"
    }
    if (phoneflag&& pwdflag()&&xieyi&&pwdflag1&&pwdflag2){
        var phonenum=$("#iphone").val();
        var password=$("#password").val();
        var code=$("#code").val();
        var repassword=$("#password1").val();
        $.ajax({
            type:"post",
            url:"http://www.kpmaolv.com/maolv/user/register?phone="+phonenum+"&password="+password+"&code="+code+"&confirmPwd="+repassword+"&invitationId="+invitationId,
            date:{},
            dateType:"jsonp",
            success:function (ResponceText) {
                var result=ResponceText.reMessage;
                alert(result);
//                    alert(ResponceText);
                console.log(ResponceText)


                switch (result){
                    case "0000":alert("注册成功");break;
                    case "1001":alert("该用户已注册");break;
                    case "1004":alert("两次密码不一致");break;
                    case "1045":alert("验证码输入错误");break;
                    case "1044":alert("验证码过期");break;
                    case "1000":alert("注册失败");break;
                    case "9993":alert("参数错误");break;
                }
            },
            error:function () {
                alert("网络异常")
            }
        })
    }else {
        alert("不能注册")
    }
})