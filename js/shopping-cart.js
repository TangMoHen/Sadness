/**
 * Created by dell on 2017/6/17.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
var cart = "";
var str = "";
if (user == null){
    window.location.href="../userlogin/index1.html"
}else {
    var user_id = user.date.user_id;
}
var vm = new Vue({
    el:"#shopping-cart",
    data:{
        goods:[],
        goods_details:[],
        allCheckedStatus: false
    },
    methods:{
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
                    }
                },
                error:function (res) {
                    if(res.readyState == 0){
                    }
                    $('#add-1').hide();
                    $.toast("网络异常!");
                }
            })
        },
        allChecked: function () {
            for(var i = 0; i <  this.goods.length; i++){
                this.goods[i].isChecked = this.allCheckedStatus;
            }
        }
    },
    watch:{
        isAllChecked: function (newVal) {
            var str = newVal.join();
            if(str.indexOf('false') !== -1){
                this.allCheckedStatus = false;
            }else{
                this.allCheckedStatus = true;
            }
        }
    },
    computed:{
        sum:function () {
            var sum = 0;
            for (var i = 0; i < this.goods.length; i++){
                // for(var j = 0; j < this.good.length; j++){
                    if(this.goods[i].isChecked === true){
                        if (this.goods[i].activity_price !== undefined){
                            sum+= this.goods[i].shoppingCart_quantity * this.goods[i]["activity_price"];
                        }else {
                            sum+= this.goods[i].shoppingCart_quantity * this.goods[i]["commodity_imgprice"];
                        }
                    }
                }
            // }
            sessionStorage.setItem('sum',sum.toFixed(2));
            return  sum.toFixed(2);
        },
        isAllChecked: function () {
            var arr = [];
            for(var i = 0; i <  this.goods.length; i++){
                arr.push(this.goods[i].isChecked);
            }
            return arr;
        }
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/shoppingCart/queryShoppingCart?user_id="+user_id,
    type:"POST",
    dataType:"json",
    success: function (data) {
        var ndata = data.data;
        for(var i = 0; i < ndata.length; i++){
            ndata[i].isChecked = true;
        }
        vm.goods = ndata;
        if(data.data.length !== 0){
            cart = data.data[0].shoppingCars;
        }
    }
});
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return (Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed(2);
}
function deleteSelected() {
    sessionStorage.removeItem('selected');
    sessionStorage.removeItem('class-top');
    sessionStorage.removeItem('arr');
    sessionStorage.removeItem('date');
}
function deleteSelected1() {
    sessionStorage.removeItem('hotel-selected');
    sessionStorage.removeItem('hotel-top');
    sessionStorage.removeItem('hotel-date');
    sessionStorage.removeItem('hotel-arr');
    sessionStorage.removeItem('arrNull');
}
var shoppingCart_id ="";
// $("#jisuan").click(function(){
function jisuan() {
    var str1 = [];
    $("[name=quanxian]:checkbox:checked").each(function(){
        for (var i=0;i<vm.goods.length;i++){
            if (vm.goods[i].shoppingCart_id == $(this).val()){
                str1.push(vm.goods[i]);
            }
        }
    });
    sessionStorage.setItem("name",JSON.stringify(str1));
    if (str1.length == 0){
        alert('请选择商品')
    }else {
        window.location.href="../shopping-cart/payment-details.html"
    }
};

function shanchu(val) {

}
function delete1(val) {
    $.confirm("确定要删除商品吗?", "确认删除?", function() {
        var str=val;
        shoppingCart_id = str;
        $.ajax({
            type:"POST",
            url:"https://www.kpmaolv.com/maolv/shoppingCart/deleteShopping",
            data:{
                shoppingCart_id:shoppingCart_id
            },
            dataType: "json",
            success:function(data) {
                var zhuangtai = data.result;
                if (zhuangtai == "0000"){
                    $.toast("商品已删除!");
                    for (var o = 0; o<vm.goods.length; o++){
                        if (vm.goods[o].shoppingCart_id == str){
                            vm.goods.splice(o,1);
                        }
                    }
                }else {
                    $.toast("商品删除失败!");
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
vm.$watch('goods',function(val) {
    var loading = document.getElementById('loading')
    loading.style.display='none';
});
$(".text_box").click(function(){
});
/*
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};*/
