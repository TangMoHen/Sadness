/**
 * Created by dell on 2017/6/28.
 */
var user = sessionStorage.getItem("user");
if (user == null){
    // window.location.href="../userlogin/index1.html";
}
var data111=JSON.parse(user);
data11111= data111.date.user_id;
var proId = location.search;
proId = proId.substr(1).split("=")[1];

var vm = new Vue({
    el:"#details",
    data:{
        gyms:[],
        arr:[],
        arr1:[],
        arr2:[]
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
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        }
    },
    computed: {
        num1: function () {
            var sum = 0;
            for (var i = 0; i < this.gyms.length; i++) {
               sum += this.gyms[i].orderInfo.order_buyNumber * this.gyms[i].orderInfo.order_price
            }
            return sum.toFixed(2);
            },
        num2: function () {
            var sum = 0;
            for (var i = 0; i < this.gyms.length; i++) {
                sum += this.gyms[i].orderInfo.order_buyNumber * this.gyms[i].orderInfo.order_price
            }
            return parseInt(sum);
        }
        }
    });
function getStatus(index){
    var arr = ['000000','待付款','已付款','待发货','待收货','待评价','已评价','退款中','退款成功','退款失败'];
    return arr[index]
}
/*$.ajax({
    url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";]",
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.gyms = data.pd.orderList;
    }
});*/
$.ajax({
    url: "https://www.kpmaolv.com/maolv/order/searchUserOrderInfo",
    type: "POST",
    dataType: "json",
    data:{
        "order_num":proId
    },
    success: function (data) {
        vm.gyms = data.data.list;
        vm.arr2 = data.data.delivery;
    },
    error:function (data) {
    }
});
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
var order_id = "";
function delete1(val) {
    order_id = val;
}
var order_num = "";
function sum(val,k) {
    $('#total1').html(val);
    order_num = k;
}
function delete2() {
    $("#add-1").show();
    $.ajax({
        type:"post",
        url:"https://www.kpmaolv.com/maolv/order/cancleOrder",
        data:{
            order_num:order_id
        },
        dataType: "json",
        success:function(data) {
            if (data.result === "0000"){
                $("#add-1").hide();
                $("#add").html("取消成功");
                $("#add").show();
                setTimeout(function () {
                    $("#add").hide();
                },2000);
                history.go(-1);location.reload();
            }
            if (data.result === "1000"){
                $("#add-1").hide();
                $("#add").html("操作失败");
                $("#add").show();
                setTimeout(function () {
                    $("#add").hide();
                },2000);
            }
        },
        error:function (res) {
            $('#add').html("取消失败");
            setTimeout(function () {
                $("#add").show();
                $('#add-1').hide();
                alert('请检查你的网络');
                setTimeout(function () {
                    $("#add").hide();
                },1000)
            },10000)
            $('#myModal').modal('hide');}

    })
}
function confirm() {
    $("#add-1").show();
    $.ajax({
        type:"post",
        url:"https://www.kpmaolv.com/maolv/order/confirmReceipt",
        data:{
            order_id:order_id,
            order_status:5
        },
        dataType: "json",
        success:function(data) {
            if (data.result === "0000"){
                $("#add-1").hide();
                $("#add").html("确认收货成功");
                $("#add").show();
                setTimeout(function () {
                    $("#add").hide();
                },2000);
                window.location.reload();
            }
            if (data.result === "6666"){
                alert("操作失败")
            }
        },
        error:function (res) {
            alert("失败");
            $('#myModal').modal('hide');}
    })
}
$("#add-order").click(function () {
    $.ajax({
        type: "post",
        url: "https://www.kpmaolv.com/maolv/wx/wxpay",
        dataType: "json",
        data: {
            order_num:order_num
        },
        success: function (data) {
            var appId = data.appId;
            var timeStamp = data.timeStamp;
            var nonceStr = data.nonceStr;
            var package = data.package;
            var signType = data.signType;
            var paySign = data.paySign;
            //alert("appId:" + appId)
            //alert("timeStamp:" + timeStamp)
            //alert("nonceStr:" + nonceStr)
            //alert("package:" + package)
            //alert("signType:" + signType)
            //alert("paySign:" + paySign)
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": appId,
                    "timeStamp": timeStamp,
                    "nonceStr": nonceStr,
                    "package": package,
                    "signType": signType,
                    "paySign": paySign
                }, function (res) {
                    //alert(res.err_msg);
                    WeixinJSBridge.log(res);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        window.location.href = "../order/my-order.html"
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    } else {
                    }
                });
        },
        error: function (res) {
            alert("网络异常");
        }
    });
});
vm.$watch('gyms',function(val) {
    var loading = document.getElementById('loading');
    loading.style.display='none';
});
