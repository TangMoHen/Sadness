/**
 * Created by null on 2017/8/1.
 */
var user = JSON.parse(sessionStorage.getItem("user"));
var user_id = "";
if(user !== null ){
    user_id = user.date.user_id;
}
$('.jiazai1').hide();
$('.null').hide();
var h = ($(window).height());
var user = sessionStorage.getItem("user");
var classTop = sessionStorage.getItem("special-top");
var date1= sessionStorage.getItem("special-date");
var arr2 = sessionStorage.getItem("special-arr");
if (arr2 !==null){
    var arr = JSON.parse(arr2);
}else
{
    var arr = [];
}
var vm = new Vue({
    el:"#special",
    data:{
        gyms:[],
        gyms1:[],
        date:[],
        date1:[],
        gyms2:[],
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
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;5e355b83-6903-11e7-ae62-525400aa263a;]&currentPage=0&isfather=2",
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.gyms = data;
        for (var i = 0; i < vm.gyms.categorylist.length; i++){
            if (arr2 !== null){
            }else {
                arr.push({i:1,"is":true,"class":vm.gyms.categorylist[i].commodity_category_id});
            }
            if (date1 !== null){
                vm.date = JSON.parse(date1);
            }else{
                ajax1(vm.gyms.categorylist[i].commodity_category_id)
            }
        }
    }
});
function ajax1(val1) {
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val1+";]&currentPage=1&pagesize=20&isfather=2",
        type:"POST",
        dataType:"json",
        success: function (data) {
            vm.gyms1 = data;
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++){
                    vm.date.push(vm.gyms1.commoditylist[j]);
                    sessionStorage.setItem("special-date",JSON.stringify(vm.date))
                }
            } else {
                $('#'+val1+' .null').show();
                $('#'+val1+' .sum1').hide();
                for (var s = 0; s<arr.length;s++){
                    if (val1 == arr[s].class){
                        arr[s].is = null;
                    }
                }
            }
            if (vm.gyms1.isLast == 0 && vm.gyms1.commoditylist !== undefined){
                $('#'+val1+' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val1 == arr[s].class){
                        arr[s].is = false;
                    }
                }
            }
            sessionStorage.setItem("special-arr",JSON.stringify(arr))
        }
    });
}
function ajax2(val,arr1) {
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val+";]&isfather=2&pagesize=20&currentPage="+arr1,
        type:"POST",
        dataType:"json",
        // beforeSend: LoadFunction(), //加载执行方法
        success: function (data) {
            vm.gyms1 = data;
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++) {
                    vm.date.push(vm.gyms1.commoditylist[j]);
                    sessionStorage.setItem("special-date",JSON.stringify(vm.date))
                }
            }
            $('#'+val+ ' .jiazai1').hide();
            if (data.isLast == 0) {
                $('#'+val+ ' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val == arr[s].class){
                        arr[s].is = false;
                    }
                }
                sessionStorage.setItem("special-arr",JSON.stringify(arr));
                zhen = false;
            }
        }
    });
}
function selected1(index) {
    sessionStorage.setItem("special-selected",index);
}
function ajax(val) {
    var zhen = "";
    for (var i = 0; i< vm.gyms.categorylist.length; i++){
        if (val == vm.gyms.categorylist[i].commodity_category_id){
            arr[i].i = arr[i].i+1;
            zhen = arr[i].is;
            sessionStorage.setItem("special-arr",JSON.stringify(arr))
            ajax2(val,arr[i].i)
        }
    }
}
function jia(val,img,event,url) {
    if (user_id === ""){
        alert("请您先登录");
        window.location.href="../userlogin/index1.html";
    };
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
                $('#add-1').hide();
                var offset = $("#"+url+' .sum1').offset();
                var flyer = $('<img class="u-flyer" src="'+img+'">');
                flyer.fly({
                    start: {
                        left: event.pageX-50, //开始位置（必填）#fly元素会被设置成position: fixed
                        top: event.pageY-50 //开始位置（必填）
                    },
                    end: {
                        left: offset.left+1, //结束位置（必填）
                        top: offset.top+1, //结束位置（必填）
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
vm.$watch('date',function(val){
    if (arr2 !==null){
        for (var a = 0; a<arr.length;a++){
            if (arr[a].is == false){
                var text = arr[a].class;
                $('#'+text+ ' .my-text').show();
            }
            if (arr[a].is == null){
                var text1 = arr[a].class;
                $('#'+text1+ ' .null').show();
                $('#'+text1+' .sum1').hide();
            }
        }
    }
    var selected = sessionStorage.getItem("special-selected");
    if (selected !== null){
            $('.weui-navbar__item').removeClass('weui-bar__item--on');
            $('.weui-navbar__item').eq(selected).addClass('weui-bar__item--on');
            $('.weui-tab__bd-item').removeClass('weui-tab__bd-item--active');
            $('.weui-tab__bd-item').eq(selected).addClass('weui-tab__bd-item--active');
    }else{
        $('.weui-tab__bd-item').eq(0).addClass('weui-tab__bd-item--active');
        $('.weui-navbar__item').eq(0).addClass('weui-bar__item--on');
    }
    $('.weui-tab__bd')[0].style.height = (h-40)+"px";
    // var loading = document.getElementById('loading');
    // loading.style.display='none';
    if (classTop !== null){
        var classTop1 = JSON.parse(classTop);
        var classId = classTop1[0].id;
        $('#'+classId).scrollTop(classTop1[0].top);
    }
    for (var i = 0; i < vm.gyms.categorylist.length; i++){
        var id = vm.gyms.categorylist[i].commodity_category_id;
        $("#"+ id +"").scroll(function(){
            var $this =$(this),
                viewH =$(this).height(),//可见高度
                contentH =$(this).get(0).scrollHeight,//内容高度
                scrollTop =$(this).scrollTop();//滚动高度
            var arrTop = [{id:"",top:""}];
            arrTop[0].id = $this[0].id;
            arrTop[0].top = scrollTop;
            sessionStorage.setItem("special-top",JSON.stringify(arrTop));
            // if(contentH - viewH - scrollTop <= 100) { //到达底部 100px时,加载新内容
            if(scrollTop/(contentH -viewH)>=0.99){ //到达底部100px时,加载新内容
                var this1 = $this[0].id;
                // 这里加载数据..
                for (var s = 0; s<arr.length;s++){
                    if (this1 == arr[s].class && arr[s].is == true){
                        $('#'+this1+ ' .jiazai1').show();
                        setTimeout(function () {
                            ajax(this1);
                        },1000)
                    }
                }
            }
        });
    }
});
public();

