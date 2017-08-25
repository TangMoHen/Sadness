/**
 * Created by 周贺星 on 2017/8/20.
 */
var data1 = {"user":"user_id"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id;
console.log(data11111);
function stat(k) {
    var state = ["已使用","未使用","已过期"]
    return state[k]
}

var vm = new Vue({
    el:"#tab1",
    data:{
        dele:[],
    },
    filters: {
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day ;
        }

    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/couponsReceive/search",
    type:"post",
    dataType:"json",
    data:{
        user_id:data11111,
        coupons_receive_status:1
    },
    success:function (ResponseText) {
        vm.dele = ResponseText.data;
        console.log(vm.dele);
    }
});