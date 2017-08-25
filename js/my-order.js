$('#jiazai1').hide();
$('#jiazai12').hide();
$('#jiazai13').hide();
$('#jiazai14').hide();
$('#jiazai15').hide();
$('#my-null').hide();
$('#my-null1').hide();
$('#my-null2').hide();
$('#my-null3').hide();
$('#my-null4').hide();
$('.jiazai1').hide();
var h = ($(window).height());
var user = sessionStorage.getItem("user");
if (user == null){
    window.location.href="../userlogin/index1.html";
}
var order_arr = sessionStorage.getItem('arr6');
var data111=JSON.parse(user);
data11111= data111.date.user_id;
var proId = location.search;
proId = proId.substr(1).split("=")[1];
var order_arr5 = sessionStorage.getItem('arr5');
if (order_arr5 !== null){
    var arr5 = JSON.parse(order_arr5);
    for (var i = 0;i<arr5.length;i++){
        if (arr5[i].is == false){
            if (i == 0){
                $('#jiazai1').show();
                $('#tab1 .weui-loadmore').hide();
            }else if (i == 1){
                $('#jiazai12').show();
                $('#tab2 .weui-loadmore').hide();
            }else if (i == 2){
                $('#jiazai13').show();
                $('#tab3 .weui-loadmore').hide();
            }else if (i == 3){
                $('#jiazai14').show();
                $('#tab4 .weui-loadmore').hide();
            }else if (i == 4){
                $('#jiazai15').show();
                $('#tab5 .weui-loadmore').hide();
            }
        }else if (arr5[i].is == null){
            if (i == 0){
                $('#my-null').show();
                $('#tab1 .weui-loadmore').hide();
            }else if (i == 1){
                $('#my-null1').show();
                $('#tab2 .weui-loadmore').hide();
            }else if (i == 2){
                $('#my-null2').show();
                $('#tab3 .weui-loadmore').hide();
            }else if (i == 3){
                $('#my-null3').show();
                $('#tab4 .weui-loadmore').hide();
            }else if (i == 4){
                $('#my-null4').show();
                $('#tab5 .weui-loadmore').hide();
            }
        }
    }
}else {
    var arr5 = [{i:1,"is":true,"class":"tab1"},{i:1,"is":true,"class":"tab2"},{i:1,"is":true,"class":"tab3"},{i:1,"is":true,"class":"tab4"},{i:1,"is":true,"class":"tab5"}];
}
var vm = new Vue({
    el:"#my-order",
    data:{
        gyms:[],
        arr:[],
        arr1:[],
        arr2:[],
        arr3:[],
        arr4:[],
        tuijian:[]
    },
    filters:{
        num:function (val) {
            val = val.toString();
            if (val.length>5){
                var i = val.length - 4;
                var num1 = val.substring(0,i)
                num1 = num1 + "万";
                return num1
            }else {
                return val
            }
        }
    }
});

