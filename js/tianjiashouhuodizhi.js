/**
 * Created by 周贺星 on 2017/8/1.
 */
function isPhoneNum(){
    var phonenum = $("#deliveryPhone").val();
    var myreg = /^1(3|4|5|7|8)\d{9}$/;
    if(!myreg.test(phonenum)){
        alert('请输入有效的手机号码！');
        return false;
    }else{
        return true;
    }
}

var qu = ''
var url=''
function q() {
    $("#testSelect").find('option:selected').text();
}
var vm = new Vue({
    el:"#btn2",
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

$("#city-picker").cityPicker({
    title: "选择省市区/县",
    onChange: function (picker, values, displayValues) {
        console.log(values, displayValues);
        $.ajax({
            url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+displayValues[2],
            type:"get",
            dataType:"json",
            success:function (data) {
                console.log(data);
                vm.gyms = data;
            }
        });

    }

});


// var user = JSON.parse(sessionStorage.getItem("user"));
// if (user == null){
//     window.location.href="index1.html"
// }
$("#ok").click(function () {
    var phoneflag=isPhoneNum();
    var consignee=$("#consignee").val();
    // var deliveryPhone=$("#deliveryPhone").val();
    console.log(vm.gyms.data.length);
    var storeId =$("#testSelect").find('option:selected').text();
    var data11 = sessionStorage.getItem("user");
    var data111=JSON.parse(data11);
    console.log(data111);
    var userId = data111.date.user_id;
    console.log(userId);
    console.log(storeId);
    var store_id = "";
    for (var i=0;i<vm.gyms.data.length;i++){
        if (vm.gyms.data[i].store_name == storeId){
            store_id = vm.gyms.data[i].store_id
            console.log(store_id);
        }
    }
    if(phoneflag){
        var phonenum=$("#deliveryPhone").val();
        $.ajax({
            type:"get",
            url:"http://www.kpmaolv.com/maolv/delivery/addDelivery",
            data:{
                consignee:consignee,
                deliveryPhone:phonenum,
                storeId:store_id,
                userId:userId
            },
            dateType:"json",
            success:function (adress) {
                switch (adress.result) {
                    case "0000":
                        alert("添加成功");
                        // var url1 =  sessionStorage.getItem('url1');
                        // if (url1 !== undefined && url1 !== null){
                        //     window.location.href = url1;
                        // }else {
                        //     window.location.href = "shouhuodizhiguanli.html";
                        // }
                        // break;
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
    }
});

// window.onload = function() {
//     var loading = document.getElementById('loading')
//     loading.style.display='none';
// };