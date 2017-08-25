/**
 * Created by 周贺星 on 2017/7/1.
 */
// var user = JSON.parse(sessionStorage.getItem("user"));
// if (user == null){
//     window.location.href="index1.html"
// }
var data1 = {"user":"user_id"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id
console.log(data11111);
var delevery = sessionStorage.getItem("delevery");
var delevery1 = JSON.parse(delevery);
console.log(delevery1)

var vm = new Vue({
    el:"#form1",
    data:{
        dele:[]
    }
});
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
        // sessionStorage.setItem("delevery",JSON.stringify(ResponseText));
    }
});
// var dele11 = sessionStorage.getItem("delevery");
// var dele111=JSON.parse(dele11);
// console.log(dele111);
// dele11111=dele111.data.delivery_id
// delivery_id='';
//
// $("#default").click(function () {
//     $.ajax({
//         url: "https://www.kpmaolv.com/maolv/delivery/updateDelivery",
//         type: "get",
//         dataType: "json",
//         data: {
//             deliveryId: dele11111,
//             isDefault: 0,
//         },
//         success: function () {
//             alert("成功")
//             // var result = ResponceText.reMessage;
//             // alert(result);
//         }
//     });
// })
var id="";
vm.$watch('dele',function () {
    var inp = $('input[name="people"]');
    for (var i = 0;i<inp.length;i++){
        if (inp[i].checked==true){
            id = inp[i].value
        }
    }
    var loading = document.getElementById('loading');
    loading.style.display='none';
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
            // alert(result);
            window.location.reload();
        }
    });
})
var deliveryId = ""
function bbb(val) {
    deliveryId = val;
    console.log(val)
}
function delete1(val) {
    $.confirm("确定要删除地址吗?", "确认删除?", function() {
        $.ajax({
            url: "https://www.kpmaolv.com/maolv/delivery/deleteDelivery",
            type: "get",
            dataType: "json",
            data: {
                deliveryId: val,
            },
            success: function (data) {
                var zhuangtai = data.result;
                if (zhuangtai == "0000"){
                    $.toast("地址已删除!");
                    for (var q = 0; q<vm.dele.length; q++){
                        if (vm.dele[q].delivery_id == val ){
                            vm.dele.splice(q,1);
                        }
                    }
                    // $('#myModal').modal('hide');

                }else {
                    $.toast("地址删除失败!");

                }
            },
            error:function (res) {
                alert("网络异常");

            }
        })

    }, function() {
        //取消操作
    });
}
// function aaa() {
//
// };
//
// vm.$watch('dele',function(val){
//     var loading = document.getElementById('loading')
//     loading.style.display='none';
// });


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
var vm1 = new Vue({
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

$("#start").cityPicker({
    title: "选择省市区/县",
    onChange: function (picker, values, displayValues) {
        console.log(values, displayValues);
        vm.gyms = [];
        if(displayValues[1] == "石家庄市"){
            $.ajax({
                url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+displayValues[2],
                type:"get",
                dataType:"json",
                success:function (data) {
                    console.log(data);
                    vm1.gyms = data;

                }

            });
        }


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
    console.log(vm1.gyms.data.length);
    var storeId =$("#testSelect").find('option:selected').text();
    var data11 = sessionStorage.getItem("user");
    var data111=JSON.parse(data11);
    console.log(data111);
    var userId = data111.date.user_id;
    console.log(userId);
    console.log(storeId);
    var store_id = "";
    for (var i=0;i<vm1.gyms.data.length;i++){
        if (vm1.gyms.data[i].store_name == storeId){
            store_id = vm1.gyms.data[i].store_id
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
                        var url1 =  sessionStorage.getItem('url1');
                        if (url1 !== undefined && url1 !== null){
                            window.location.href = url1;
                            sessionStorage.removeItem('url1')
                        }else {
                            window.location.href = "./shouhuodizhi.html";
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
    }
});






//修改收货地址
var city_picker1 ='';
function bianji(ququ,quququ,name) {
    city_picker1='河北省石家庄'+quququ;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+quququ,
        type:"get",
        dataType:"json",
        success:function (data) {
            console.log(data);
            vm2.gyms1 = data.data;
            console.log(name);
            setTimeout(function () {
                $("#testSelect1 option[value='"+name+"']").attr("selected",true);
            },10)
        }
    });
    $("#city-picker1").val(city_picker1);
    document.getElementById('btn3').style.display='block';
    for( var b=0;b<vm2.dele1.length;b++){
        if(ququ==vm2.dele1[b].delivery_id){
            vm2.delevery1 = vm2.dele1[b]
        }
    }

}
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
var stord1 =getUrlParam("stord")
$('#consignee1').val(name1);
$('#deliveryPhone1').val(tel1);
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
var vm2 = new Vue({
    el:"#btn3",
    data:{
        dele1:[],
        gyms1:[],
        delevery1:[]

    }
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
        vm2.dele1 = ResponseText.data;
        console.log(vm2.dele1);
        sessionStorage.setItem("delevery",JSON.stringify(ResponseText));
    }
});
vm2.$watch('dele',function(val) {
    $("#city-picker1").cityPicker({
        title: "选择省市区/县",
        onChange: function (picker, values, displayValues) {
            console.log(values, displayValues);
            vm.gyms1 = [];
            if(displayValues[1] == "石家庄市"){
                $.ajax({
                    url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+displayValues[2],
//        url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu=新华区",
                    type:"get",
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        vm2.gyms1 = data.data;

                    }
                });
            }

        }
    });
    if (name1 !== null){
        $('#consignee1').val(name1);
    }
    if (qu !== null){
        $('#city-picker1').val('河北省石家庄'+qu);
    }
    if (tel1 !==null){
        $('#deliveryPhone1').val(tel1)
    }
    if (stord1!==null){
        $('#testSelect1').val(stord1)
    }

});
$("#ok1").click(function () {
    var phoneflag=isPhoneNum();
    var consignee = $("#consignee1").val();
    var ququ = $('#city-picker1').val()
    console.log(ququ);
    var storeId = $("#testSelect1").find('option:selected').text();
    var data11 = sessionStorage.getItem("user");
    var data111 = JSON.parse(data11);
    var userId = data111.date.user_id;
    console.log(userId);
    console.log(vm2.gyms1)
    var store_id = "";
//        var isDefault = "";
    for (var i = 0; i < vm2.gyms1.length; i++) {
        if (vm2.gyms1[i].store_name == storeId) {
            store_id = vm2.gyms1[i].store_id
            console.log(store_id);
        }
    }
    console.log(deleId);
//        for (var i = 0; i < vm.dele.length; i++) {
//            if (vm.dele[i].store_name == deleId) {
//                isDefault = vm.dele[i].store_status
//            }
//        }
    if(phoneflag){
        var deliveryPhone = $("#deliveryPhone").val();
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
    }
});

// vm.$watch('gyms',function(val){
//     var loading = document.getElementById('loading')
//     loading.style.display='none';
// });