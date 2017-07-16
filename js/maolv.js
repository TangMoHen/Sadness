var user= JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="index1.html"
}
var data1 = {"user":"user_info_nick"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id;
console.log(data111);

var vm = new Vue({
    el:"#form1",
    data:{
        gyms:[]
    }
});
$("#reg").click(function () {
    var user1 = $("#user").val();
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/user/editUser",
        type: "get",
        dataType: "json",
        data: {
            userId:data11111,
            nick:user1

        },

        success: function (data) {
            var result = data.reMessage;
            alert(result);
            console.log(vm.dele);
            window.location.reload()
        }
    });
});

vm.$watch('gyms',function(val){
    var loading = document.getElementById('loading')
    loading.style.display='none';
});