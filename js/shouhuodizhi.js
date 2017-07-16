/**
 * Created by 周贺星 on 2017/7/1.
 */
if(document.referrer == "http://localhost:63342/PC/shopping/payment-details.html"){
    sessionStorage.setItem("url",document.referrer);
}else{
    sessionStorage.setItem("url",document.referrer);
}
var qu = ''
var url=''
function q() {
    $("#testSelect").find('option:selected').text();
}

var vm = new Vue({
    el:"#form1",
    data:{
        gyms:[]
    }
});
function getUrlParam (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!= null) {
        return decodeURI(r[2]);
    }else{
        return null;
    }
}
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
}
$('#city-picker').click(function () {
    var name = $('#consignee').val();
    var tel = $('#deliveryPhone').val();
    url = "xuanzequ.html?name="+name+"&tel="+tel;
    window.location.href=url
});

$('#city-picker').val("河北省 石家庄 " +qu);
console.log($('#city-picker').val());
$.ajax({
    url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+qu,
    type:"get",
    dataType:"json",
    success:function (data) {
        console.log(data);
        vm.gyms = data;
    }
});
var user = JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="index1.html"
}
$("#ok").click(function () {
    var url = sessionStorage.getItem("url")
    var consignee=$("#consignee").val();
    var deliveryPhone=$("#deliveryPhone").val();
    console.log(vm.gyms.data.length);
    var storeId =$("#testSelect").find('option:selected').text();
    var data11 = sessionStorage.getItem("user");
    var data111=JSON.parse(data11);
    console.log(data111);
    var userId = data111.date.user_id;
    console.log(userId);
    var store_id = "";
    for (var i=0;i<vm.gyms.data.length;i++){
        if (vm.gyms.data[i].store_name == storeId){
            store_id = vm.gyms.data[i].store_id
            console.log(store_id);
        }
    }
    $.ajax({
        type:"get",
        url:"http://www.kpmaolv.com/maolv/delivery/addDelivery",
        data:{
            consignee:consignee,
            deliveryPhone:deliveryPhone,
            storeId:store_id,
            userId:userId
        },
        dateType:"json",
        success:function (adress) {
            switch (adress.result) {
                case "0000":
                    alert("添加成功");
                    if(url == null){
                        window.location.href = "../userlogin/shouhuodizhiguanli.html"
                    }else {
                        window.location.href = url;
                    }
                    break;
                case "1000":
                    alert("添加失败");
                    break;
                case "9993":
                    alert("请输入完整的地址");
                    break;
                case "5001":
                    alert("收货地址最大上线为5，请删除一个收货地址再进行添加操作");
                    break;
            }
        },

        error:function () {
            alert("网络异常")
        }

    });
})
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};