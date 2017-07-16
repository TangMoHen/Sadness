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
        addCookie("secondsremained",date.toGMTString(),1);//添加cookie记录,有效时间60s
        setCoutDown(date,obj);
    }
}
var nowDate = null;
var time_difference = 0;
var count_down = 0;
function setCoutDown(date,obj) {
    nowDate = new Date();
    time_difference = ((nowDate- date)/1000).toFixed(0);
    count_down = 1 - time_difference;
    console.log(count_down);
    if(count_down<=0){
        obj.removeAttr("disabled");
        obj.val("免费获取验证码");
        addCookie("secondsremained","",1);//添加cookie记录,有效时间60s
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

$("#second").click(function () {
    if (isPhoneNum()){
        var phone=$("#iphone").val();
        alert(phone)
        $.ajax({
            url:"http://www.kpmaolv.com/maolv/randomCode/registerCode",
            type : "get",
            dataType:"json",
            data:{
                "phone":phone,
                "actId":"2",
            },
            success:function (ResponseText) {
                alert(ResponseText);
                //console.log(json);
            },
            error:function () {
                alert("网络错误");
            }
        })
    }
})
$("#submit").click(function () {

    var phone=$("#iphone").val();
    var code=$("#code").val();
    var password=$("#password").val();
    var confirmPwd=$("#password1").val()

    $.ajax({
        type:"post",
        url:"http://www.kpmaolv.com/maolv/user/returnPwd",
        dataType:"json",
        data:{
            phone:phone,
            code:code,
            password:password,
            confirmPwd:confirmPwd
        },
        success:function (ResponseText) {
            switch (ResponseText.result){
                case "0000":alert("修改密码成功");break;
                case "1004":alert("两次密码不一致");break;
                case "9993":alert("参数错误");break;
                case "1049":alert("找回密码失败");break;
            }
        },error:function () {
            alert("网络错误")
        }
    })

})
/**
 * Created by 周贺星 on 2017/7/1.
 */
