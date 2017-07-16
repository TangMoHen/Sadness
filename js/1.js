var user = JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="index1.html"
}
var data1 = {"user":"user_id"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id
console.log(data11111);
var delevery = sessionStorage.getItem("delevery")
var delevery1 = JSON.parse(delevery);
console.log(delevery1)

var vm = new Vue({
    el:"#form1",
    data:{
        dele:[]
    }
});
console.log(data.dele)
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
var dele11 = sessionStorage.getItem("delevery");
var dele111=JSON.parse(dele11);
console.log(dele111);

delivery_id='';
$("#default").click(function () {
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/delivery/updateDelivery",
        type: "get",
        dataType: "json",
        data: {
            deliveryId: dele11111,
            isDefault: 0,
        },
        success: function (ResponseText) {
            var result = ResponceText.reMessage;
            alert(result);
        }
    });
})
var id="";
vm.$watch('dele',function () {
    var inp = $('input[name="people"]');
    for (var i = 0;i<inp.length;i++){
        if (inp[i].checked==true){
            id = inp[i].value
        }
    }
});
$(document).on("click","input[name='people']",function () {
    var deleid = "";
    var isDefault = "";
    var phone = "";
    var user1 ="";
    var storeId="";
    console.log($('input[name="people"]'));
    var inp = $('input[name="people"]');
    for (var i = 0;i<inp.length;i++){
        if (inp[i].checked==true){
            id = inp[i].value
        }
    }
    console.log(id);
    for (var i = 0;i<vm.dele.length;i++){
        if (id == vm.dele[i].delivery_id){
            deleid=vm.dele[i];
        }
    }
    console.log(deleid);
    isDefault = deleid.delivery_isDefault;
    phone= deleid.delivery_phone;
    user1 = deleid.delivery_consignee;
    storeId = deleid.store_id;
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/delivery/updateDelivery",
        type: "get",
        dataType: "json",
        data: {
            deliveryId: id,
            isDefault: isDefault,
            deliveryPhone:phone,
            consignee:user1,
            storeId:storeId,
            userId:data11111
        },
        success: function (data) {
            var result = data.reMessage;
            alert(result);
        }
    });
});
function aaa(val) {
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/delivery/updateDelete",
        type: "get",
        dataType: "json",
        data: {
            deliveryId: val,
        },
        success: function (data) {
            alert("qud")
            window.location.reload()
            console.log(data);
        }
    });
}
