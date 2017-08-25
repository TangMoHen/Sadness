/**
 * Created by null on 2017/8/9.
 */
$('.null').hide();
var user = JSON.parse(sessionStorage.getItem("user"));
$('.vegetables')[0].style.height = ($(window).height()) + "px";
if (user == null){
    window.location.href="../userlogin/index1.html"
}else {
    var user_id = user.date.user_id;
}
var vm = new Vue({
    el:"#footprint",
    data:{
        date:[]
    },
    filters: {
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
var footprint1 = localStorage.getItem('footprint');
if(footprint1 !== null){
    var footprint = JSON.parse(footprint1);
    for (var i = footprint.length-1; i>=0;i--){
        vm.date.push(footprint[i])
    }
    $('.qubu').show();
}else{
    $('.null').show();
}
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
public();