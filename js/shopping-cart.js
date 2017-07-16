/**
 * Created by dell on 2017/6/17.
 */

function bianji() {
    $("#heji").hide();
    $('#bianji').hide()
    $('#wancheng').show();
    $('#jisuan').hide();
    $('#shanchu').show();
}
function wancheng(){
    $("#heji").show();
    $('#bianji').show()
    $('#wancheng').hide();
    $('#jisuan').show();
    $('#shanchu').hide();
}
var user = JSON.parse(sessionStorage.getItem("user"));
var cart = "";
var str = "";
if (user == null){
    window.location.href="../userlogin/index1.html"
}
var user_id = user.date.user_id;
console.log(user_id);
var vm = new Vue({
    el:"#tab",
    data:{
        goods:[],
        goods_details:[],
        allCheckedStatus: false
    },
    methods:{
        greet: function (item) {
            item.shoppingCart_quantity += 1;
        },
        min: function (item) {
            item.shoppingCart_quantity -= 1;
        },
        allChecked: function () {
            for(var i = 0; i <  this.goods.length; i++){
                this.goods[i].isChecked = !this.allCheckedStatus;
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
                        sum+= this.goods[i].shoppingCart_quantity * this.goods[i]["commodity_imgprice"];
                    }
                }
            // }
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
            console.log(data.data);
        var ndata = data.data;
        for(var i = 0; i < ndata.length; i++){
            ndata[i].isChecked = false;
        }
        vm.goods = ndata;
        console.log(vm.goods);
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
        window.location.href="http://localhost:63342/PC/shopping/payment-details.html"
    }
};

function shanchu() {
    var str="";
    $("[name=quanxian]:checkbox:checked").each(function(){
        str+=$(this).val()+",";
    });
    shoppingCart_id = str;
    shoppingCart_id=shoppingCart_id.substring(0,shoppingCart_id.length-1);
    console.log(str);
    if (str == ""){
        alert("请选择商品")
    }else{
        $.ajax({
            type:"POST",
            url:"http://www.kpmaolv.com/maolv/shoppingCart/deleteShopping",
            data:{
                shoppingCart_id:shoppingCart_id
            },
            dataType: "json",
            success:function(data) {
                var zhuangtai = data.result;
                if (zhuangtai == "0000"){
                    alert("删除成功");
                    window.location.reload()
                }else {
                    alert("删除失败")
                }
            },
            error:function (res) {
                alert("网络异常");
            }
        })
    }
};
/*
vm.$watch('goods',function(val) {
    var loading = document.getElementById('loading')
    loading.style.display='none';
});*/
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};