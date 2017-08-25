/**
 * Created by dell on 2017/6/17.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
$('.goods-details')[0].style.height = ($(window).height()-48) + "px";
var user_id = "";
var footprint1 = localStorage.getItem('footprint');
if(footprint1 !== null){
    var footprint = JSON.parse(footprint1);
}else{
    var footprint = [];
}
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
        if(parseInt(t.val())<1){
            t.val(1);
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
var jia1 = 0;
function jia(val,img,event) {
    console.log(event.pageX);
    console.log(event.pageY);
    jia1++;
    if (user_id === ""){
        alert("请您先登录");
        window.location.href="../userlogin/index1.html";
    };
    var limit = user.date.user_onlycount;
    if (vm.goods.activity_type == "xinrenzhuanxiang" && limit <= 0){
        alert('新人专享次数已用完')
    } else {
        $('#add-1').show();
        $.ajax({
            url:"https://www.kpmaolv.com/maolv/shoppingCart/shopping",
            type:"post",
            data:{
                user_id:user_id,
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
                    var offset = $("#end").offset();
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
var vm = new Vue({
    el:"#goods-details",
    data:{
        goods:{},
        user:{},
        comment:{},
        xing:'',
        img:{},
        shou:{},
        show:{},
        img1:0,
        gyms:{},
        gyms1:false
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
        },
        num:function (val) {
            val = String(val);
            if (val.length>5){
                var i = val.length - 4;
                var num1 = val.substring(0,i);
                num1 = num1 + "万";
                return num1
            }else {
                return val
            }
        }
    }
});
var cid = "";
var url ="https://www.kpmaolv.com/maolv/commodity/info?cid=0654fb24-a143-47bf-911b-d2956888cbed"+proId;
var footprintI = 0;
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/info?cid=" + proId,
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.goods = data.data.commodity;
        if (footprint !== null){
            for (var i = 0; i<footprint.length;i++){
                if (footprint[i].commodity_id == proId){
                    footprintI++;
                }
            }
            if (footprintI == 0){
                if (footprint.length>9){
                    footprint.splice(0,1)
                }
                footprint.push(vm.goods);
                localStorage.setItem('footprint',JSON.stringify(footprint))
            }
        }else{
            footprint.push(vm.goods);
            localStorage.setItem('footprint',JSON.stringify(footprint))
        }
        vm.user = data.data.user;
        vm.img = data.data.imgList;
        vm.comment = data.data.comment;
        for (var i = 0;i < vm.img.length;i++){
            if (vm.img[i].image_type === 4){
                vm.img1++;
            }
        }
        if(data.data.comment !== undefined){
            vm.xing = data.data.comment.commodity_comment_score;
        }
        var x = vm.xing - 1;
        $('#star li').eq(x).nextAll().addClass('glyphicon-star-empty');
    }
});
function btn(){
    $('#add-1').show();
    if (user_id == ""){
        alert("请您先登录")
        window.location.href="../userlogin/index1.html"
    }
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/favorites/deleteFavorites",
        type: "post",
        dataType: "json",
        data: {
            userId: user_id,
            commodityId: proId
        },
        success: function (data) {
            $('#add-1').hide();
            $.toast("取消收藏!");
            document.getElementById('div1').style.display='none';
            document.getElementById('div2').style.display='block';
        },
        error:function (data) {
            $('#add-1').hide();
            $.toast("请求失败!");
        }
    });
}
function btn1(){
    $('#add-1').show();
    if (user_id == ""){
        alert("请您先登录")
        window.location.href="../userlogin/index1.html"
    }
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/favorites/addFavorites",
        type: "post",
        dataType: "json",
        data: {
            userId: user_id,
            commodityId: proId,
        },
        success: function (data) {
            $('#add-1').hide();
            $.toast("收藏成功!");
            document.getElementById('div2').style.display='none';
            document.getElementById('div1').style.display='block';
        },
        error:function (data) {
            $('#add-1').hide();
            $.toast("请求失败!");
        }
    });
}
if(user !== null){
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
}
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/searchByActivityType",
    type:"POST",
    dataType:"json",
    data:{
        type:'tuijian'
    },
    success: function (data) {
        vm.gyms = data.data;
        for (var i = 0;i<vm.gyms.length;i++){
            if (vm.gyms[i].commodity_category_id == vm.goods.commodity_category_id){
                vm.gyms1 = true;
            }
        }
    }
});
var openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    var items = [
        {
            src: vm.goods.commodity_coverimg,
            w: 500,
            h: 500
        }
    ];
    var options = {
        history: false,
        focus: false,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
    };
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};
vm.$watch('img',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
    public();
    // document.getElementById('photos').onclick = openPhotoSwipe;
    /*var text = document.getElementById("num");
    text.onkeyup = function(){
        this.value=this.value.replace(/\D/g,'');
        if(text.value>100){
            text.value = 100;
        }
        if (text.value<=0){
            text.value = 1;
        }
    };*/
});