/**
 * Created by 周贺星 on 2017/7/1.
 */
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
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
console.log(data111);
var tel = data111.date.user_phone
console.log(tel);
$("#ok").click(function () {
    var password= $("#password").val();
    var newpassword=$("#password1").val();
    var confirmPwd=$("#password2").val();
    console.log(newpassword);

    $.ajax({
        type:"post",
        url:"http://www.kpmaolv.com/maolv/user/editPwd",
        dataType:"json",
        data:{
            phone:tel,
            beforePwd:password,
            afterPwd:newpassword,
            reNewPassword:confirmPwd
        },
        success:function (ResponseText) {
            switch (ResponseText.result){
                case "0000":alert("修改密码成功");break;
                case "1000":alert("失败");break;
                case "1002":alert("用户不存在，请注册");break;
                case "1004":alert("密码不一致");break;
                case "1005":alert("原密码错误");break;
                case "9993":alert("参数错误");break;
            }
        },error:function () {
            alert("网络错误")
        }
    })

})