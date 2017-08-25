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
    var state = ["点击领取","已领取"]
    return state[k]
}

var vm = new Vue({
    el:"#tab1",
    data:{
        dele:[],
        dele1:[]
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
for (var i = 0; i < vm.dele.length; i++) {
    if (vm.dele[i].coupons_id == coupons_id) {
        coupons_id = vm.dele[i].coupons_id
        console.log(coupons_id);
    }
}
$.ajax({
    url:"https://www.kpmaolv.com/maolv/coupons/search",
    type:"post",
    dataType:"json",
    data:{},
    success:function (ResponseText) {
        for(var i = 0;i<ResponseText.data.length;i++){
            ResponseText.data[i].is = 0;
        }
        vm.dele = ResponseText.data;
        console.log(vm.dele);
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
        vm.dele1 = ResponseText.data;
        console.log(vm.dele1);
        for (var i=0;i<vm.dele.length;i++){
            for (var j = 0;j<vm.dele1.length;j++){
                if (vm.dele[i].coupons_id == vm.dele1[j].coupons_id){
                    // $('#'+vm.dele[j].coupons_id+' .add-coupons').html('已领取');
                    vm.dele[i].is = 1;
                }
            }
        }
    }
});
function add(val,is) {
    if (is == 1){
    }else {
        $.ajax({
            url:"https://www.kpmaolv.com/maolv/couponsReceive/add",
            type:"post",
            dataType:"json",
            data:{
                user_id:data11111,
                coupons_id:val
            },
            success:function (ResponseText) {
                console.log(ResponseText)
                if(ResponseText.result == 0000){
                    alert('领取成功')
                }
                location.reload()            }
        });
    }
}