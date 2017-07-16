/**
 * Created by 周贺星 on 2017/7/1.
 */
function getUrlParam (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!= null) {
        return decodeURI(r[2]);
    }else{
        return null;
    }
}
var qu = null;
var url='';
var proId1=getUrlParam("id")
var name1=getUrlParam("name");
var tel1=getUrlParam("tel");
$('#consignee').val(name1);
$('#deliveryPhone').val(tel1);
if (proId1==1){
    qu = "新华区"
    console.log(qu)
}else if (proId1 == 2){
    qu = "长安区"
    console.log(qu)
}
else if (proId1 == 3){
    qu = "桥东区"
    console.log(qu)
}
else if (proId1 == 4){
    qu = "桥西区"
    console.log(qu)
}
else if (proId1 == 5){
    qu = "裕华区"
    console.log(qu)
}else{
    qu = proId1;
}

var deleId=getUrlParam("id1");
var delei = {'name':deleId}
console.log(delei.name);
//    JSON.parse(deleId);
console.log(deleId);
var vm = new Vue({
    el:"#form1",
    data:{
        dele:[],
        gyms:[]
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+qu,
//        url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu=新华区",
    type:"get",
    dataType:"json",
    success:function (data) {
        console.log(data);
        vm.gyms = data.data;
    }
});
console.log(qu);
$('#city-picker').val("河北省 石家庄"+qu);
console.log($('#city-picker').val());
$(document).on("click",'#city-picker',function () {
    var name = $('#consignee').val();
    var tel = $('#deliveryPhone').val();
    url = "xuanzequ1.html?name="+name+"&tel="+tel+"&id1="+deleId;
    window.location.href=url
});

var data1 = {"user":"user_id"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id;
$.ajax({
    url:"https://www.kpmaolv.com/maolv/delivery/searchDelivery",
    type:"post",
    dataType:"json",
    data:{
        userId:data11111
    },
    success:function (ResponseText) {
        vm.dele = ResponseText.data;
        console.log(vm.dele);
        sessionStorage.setItem("delevery",JSON.stringify(ResponseText));
    }
});

vm.$watch('dele',function(val) {
    if (name1 !== null){
        $('#consignee').val(name1);
    }
    if (qu !== null){
        $('#city-picker').val(qu);
    }
    if (tel1 !==null){
        $('#deliveryPhone').val(tel1)
    }

    console.log(name1)
});
$("#ok").click(function () {
    var consignee = $("#consignee").val();
    var deliveryPhone = $("#deliveryPhone").val();
    var ququ = $('#city-picker').val()
    console.log(ququ);
    var storeId = $("#testSelect").find('option:selected').text();
    var data11 = sessionStorage.getItem("user");
    var data111 = JSON.parse(data11);
    var userId = data111.date.user_id;
    console.log(userId);
    console.log(vm.gyms)
    var store_id = "";
//        var isDefault = "";
    for (var i = 0; i < vm.gyms.length; i++) {
        if (vm.gyms[i].store_name == storeId) {
            store_id = vm.gyms[i].store_id
            console.log(store_id);
        }
    }
    console.log(deleId);
//        for (var i = 0; i < vm.dele.length; i++) {
//            if (vm.dele[i].store_name == deleId) {
//                isDefault = vm.dele[i].store_status
//            }
//        }
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/delivery/updateDelivery",
        type: "get",
        dataType: "json",
        data: {
            deliveryId: deleId,
            deliveryPhone: deliveryPhone,
            consignee: consignee,
            storeId: store_id,
            userId: data11111
        },
        success: function (data) {
            var result = data.reMessage;
            alert(result);
        }
    });
});
// vm.$watch('gyms',function(val){
//     var loading = document.getElementById('loading')
//     loading.style.display='none';
// });