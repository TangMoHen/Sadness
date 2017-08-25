/**
 * Created by dell on 2017/6/17.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="../userlogin/index1.html"
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}
var coupons_c=(GetQueryString("coupons"));
var user_id = user.date.user_id;
var name = sessionStorage.getItem("name");
var names = JSON.parse(name);
var goods = JSON.parse(sessionStorage.getItem("goods"));
var sum2 =0;
var sum3 = false;
var vm = new Vue({
    el:"#payment-details",
    data:{
        gyms:[],
        goods_details:[],
        dele:[],
        coupons:[],
        coupons_1:[],
        coupons3:[],
        coupons2:'',
        sum_j:0
    },
    methods: {
        greet: function (item) {
            if (user_id === ""){
                alert("请您先登录");
                window.location.href="../userlogin/index1.html";
            };
            var limit = user.date.user_onlycount;
            if (item.activity_type == "xinrenzhuanxiang" && limit <= 0){
                alert('新人专享次数已用完')
            } else {
                $('#add-1').show();
                $.ajax({
                    url:"https://www.kpmaolv.com/maolv/shoppingCart/shopping",
                    type:"post",
                    data:{
                        user_id:user_id,
                        commodity_id:item.commodity_id,
                        shoppingCart_quantity:1
                    },
                    dataType: "json",
                    success:function(data) {
                        if (data.result=="1234"){
                            $.toast(data.reMessage);
                            $('#add-1').hide();
                        }else {
                            $('#add-1').hide();
                            item.shoppingCart_quantity += 1;
                            sessionStorage.setItem('name',JSON.stringify(vm.gyms));
                        }
                    },
                    error:function (res) {
                        if(res.readyState == 0){
                        }
                        $('#add-1').hide();
                        $.toast("网络异常!");
                    }
                })
            }
        },
        min: function (item) {
            if (user_id === ""){
                alert("请您先登录");
                window.location.href="../userlogin/index1.html";
            };
            var limit = user.date.user_onlycount;
            $('#add-1').show();
            $.ajax({
                url:"https://www.kpmaolv.com/maolv/shoppingCart/shopping",
                type:"post",
                data:{
                    user_id:user_id,
                    commodity_id:item.commodity_id,
                    shoppingCart_quantity:-1
                },
                dataType: "json",
                success:function(data) {
                    if (data.result=="1234"){
                        $.toast(data.reMessage);
                        $('#add-1').hide();
                    }else {
                        $('#add-1').hide();
                        item.shoppingCart_quantity -= 1;
                        sessionStorage.setItem('name',JSON.stringify(vm.gyms));
                    }
                },
                error:function (res) {
                    if(res.readyState == 0){
                    }
                    $('#add-1').hide();
                    $.toast("网络异常!");
                }
            })
        }
    },
    filters: {
        fixed: function (input) {
            return input.toFixed(2)
        }
    },
    computed: {
        sum: function () {
            var sum = 0;
            for (var i = 0; i < this.gyms.length; i++) {
                if (this.gyms[i].activity_price !== undefined){
                    sum += this.gyms[i].shoppingCart_quantity * this.gyms[i]["activity_price"];
                }else {
                    sum += this.gyms[i].shoppingCart_quantity * this.gyms[i]["commodity_imgprice"];
                }
            }
            sum2 = parseFloat(sum.toFixed(2));
            if (sum3){
                coupons_sum()
                ssss();
            }
            return sum.toFixed(2)
        }
    }
    });
vm.gyms = names;
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
function ssss() {
    for (var i=0;i<vm.coupons.length;i++){
        if (coupons_c !== null){
            if (vm.coupons[i].coupons_id == coupons_c){
                vm.coupons3 = vm.coupons[i];
                if (sum2 < vm.coupons3.coupons_conditions){
                    vm.coupons3 = vm.coupons[0];
                    if (vm.coupons3.coupons_id !== coupons_c && sum2 > vm.coupons3.coupons_conditions){
                        vm.coupons2='';
                        vm.sum_j = 0;
                    }else{
                        vm.coupons2='';
                        vm.sum_j = 0;
                    }
                }else {
                    vm.coupons2 = vm.coupons[i].coupons_name;
                    vm.sum_j = vm.coupons[i].coupons_reduce
                }
            }
        }else{
            vm.coupons3 = vm.coupons[0];
            if (vm.coupons3.coupons_conditions<sum2){
                vm.coupons2='';
                vm.sum_j = 0;
            }
        }
    }
}
$.ajax({
    url:"https://www.kpmaolv.com/maolv/couponsReceive/search",
    type:"post",
    dataType:"json",
    data:{
        user_id:user_id,
        coupons_receive_status:1
    },
    success:function (ResponseText) {
        vm.coupons_1 = ResponseText;
        if (ResponseText.result == 0){
            vm.coupons = ResponseText.data.sort(
                function(a, b)
                {
                    return (a.coupons_conditions - b.coupons_conditions);
                }
            );
            vm.coupons = ResponseText.data;
            sum3 = true;
            coupons_sum();
            ssss();
        }
    }
});
function coupons1() {
    if (vm.coupons.length>0 && parseFloat(sum2)>vm.coupons[0].coupons_conditions){
        sessionStorage.setItem('coupons',sum2);
        window.location.href='../weishiyong.html'
    }else{
    }
}
function coupons_sum() {
    if (vm.coupons.length>0){
        if (vm.coupons[0].coupons_conditions > sum2){
            var cha = vm.coupons[0].coupons_conditions.toFixed(2) - sum2;
            $('.coupons-cha').show();
            $('#cha').html(cha.toFixed(2));
        }else {
            $('.coupons-cha').hide();
        }
    }
}
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
    var orderRemake = $('#orderRemake').val();
    if(vm.dele.length > 0){
        var j = 0;
        for (var i = 0;i < vm.gyms.length; i++){
            if (vm.gyms[i].activity_type == "xinrenzhuanxiang"){
                j++;
            }
        }
        var coupons_id =null;
        if (vm.coupons2 !== ''){
            coupons_id = coupons_c;
        }
        console.log(coupons_id);
        /*if(user.date.user_onlycount <= 0){
            alert("新人专享次数已用完");
        }
        else if (user.date.user_onlycount < j){
            alert("您购买的新人品种超出")
        }*/
        $.ajax({
        type: "post",
        url: "https://www.kpmaolv.com/maolv/wx/wxpay",
        dataType: "json",
        data: {
            userId: user_id,
            commodityId: str,
            status: 1,
            number: num,
            delivery_id: d_id,
            shoppingCartId: shoppingCart_id,
            coupons_id:coupons_id
        },
        success: function (data) {
                if (data.result=="4446"){
                    alert(data.reMessage)
                }
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
                    window.location.href="../order/my-order.html"
                } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                } else {
                }
            });
        },
        error: function (res) {
            alert("网络异常");
        }
    });
    }else {
        alert('请添加收获地址');
    }
});
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
$("#tianjia").click(function () {
    sessionStorage.setItem('url1',document.URL);
    window.location.href="../userlogin/shouhuodizhi.html"
});
vm.$watch('dele',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
});