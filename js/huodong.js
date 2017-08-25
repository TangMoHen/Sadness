
var user = JSON.parse(sessionStorage.getItem("user"));
var user_id = "";
if(user !== null ){
    user_id = user.date.user_id;
}
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var GetQueryString1=GetQueryString("id");
var GetQueryString2=GetQueryString("class");
if(GetQueryString1=="huodong"){
    document.title="活动"
    $("#id").html("活动")
} else if(GetQueryString1 =="tuijian"){
    document.title="特价推荐"
    $("#id").html("特价推荐")
} else if(GetQueryString1 =="miaosha"){
    document.title="秒杀"
    $("#id").html("秒杀")
} else if(GetQueryString1 =="xinrenzhuanxiang"){
    document.title="新人专享"
    $("#id").html("新人专享")
}
var vm = new Vue({
    el:"#app",
    data:{
        gyms:[],
        gyms1:[]
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
    url:"https://www.kpmaolv.com/maolv/commodity/searchByActivityType",
    type:"POST",
    dataType:"json",
    data:{
        type:GetQueryString1
    },
    success: function (data) {
        if (GetQueryString2 !== null){
            for (var i = 0;i<data.data.length;i++){
                if (GetQueryString2 == data.data[i].commodity_category_id){
                    var item = data.data[i].activity_endtime;
                    var item1 = new Date(item);
                    var EndTime = new Date(item1.getFullYear(), item1.getMonth(), item1.getDate(), item1.getHours(), item1.getMinutes(), item1.getSeconds());//初始化结束日期2016年12月31日23点59分59秒
                    var NowTime = new Date();
                    var t = EndTime.getTime() - NowTime.getTime();
                    if (t>0){
                        vm.gyms1.push(data.data[i])
                    }
                }
            }
            if (vm.gyms1.length == 0){
                vm.gyms1 =[];
            }
        }else{
            for (var j = 0;j<data.data.length;j++){
                var item1 = data.data[j].activity_endtime;
                var item11 = new Date(item1);
                var EndTime1 = new Date(item11.getFullYear(), item11.getMonth(), item11.getDate(), item11.getHours(), item11.getMinutes(), item11.getSeconds());//初始化结束日期2016年12月31日23点59分59秒
                var NowTime1 = new Date();
                var t = EndTime1.getTime() - NowTime1.getTime();
                if (t>0){
                    vm.gyms1.push(data.data[j])
                }
            }
            if (vm.gyms1.length == 0){
                vm.gyms1 = data.data;
            }
        }
    }
});
function jia(type,val,img,event) {
    if (user_id === ""){
        alert("请您先登录");
        window.location.href="../userlogin/index1.html";
    };
    var limit = user.date.user_onlycount;
    if (type == "xinrenzhuanxiang" && limit <= 0){
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
vm.$watch('gyms1',function(val){
    var loading = document.getElementById('loading');
    loading.style.display='none';
    if(GetQueryString1=="miaosha"){
    function getDJS(){
            for (var i = 0; i<vm.gyms1.length;i++){
                var item = vm.gyms1[i].activity_endtime;
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
                }else{
                    document.getElementsByClassName("t_j")[i].innerHTML = '活动已结束';
                    document.getElementsByClassName("t_d")[i].innerHTML = '敬请期待';
                    document.getElementsByClassName("t_h")[i].innerHTML = '';
                    document.getElementsByClassName("t_m")[i].innerHTML = '';
                    document.getElementsByClassName("t_s")[i].innerHTML = '';
                }
            }
        }

    }
    setTimeout(getDJS,0);
    setInterval(getDJS,1000);
});
public();
