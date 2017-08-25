/**
 * Created by null on 2017/8/1.
 */
$('.jiazai1').hide();
$('.null').hide();
public();
var h = ($(window).height());
var user = JSON.parse(sessionStorage.getItem("user"));
var user_id = "";
if(user !== null ){
    user_id = user.date.user_id;
}
var classTop = sessionStorage.getItem("class-top");
var date1= sessionStorage.getItem("date");
var arr2 = sessionStorage.getItem("arr");
var Left = sessionStorage.getItem('class-left');
if (arr2 !==null){
    var arr = JSON.parse(arr2);
}else
{
    var arr = [];
}
var vm = new Vue({
    el:"#app",
    data:{
        gyms:[],
        gyms1:[],
        date:[],
        date1:[],
        gyms2:[],
        img:[],
        search:[],
        classes:[],
        tuijian:[],
        huodong:[],
        miaosha:[],
        xinrenzhuanxiang:[],
        huodongtu:[]
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
    url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;]&currentPage=0&isfather=1",
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
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val1+";]&currentPage=1&pagesize=10",
        type:"POST",
        dataType:"json",
        success: function (data) {
            vm.gyms1 = data;
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++){
                    vm.date.push(vm.gyms1.commoditylist[j]);
                    sessionStorage.setItem("date",JSON.stringify(vm.date))
                }
            } else {
                $('#'+val1+' .null').show();
            }
            if (vm.gyms1.isLast == 0 && vm.gyms1.commoditylist !== undefined){
                $('#'+val1+' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val1 == arr[s].class){
                        arr[s].is = false;
                    }
                }
                sessionStorage.setItem("arr",JSON.stringify(arr))
            }
        }
    });
}
function ajax2(val,arr1) {
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val+";]&currentPage="+arr1,
        type:"POST",
        dataType:"json",
        // beforeSend: LoadFunction(), //加载执行方法
        success: function (data) {
            vm.gyms1 = data;
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++) {
                    vm.date.push(vm.gyms1.commoditylist[j]);
                    sessionStorage.setItem("date",JSON.stringify(vm.date))
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
                sessionStorage.setItem("arr",JSON.stringify(arr))
                zhen = false;
            }
        }
    });
}
function selected1(index) {
    index++;
    sessionStorage.setItem("selected",index);
}
function selected2(index) {
    index++;
    sessionStorage.setItem("selected",index);
    setTimeout(function sss() {
        var mySwiper = new Swiper(".swiper-container",{
            direction:"horizontal",/*横向滑动*/
            loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
            autoplay:2000,/*每隔3秒自动播放*/
            autoplayDisableOnInteraction : false,  //默认是true
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
    },100)
}
function ajax(val) {
    var zhen = "";
    for (var i = 0; i< vm.gyms.categorylist.length; i++){
        if (val == vm.gyms.categorylist[i].commodity_category_id){
            arr[i].i = arr[i].i+1;
            zhen = arr[i].is;
            sessionStorage.setItem("arr",JSON.stringify(arr))
            ajax2(val,arr[i].i)
        }
    }
}
function remove1() {
    sessionStorage.removeItem('date');
    sessionStorage.removeItem('arr');
    sessionStorage.removeItem('class-left');
    sessionStorage.removeItem('class-top');
    sessionStorage.setItem('selected',56);
    // window.location.reload()
}
function removeSpecial() {
    sessionStorage.removeItem('special-arr');
    sessionStorage.removeItem('special-date');
    sessionStorage.removeItem('special-selected');
    sessionStorage.removeItem('special-top');
}
vm.$watch('date',function(val){
    if (arr2 !==null){
        for (var a = 0; a<arr.length;a++){
            if (arr[a].is == false){
                var text = arr[a].class;
                $('#'+text+ ' .my-text').show();
            }
        }
    }
    var selected = sessionStorage.getItem("selected");
    if (selected !== null){
        if (selected == 56){
            $('.weui-navbar__item').removeClass('weui-bar__item--on');
            $('.weui-navbar__item').eq(0).addClass('weui-bar__item--on');
            $('.weui-tab__bd-item').removeClass('weui-tab__bd-item--active');
            $('.weui-tab__bd-item').eq(0).addClass('weui-tab__bd-item--active');
        }else{
            $('.weui-navbar__item').removeClass('weui-bar__item--on');
            $('.weui-navbar__item').eq(selected).addClass('weui-bar__item--on');
            $('.weui-tab__bd-item').removeClass('weui-tab__bd-item--active');
            $('.weui-tab__bd-item').eq(selected).addClass('weui-tab__bd-item--active');
        }
    }
    var selected = sessionStorage.getItem("selected");
    $('.weui-tab__bd')[0].style.height = (h-40)+"px";
    if (classTop !== null){
        setTimeout(function () {
            var classTop1 = JSON.parse(classTop);
            var classId = classTop1[0].id;
            $('#'+classId).scrollTop(classTop1[0].top);
        },10);
    }
    if (Left !== null){
        setTimeout(function () {
            var classTop1 = JSON.parse(Left);
            $('.my-navbar').scrollLeft(classTop1[0].top);
        },10);
    }
    $("#tab1").scroll(function(){
        var $this =$(this),
            viewH =$(this).height(),//可见高度
            contentH =$(this).get(0).scrollHeight,//内容高度
            scrollTop =$(this).scrollTop();//滚动高度
        var arrTop = [{id:"",top:""}];
        arrTop[0].id = $this[0].id;
        arrTop[0].top = scrollTop;
        sessionStorage.setItem("class-top",JSON.stringify(arrTop));
    });
    $(".my-navbar").scroll(function(){
        var $this =$(this),
            scrollTop =$(this).scrollLeft();//滚动高度
        var arrLeft = [{id:"",top:""}];
        arrLeft[0].id = $this[0].id;
        arrLeft[0].top = scrollTop;
        sessionStorage.setItem("class-left",JSON.stringify(arrLeft));
    });
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
            sessionStorage.setItem("class-top",JSON.stringify(arrTop));
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
    setTimeout(function sss() {
        var mySwiper = new Swiper(".swiper-container",{
            direction:"horizontal",/*横向滑动*/
            loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
            autoplay:2000,/*每隔3秒自动播放*/
            autoplayDisableOnInteraction : false,  //默认是true
            pagination: '.swiper-pagination',
            paginationClickable: true
        });
        var loading = document.getElementById('loading');
        loading.style.display='none';
    },100);
    function getDJS(){
        for (var i = 0; i<vm.miaosha.length;i++){
            var item = vm.miaosha[i].activity_endtime;
            var item1 = new Date(item);
            var EndTime= new Date(item1.getFullYear(),item1.getMonth(),item1.getDate(),item1.getHours(),item1.getMinutes(),item1.getSeconds());//初始化结束日期2016年12月31日23点59分59秒
            var NowTime = new Date();
            var t =EndTime.getTime() - NowTime.getTime();
            if(t>0){
                var d=Math.floor(t/1000/60/60/24);
                var h=Math.floor(t/1000/60/60%24);
                var m=Math.floor(t/1000/60%60);
                var s=Math.floor(t/1000%60);
                document.getElementsByClassName("t_d")[i].innerHTML = d+'天';
                document.getElementsByClassName("t_h")[i].innerHTML = h+'时';
                document.getElementsByClassName("t_m")[i].innerHTML = m+'分';
                document.getElementsByClassName("t_s")[i].innerHTML = s+'秒';
                document.getElementsByClassName("t_j")[i].innerHTML = '距离活动结束还有';
                $('#'+vm.miaosha[i].commodity_category_id + ' .t_d').html(d+'天'+h+'时'+m+'分'+s+'秒');
            }else{
                document.getElementsByClassName("t_j")[i].innerHTML = '活动已结束';
                document.getElementsByClassName("t_d")[i].innerHTML = '敬请期待';
                document.getElementsByClassName("t_h")[i].innerHTML = '';
                document.getElementsByClassName("t_m")[i].innerHTML = '';
                document.getElementsByClassName("t_s")[i].innerHTML = '';
                $('#'+vm.miaosha[i].commodity_category_id + ' .t_d').html('活动已结束');
            }
        }
    }
    setTimeout(getDJS,0);
    setInterval(getDJS,1000);
    setTimeout(function () {
        for (var ii = 0;ii<vm.miaosha.length;ii++){
            $('#'+vm.miaosha[ii].commodity_category_id + ' .miao').hide();
            $('#'+vm.miaosha[ii].commodity_category_id + ' .miao').eq(0).show();
        }
        for (var t = 0;t<vm.tuijian.length;t++){
            $('#'+vm.tuijian[t].commodity_category_id + ' .tui').hide();
            $('#'+vm.tuijian[t].commodity_category_id + ' .tui').eq(0).show();
        }
    },100);
});
//首页
/**
 * Created by dell on 2017/6/17.
 */
$.ajax({
    url:"https://www.kpmaolv.com/maolv/loadIndex/show",
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.gyms2 = data;
        vm.img = data.data.bannerList;
        vm.classes = data.data.categoryList;
        if(data.data.huodongtu !== undefined){
            vm.huodongtu = data.data.huodongtu;
        }
        if (data.data.commodityList == undefined){

        }else {
            if (data.data.commodityList.tuijian !== undefined){
                vm.tuijian =data.data.commodityList.tuijian;
            }
            if (data.data.commodityList.miaosha !== undefined){
                vm.miaosha =data.data.commodityList.miaosha;
            }
            if (data.data.commodityList.huodong !== undefined){
                vm.huodong =data.data.commodityList.huodong;
            }
            if (data.data.commodityList.xinrenzhuanxiang !== undefined){
                vm.xinrenzhuanxiang =data.data.commodityList.xinrenzhuanxiang;
            }
        }
    }
});
function addCart(val,img,event,url) {
    if (user_id === ""){
        alert("请您先登录");
        window.location.href="./userlogin/index1.html";
    };
    var limit = user.date.user_onlycount;
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
                $('#add-1').hide();
                $.toast(data.reMessage);
            }else {
                $('#add-1').hide();
                if (url !== undefined){
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
                }else{
                    var offset = $("#end").offset();
                    var flyer = $('<img class="u-flyer" src="'+img+'">');
                    flyer.fly({
                        start: {
                            left: event.pageX-50, //开始位置（必填）#fly元素会被设置成position: fixed
                            top: event.pageY-50 //开始位置（必填）
                        },
                        end: {
                            left: offset.left+20, //结束位置（必填）
                            top: offset.top+20, //结束位置（必填）
                            width: 30, //结束时宽度
                            height: 30 //结束时高度
                        },
                        onEnd: function(){ //结束回调
                            flyer.remove(flyer.selectedIndex); //移除dom
                            public();
                        }
                    });
                }
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
/*vm.$watch('img',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
    function getDJS(){
        for (var i = 0; i<vm.miaosha.length;i++){
            var item = vm.miaosha[i].activity_endtime;
            var item1 = new Date(item);
            var EndTime= new Date(item1.getFullYear(),item1.getMonth(),item1.getDate(),item1.getHours(),item1.getMinutes(),item1.getSeconds());//初始化结束日期2016年12月31日23点59分59秒
            var NowTime = new Date();
            var t =EndTime.getTime() - NowTime.getTime();
            if(t>0){
                var d=Math.floor(t/1000/60/60/24);
                var h=Math.floor(t/1000/60/60%24);
                var m=Math.floor(t/1000/60%60);
                var s=Math.floor(t/1000%60);
                document.getElementsByClassName("t_d")[i].innerHTML = d;
                document.getElementsByClassName("t_h")[i].innerHTML = h;
                document.getElementsByClassName("t_m")[i].innerHTML = m;
                document.getElementsByClassName("t_s")[i].innerHTML = s;
            }
        }
    }
    setTimeout(getDJS,0);
    setInterval(getDJS,1000);
    var mySwiper = new Swiper(".swiper-container",{
        direction:"horizontal",/!*横向滑动*!/
        loop:true,/!*形成环路（即：可以从最后一张图跳转到第一张图*!/
        autoplay:2000,/!*每隔3秒自动播放*!/
        autoplayDisableOnInteraction : false,  //默认是true
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
});*/

