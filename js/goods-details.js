/**
 * Created by dell on 2017/6/17.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
var user_id = "";
if(user !== null ){
    user_id = user.date.user_id;
}
var proId = location.search;
proId = proId.substr(1).split("=")[1];
var shuliang = '';
$(function(){
    $(".add").click(function(){
        var t=$(this).parent().find('input[class*=text_box]');
        var t1=vm.goods.commodity_limitbuy;
        t.val(parseInt(t.val())+1);
        if (parseInt(t.val())>t1){
            t.val(t1);
            alert("此商品限购数量"+t1)
        }
        setTotal();
    });
    $(".min").click(function(){
        var t=$(this).parent().find('input[class*=text_box]');
        t.val(parseInt(t.val())-1)
        if(parseInt(t.val())<0){
            t.val(0);
        }
        setTotal();
    });
    function setTotal(){
        var s=0;
        $("#tab li").each(function(){
            s+=parseInt($(this).find('input[class*=text_box]').val())*parseFloat($(this).find('span[class*=price]').text());
        });
        $("#total").html(s.toFixed(2));
        shuliang = $('#num').val();
    }
    setTotal();
});

$(document).on("click","#ok",function () {
    console.log(user_id);
    console.log(proId);
    console.log(shuliang);
    if (user_id === ""){
        alert("请您先登录");
        window.location.href="../userlogin/index1.html";
    }
    $.ajax({
        type:"post",
        url:"http://www.kpmaolv.com/maolv/shoppingCart/shopping",
        data:{
            user_id:user_id,
            commodity_id:proId,
            shoppingCart_quantity:shuliang
        },
        dataType: "json",
        success:function(data) {
            $("#num").val(1);
            alert("添加成功");

        },
        error:function (res) {
            alert("添加失败");
        }
    })

});
var vm = new Vue({
    el:"#goods",
    data:{
        goods:{},
        user:{},
        comment:{},
        xing:'',
        img:{},
        shou:{},
        show:{}
    }
});
var cid = "";
var url ="https://www.kpmaolv.com/maolv/commodity/info?cid=0654fb24-a143-47bf-911b-d2956888cbed"+proId;
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/info?cid=" + proId,
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.goods = data.data.commodity;
        vm.user = data.data.user;
        vm.img = data.data.imgList;
        vm.comment = data.data.comment;
        if(data.data.comment !== undefined){
            vm.xing = data.data.comment.commodity_comment_score;
        }
        var x = vm.xing - 1;
        $('#star li').eq(x).nextAll().addClass('glyphicon-star-empty');
    }
});
$(document).on("click","#ok2",function () {
    var num2 = $('#num2').val();
    vm.goods.shoppingCart_quantity = parseInt(num2);
    var arr ="["+JSON.stringify(vm.goods)+"]";
    console.log(arr);
    sessionStorage.setItem("name",arr);
    window.location.href="http://localhost:63342/PC/shopping/payment-details.html"
});
function btn(){
    document.getElementById('div1').style.display='none';
    document.getElementById('div2').style.display='block';
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/favorites/deleteFavorites",
        type: "post",
        dataType: "json",
        data: {
            userId: user_id,
            commodityId: proId,
        },
        success: function (data) {
        }
    });
}
function btn1(){
    document.getElementById('div2').style.display='none';
    document.getElementById('div1').style.display='block';
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/favorites/addFavorites",
        type: "post",
        dataType: "json",
        data: {
            userId: user_id,
            commodityId: proId,
        },
        success: function (data) {
        }
    });
}
$.ajax({
    url:"https://www.kpmaolv.com/maolv/favorites/searchFavoritesByUser",
    type:"post",
    dataType:"json",
    data:{
        userId:user_id
    },
    success:function (data) {
        vm.shou = data.maps;
        for (var i=0;i<vm.shou.length;i++){
            if (vm.shou[i].commodity_id == proId){
                vm.show = vm.shou[i]
            }
        }
    }
});
vm.$watch('img',function(val){
    var loading = document.getElementById('loading')
    loading.style.display='none';
});