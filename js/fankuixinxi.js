/**
 * Created by 周贺星 on 2017/7/1.
 */
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id;
console.log(data11111);
$("#ok").click(function () {
    var text=$("#text").val();
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/feedback/add",
        type:"post",
        dataType: "json",
        data:{
            info:text,
            id:data11111
        },
        success:function(data) {
            console.log(data)
            alert("反馈成功");
        },
        error:function (res) {
            console.log(res)
            alert("反馈失败");
        }
    })
})
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};