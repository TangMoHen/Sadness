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
var user = sessionStorage.getItem("user");
if (user == null){
    window.location.href="http://localhost:63342/PC/login.html";
}
var data111=JSON.parse(user);
data11111= data111.date.user_id;
var proId = location.search;
proId = proId.substr(1).split("=")[1];
console.log(proId);
var vm = new Vue({
    el:"#myTabContent",
    data:{
        gyms:[],
        arr:[],
        arr1:[],
        arr2:[],
        arr3:[],
        arr4:[],
        arr5:[],
        arr6:[]
    }
});

function getStatus(index){
    var arr = ['000000','待付款','已付款','待发货','待收货','待评价','已评价','退款申请中','退款成功','退款失败'];
    return arr[index]
}
var i = 0;
var j = 0;
var o = 0;
var u = 0;
var l = 0;
function ssss() {
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";]&currentPage="+i+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (data.isLast == 1) {
                    $.each(vm.gyms, function (k, g) {
                        $.each(g, function (k1, g1) {
                            vm.arr.push(g1);
                            vm.arr6.push(g1);
                        })
                    });
                }else {
                    $('#jiazai').hide();
                    $('#jiazai1').show();
                }
            }else {
                $('#jiazai').hide();
                $('#jiazai1').hide();
                $('#my-null').show();
                var loading = document.getElementById('loading');
                loading.style.display='none';
            }
        },
        error:function (res) {
        }
    });
    i++;
}

function daifu() {
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;1;]&currentPage="+o+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.reMessage !== '暂无数据'){
                vm.gyms=data.pd.orderList;
                if (data.isLast == 1){
                    $.each(vm.gyms,function (k,g) {
                        $.each(g,function (k1,g1) {
                            vm.arr1.push(g1);
                            vm.arr5.push(g1);
                        })
                    });
                }else {
                    $('#jiazai2').hide();
                    $('#jiazai12').show();
                }
            }else {
                $('#jiazai2').hide();
                $('#jiazai12').hide();
                $('#my-null1').show();
            }
        },
        error:function (res) {
        }
    });
    o++;
}

function daifa() {
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;3;]&currentPage="+j+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.reMessage !== '暂无数据'){
                vm.gyms=data.pd.orderList;
                if (data.isLast == 1) {
                    $.each(vm.gyms, function (k, g) {
                        $.each(g, function (k1, g1) {
                            vm.arr2.push(g1);
                            vm.arr5.push(g1);
                        })
                    });
                }else {
                    $('#jiazai3').hide();
                    $('#jiazai13').show();
                }
            }else {
                $('#jiazai3').hide();
                $('#jiazai13').hide();
                $('#my-null2').show();
            }
        },
        error:function (res) {
        }
    });
    j++;
}

function daishou() {
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;4;]&currentPage="+u+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (data.isLast == 1) {
                    $.each(vm.gyms, function (k, g) {
                        $.each(g, function (k1, g1) {
                            vm.arr3.push(g1);
                            vm.arr5.push(g1);
                        })
                    });
                }else {
                    $('#jiazai4').hide();
                    $('#jiazai14').show();
                }
            }else {
                $('#jiazai4').hide();
                $('#jiazai14').hide();
                $('#my-null3').show();
            }
        },
        error:function (res) {
        }
    });
    u++;
}


function daiping() {
    $.ajax({
        url:"http://www.kpmaolv.com/maolv/order/searchUserOrder?keyWord=[;user_id;:;"+data11111+";,;order_status;:;5;]&currentPage="+l+"",
        type:"POST",
        dataType:"json",
        success: function (data) {
            console.log(data);
            if (data.reMessage !== '暂无数据') {
                vm.gyms=data.pd.orderList;
                if (data.isLast == 1){
                    $.each(vm.gyms,function (k,g) {
                        $.each(g,function (k1,g1) {
                            vm.arr4.push(g1);
                            vm.arr5.push(g1);
                        })
                    });
                }else {
                    $('#jiazai5').hide();
                    $('#jiazai15').show();
                }
            }else {
                $('#jiazai5').hide();
                $('#jiazai15').hide();
                $('#my-null4').show();
            }
        },
        error:function (res) {
        }
    });
    l++;
}
var order_id = "";
function delete1(val) {
    order_id = val;
}
function delete2() {
    $.ajax({
        type:"post",
        url:"http://www.kpmaolv.com/maolv/order/cancleOrder",
        data:{
            order_id:order_id
        },
        dataType: "json",
        success:function(data) {
            alert("删除成功");
            window.location.reload();
        },
        error:function (res) {
            alert("删除失败");
            $('#myModal').modal('hide');}

    })
}
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
proId = "#"+proId;
$(function () {
    $('#myTab a[href='+proId+']').tab('show');
});
$('#jiazai').click(function () {
   ssss();
});
$('#jiazai2').click(function () {
    daifu();
});
$('#jiazai3').click(function () {
    daifa();
});
$('#jiazai4').click(function () {
    daishou();
});
$('#jiazai5').click(function () {
    daiping();
});
ssss();
daifu();
daifa();
daishou();
daiping();
function jump(val) {
    sessionStorage.setItem("order",JSON.stringify(vm.arr5));
    window.location.href="order-details.html?details="+val;
}
function jump1(val) {
    sessionStorage.setItem("order",JSON.stringify(vm.arr6));
    window.location.href="order-details.html?details="+val;
}
// vm.$watch('arr',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
// });