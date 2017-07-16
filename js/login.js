
$(function() {
    $('#login #password').focus(function() {
        $('#owl-login').addClass('password');
    }).blur(function() {
        $('#owl-login').removeClass('password');
    });
});
$("#logi").click(function () {
    var email=$("#email").val();
    var password=$("#password").val();
    $.ajax({
        type:"get",
        url:"http://www.kpmaolv.com/maolv/user/login",
        data:{
            phone:email,
            password:password
        },
        dataType:"json",
        success:function (ResponseText) {
            switch (ResponseText.result){
                case "0000":
                    alert("登录成功");
                    console.log(ResponseText);
                    sessionStorage.setItem("user",JSON.stringify(ResponseText));
                    if(document.referrer==""){
                        window.location.href="../index2.html"
                    }
                    else{
                        window.location.href=document.referrer
                }
                    // window.location.href="../shopping/shopping-cart.html";
                    // window.history.go(-1);
                    // window.location.href=  window.history.go(-1);

                    break;
                case "1002":alert("用户名不存在");break;
                case "9993":alert("参数错误");break;
                case "1003":alert("密码错误");break;

            }
        },
        error:function () {
            alert("网络异常")
        }
    })
})
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};