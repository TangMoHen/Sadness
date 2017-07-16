/**
 * Created by dell on 2017/6/28.
 */
var user = sessionStorage.getItem("user");
var order = sessionStorage.getItem("order");
order= JSON.parse(order);
if (user == null){
    window.location.href="http://localhost:63342/PC/login.html";
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
        arr1:[]
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
        console.log(data);
        vm.gyms = data.pd.orderList;
    }
});*/
$.ajax({
    url: "https://www.kpmaolv.com/maolv/order/searchUserOrderInfo",
    type: "POST",
    dataType: "json",
    data:{
        "order_id":proId
    },
    success: function (data) {
        console.log(data);
        vm.gyms = data.pd.commodiy;
        vm.arr1 = data.pd.orderInfo;
    },
    error:function (data) {
        console.log(data)
    }
});
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}