/**
 * Created by dell on 2017/6/17.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="../userlogin/index1.html"
}
var user_id = user.date.user_id;
var name = sessionStorage.getItem("name");
console.log($.parseJSON(name));
var names = JSON.parse(name);
console.log(names);
var goods = JSON.parse(sessionStorage.getItem("goods"));
var vm = new Vue({
    el:"#address",
    data:{
        gyms:[],
        goods_details:[],
        dele:[]
    },
    methods: {
        greet: function (item) {
            item.shoppingCart_quantity += 1;
        },
        min: function (item) {
            item.shoppingCart_quantity -= 1;
        }
    },
    computed: {
        sum: function () {
            var sum = 0;
            for (var i = 0; i < this.gyms.length; i++) {
                sum += this.gyms[i].shoppingCart_quantity * this.gyms[i]["commodity_imgprice"];
            }
            return sum.toFixed(2);
        }
    }
    });
vm.gyms = names;
console.log(vm.gyms);
$.ajax({
    url:"https://www.kpmaolv.com/maolv/delivery/searchDelivery",
    type:"post",
    dataType:"json",
    data:{
        userId:user_id
    },
    success:function (ResponseText) {
        vm.dele = ResponseText.data;
    }
});
$("#add-order").click(function () {
    var str = "";
    var shoppingCart_id = "";
    var num = "";
    var d_id = "";
    for (var i = 0;i<vm.gyms.length;i++){
        str+=vm.gyms[i].commodity_id+",";
        shoppingCart_id+=vm.gyms[i].shoppingCart_id+","
    }
    str = str.substring(0,str.length-1);
    shoppingCart_id = shoppingCart_id.substring(0,shoppingCart_id.length-1);
    if (shoppingCart_id == 'undefined'){
        shoppingCart_id = null;
    }
    var sum = $('input[name="sum"]');
    for (var i = 0;i<sum.length;i++){
        num += sum[i].value+",";
    }
    num = num.substring(0,num.length-1);
    d_id = $("#d_id").val();
    console.log(str);
    console.log(shoppingCart_id);
    console.log(num);
    console.log(d_id);
    console.log(user_id);
    $.ajax({
        type:"post",
        url:"https://www.kpmaolv.com/maolv/order/addOrder",
        dataType:"json",
        data:{
            userId:user_id,
            commodityId:str,
            status:1,
            number:num,
            delivery_id:d_id,
            shoppingCartId:shoppingCart_id
        },
        success:function(data) {
            var zhuangtai = data.result;
            console.log(data);
            if (zhuangtai == "0000"){
                sessionStorage.removeItem('name');
                window.location.reload()
            }
        },
        error:function (res) {
            alert("网络异常");
        }
    });
});
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
vm.$watch('dele',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
});