function getStatus(index){
    var arr = ['000000','待付款','已付款','待发货','待收货','待评价','已评价','退款申请中','退款成功','退款失败'];
    return arr[index]
}
function ssss() {
    var i = arr5[0].i;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";]&currentPage="+i+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            loading1 = false;
            arr5[0].i++;
            $('#loading1').hide();
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (arr5[0].is == true){
                    $.each(vm.gyms,function (k,g) {
                        vm.arr.push(g);
                    });
                    arr6[0].arr = vm.arr;
                    sessionStorage.setItem('arr6',JSON.stringify(arr6));
                }
                if (data.isLast == 1) {
                }else {
                    $('#jiazai1').show();
                    arr5[0].is=false;
                    $('#tab1 .weui-loadmore').hide();
                }
            }else {
                $('#jiazai1').hide();
                $('#my-null').show();
                arr5[0].is=null;
                $('#tab1 .weui-loadmore').hide();
                var loading = document.getElementById('loading');
                loading.style.display='none';
            }
            sessionStorage.setItem('arr5',JSON.stringify(arr5));
        },
        error:function (res){
            $('#loading1').hide();
            loading1 = false;
        }
    });
}
function daifu() {
    var o = arr5[1].i;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;1;]&currentPage="+o+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            arr5[1].i++;
            loading2 = false;
            $('#loading2').hide();
            if (data.reMessage !== '暂无数据'){
                vm.gyms=data.pd.orderList;
                if (arr5[1].is == true) {
                    $.each(vm.gyms, function (k, g) {
                        vm.arr1.push(g);
                    });
                    arr6[1].arr1 = vm.arr1;
                    sessionStorage.setItem('arr6',JSON.stringify(arr6));
                }
                if (data.isLast == 1){
                }else {
                    $('#jiazai12').show();
                    arr5[1].is=false;
                    $('#tab2 .weui-loadmore').hide();
                }
            }else {
                $('#jiazai12').hide();
                $('#my-null1').show();
                arr5[1].is = null;
                $('#tab2 .weui-loadmore').hide();
            }
            sessionStorage.setItem('arr5',JSON.stringify(arr5));
        },
        error:function (res) {
            loading2 = false;
        }
    });
}
function daifa() {
    var j = arr5[2].i;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;3;]&currentPage="+j+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            loading3 = false;
            arr5[2].i++;
            $('#loading3').hide();
            if (data.reMessage !== '暂无数据'){
                vm.gyms=data.pd.orderList;
                if (arr5[2].is == true) {
                    $.each(vm.gyms,function (k,g) {
                        vm.arr2.push(g);
                    });
                    arr6[2].arr2 = vm.arr2;
                    sessionStorage.setItem('arr6',JSON.stringify(arr6));
                }
                if (data.isLast == 1) {
                }else {
                    $('#jiazai13').show();
                    arr5[2].is=false;
                    $('#tab3 .weui-loadmore').hide();
                }
            }else {
                $('#jiazai13').hide();
                $('#my-null2').show();
                arr5[2].is=null;
                $('#tab3 .weui-loadmore').hide();
            }
            sessionStorage.setItem('arr5',JSON.stringify(arr5));
        },
        error:function (res) {
            loading3 = false;
        }
    });
}
function daishou() {
    var u = arr5[3].i;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;4;]&currentPage="+u+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            loading4 = false;
            arr5[3].i++;
            $('#loading4').hide();
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (arr5[3].is == true) {
                    $.each(vm.gyms, function (k, g) {
                        vm.arr3.push(g);
                    });
                    arr6[3].arr3 = vm.arr3;
                    sessionStorage.setItem('arr6',JSON.stringify(arr6));
                }
                if (data.isLast == 1) {
                }else {
                    $('#jiazai14').show();
                    arr5[3].is=false;
                    $('#tab4 .weui-loadmore').hide();
                }
            }else {
                $('#jiazai14').hide();
                $('#my-null3').show();
                arr5[3].is=null;
                $('#tab4 .weui-loadmore').hide();
            }
            sessionStorage.setItem('arr5',JSON.stringify(arr5));
        },
        error:function (res) {
            loading4 = false;
        }
    });
}
function daiping() {
    var l = arr5[4].i;
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;5;]&currentPage="+l+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            loading5 = false;
            arr5[4].i++;
            $('#loading5').hide();
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (arr5[4].is == true) {
                    $.each(vm.gyms, function (k, g) {
                        vm.arr4.push(g);
                    });
                    arr6[4].arr4 = vm.arr4;
                    sessionStorage.setItem('arr6',JSON.stringify(arr6));
                }
                if (data.isLast == 1){
                }else {
                    $('#jiazai15').show();
                    arr5[4].is=false;
                    $('#tab5 .weui-loadmore').hide();
                }
            }else {
                $('#jiazai15').hide();
                $('#my-null4').show();
                arr5[4].is=null;
                $('#tab5 .weui-loadmore').hide();
            }
            sessionStorage.setItem('arr5',JSON.stringify(arr5));
        },
        error:function (res) {
            loading5 = false;
        }
    });
}
function delete1(val) {
    $.confirm("确定要确认收货吗?", "确认收货?", function() {
        confirm(val);
    }, function() {
        //取消操作
    });
}
function deleteSelected() {
    sessionStorage.removeItem('selected');
    sessionStorage.removeItem('class-top');
    sessionStorage.removeItem('arr');
    sessionStorage.removeItem('date');
}
function dddd(val,id) {
    $.each(val,function (k,d) {
        if (d !== undefined){
            if (d[id] !== undefined) {
                val.splice(k, 1);
                dddd(val);
                if (vm.arr1.length<=0){
                    arr5[1].i =1;
                    daifu();
                }
                if (vm.arr.length<=0){
                    arr5[0].i =1;
                    ssss();
                }
            }
        }
    });
}
function dddd1(val) {
    $.each(val,function (k,d) {
        /*console.log(d);
        if (d !== undefined){
            console.log(d[order_id]);
            if (d[order_id] !== undefined) {
                console.log(k);
                val.splice(k, 1);
                dddd(val);
            }
        }*/
        $.each(d,function (k1,d1) {
            $.each(d1.List,function (k2,d2) {
                $.each(d2,function (k3,d3) {
                    d3.order_status = 5;
                })
            })
        })
    });
}
function delete2(val) {
    $("#add-1").show();
    $.ajax({
        type:"post",
        url:"https://www.kpmaolv.com/maolv/order/cancleOrder",
        data:{
            order_num:val
        },
        dataType: "json",
        success:function(data) {
            if (data.result === "0000"){
                $("#add-1").hide();
                $.toast("删除成功!");
                dddd(vm.arr1,val);
                dddd(vm.arr,val);
                dddd(arr6[0].arr,val);
                dddd(arr6[1].arr1,val);
                sessionStorage.setItem('arr6',JSON.stringify(arr6))
            }
            if (data.result === "1000"){
                $("#add-1").hide();
                $.toast("操作失败!");
            }
        },
        error:function (res) {
            $.toast("取消失败!");
        }
    })
}
function confirm(val) {
    $("#add-1").show();
    $.ajax({
        type:"post",
        url:"https://www.kpmaolv.com/maolv/order/confirmReceipt",
        data:{
            order_num:val,
            order_status:5
        },
        dataType: "json",
        success:function(data) {
            if (data.result === "0000"){
                $("#add-1").hide();
                $.toast("确认收货成功!");
                dddd1(vm.arr3);
                dddd1(vm.arr);
                sessionStorage.removeItem('arr6');
                sessionStorage.removeItem('arr5');
                sessionStorage.removeItem('order-top');
                sessionStorage.setItem('order_selected',4);
                window.location.reload();
            }else{
                $('#add-1').hide();
                $.toast("确认收货失败!");
            }
        },
        error:function (res) {
            $('#add-1').hide();
            $.toast("确认收货失败!");
        }
    })
}
function jia(val,img,event,id) {
    var limit = data111.date.user_onlycount;
    if (vm.tuijian.activity_type == "xinrenzhuanxiang" && limit <= 0){
        alert('新人专享次数已用完')
    } else {
        $('#add-1').show();
        $.ajax({
            url:"https://www.kpmaolv.com/maolv/shoppingCart/shopping",
            type:"post",
            data:{
                user_id:data11111,
                commodity_id:val,
                shoppingCart_quantity:1
            },
            dataType: "json",
            success:function(data) {
                if (data.result=="1234"){
                    $.toast(data.reMessage);
                    $('#add-1').hide();
                    $('#num').val(1);
                }else {
                    // $.toast("添加成功!");
                    $('#add-1').hide();
                    var offset = $('#'+id+' .sum1').offset();
                    var flyer = $('<img class="u-flyer" src="'+img+'">');
                    flyer.fly({
                        start: {
                            left: event.pageX-50, //开始位置（必填）#fly元素会被设置成position: fixed
                            top: event.pageY-50 //开始位置（必填）
                        },
                        end: {
                            left: offset.left, //结束位置（必填）
                            top: offset.top, //结束位置（必填）
                            width: 30, //结束时宽度
                            height: 30 //结束时高度
                        },
                        onEnd: function(){ //结束回调
                            flyer.remove(flyer.selectedIndex); //移除dom
                            public();
                        }
                    });
                }
            },
            error:function (res) {
                if(res.readyState == 0){
                }
                $('#add-1').hide();
                $.toast("添加失败!");
            }
        })
    }
}
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
if (order_arr !== null){
    var arr6 = JSON.parse(order_arr);
    vm.arr = arr6[0].arr;
    vm.arr1 = arr6[1].arr1;
    vm.arr2 = arr6[2].arr2;
    vm.arr3 = arr6[3].arr3;
    vm.arr4 = arr6[4].arr4;
    jiazai();
}else{
    var arr6 = [{'arr':''},{'arr1':''},{'arr2':''},{'arr3':''},{'arr4':''}];
    ssss();
    daifu();
    daifa();
    daishou();
    daiping();
}
function selected1(index) {
    sessionStorage.setItem("order_selected",index);
}
function jump(val) {
    window.location.href="order-details.html?details="+val;
}
function jump1(val) {
    window.location.href="order-details.html?details="+val;
}
var order_num = "";
function sum(val,k) {
    $.ajax({
        type: "post",
        url: "https://www.kpmaolv.com/maolv/wx/wxpay",
        dataType: "json",
        data: {
            order_num:k
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
                        sessionStorage.setItem('order_selected',2);
                        sessionStorage.removeItem('arr6');
                        sessionStorage.removeItem('arr5');
                        sessionStorage.removeItem('order-top');
                        window.location.reload();
                    } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    } else {
                    }
                });
        },
        error: function (res) {
            alert("网络异常");
        }
    });
}
var loading1 = false;
$('#tab1').infinite().on("infinite", function() {
    if (arr5[0].is) {
        if(loading1) return;
        loading1 = true;
        setTimeout(function() {
            ssss();
        }, 2000);
    }else {
        $('#tab1 .weui-loadmore').hide();
    }
});
var loading2 = false;
$('#tab2').infinite().on("infinite", function() {
    if (arr5[1].is) {
        if(loading2) return;
        loading2 = true;
        setTimeout(function() {
            daifu();
        }, 2000);
    }else {
        $('#tab2 .weui-loadmore').hide();
    }
});
var loading3 = false;
$('#tab3').infinite().on("infinite", function() {
    if (arr5[2].is) {
        if(loading3) return;
        loading3 = true;
        setTimeout(function() {
            daifa();
        }, 2000);
    }else {
        $('#tab3 .weui-loadmore').hide();
    }
});
var loading4 = false;
$('#tab4').infinite().on("infinite", function() {
    if (arr5[3].is) {
        if(loading4) return;
        loading4 = true;
        setTimeout(function() {
            daishou();
        }, 2000);
    }else {
        $('#tab4 .weui-loadmore').hide();
    }
});
var loading5 = false;
$('#tab5').infinite().on("infinite", function() {
    if (arr5[4].is) {
        if(loading5) return;
        loading5 = true;
        setTimeout(function() {
            daiping();
        }, 2000);
    }else {
        $('#tab5 .weui-loadmore').hide();
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/searchByActivityType",
    type:"POST",
    dataType:"json",
    data:{
        type:'tuijian'
    },
    success: function (data) {
        vm.tuijian = data.data;
    }
});
function jiazai() {
    $('.weui-tab__bd')[0].style.height = (h-40)+"px";
    var loading = document.getElementById('loading');
    loading.style.display='none';
    var selected = sessionStorage.getItem("order_selected");
    var order_top = sessionStorage.getItem("order-top");
    if (order_top !== null){
        setTimeout(function () {
            var order_top1 = JSON.parse(order_top);
            var orderId = order_top1[0].id;
            $('#'+orderId).scrollTop(order_top1[0].top);
        },10);
    }
    if (selected !== null){
        $('.weui-navbar__item').removeClass('weui-bar__item--on');
        $('.weui-navbar__item').eq(selected).addClass('weui-bar__item--on');
        $('.weui-tab__bd-item').removeClass('weui-tab__bd-item--active');
        $('.weui-tab__bd-item').eq(selected).addClass('weui-tab__bd-item--active');
    }
    $("#tab1").scroll(function() {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        var arrTop = [{id: "", top: ""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("order-top", JSON.stringify(arrTop));
    });
    $("#tab2").scroll(function() {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        var arrTop = [{id: "", top: ""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("order-top", JSON.stringify(arrTop));
    });
    $("#tab3").scroll(function() {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        var arrTop = [{id: "", top: ""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("order-top", JSON.stringify(arrTop));
    });
    $("#tab4").scroll(function() {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        var arrTop = [{id: "", top: ""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("order-top", JSON.stringify(arrTop));
    });
    $("#tab5").scroll(function() {
        var $this = $(this),
            viewH = $(this).height(),//可见高度
            contentH = $(this).get(0).scrollHeight,//内容高度
            scrollTop = $(this).scrollTop();//滚动高度
        var arrTop = [{id: "", top: ""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("order-top", JSON.stringify(arrTop));
    });
}
function delete_order(val) {
    $.confirm("确定要删除此订单吗?", "确认删除?", function() {
        delete2(val);
    }, function() {
        //取消操作
    });
}
vm.$watch('arr',function(val){
    jiazai();
});
public();
