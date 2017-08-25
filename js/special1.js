/**
 * Created by dell on 2017/6/17.
 */
$('#myTabContent .text-center').hide();
$('#myTabContent .null').hide();
var h = ($(window).height());
var user = sessionStorage.getItem("user");
var classTop = sessionStorage.getItem("hotel-top");
var date1= sessionStorage.getItem("hotel-date");
var arr2 = sessionStorage.getItem("hotel-arr");
var arrNull = [];
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
        date1:[]
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
function setTotal(){
    var s=0;
    $("#tab li").each(function(){
        s+=parseInt($(this).find('input[class*=text_box]').val())*parseFloat($(this).find('span[class*=price]').text());
    });
    $("#total").html(s.toFixed(2));
}
$(document).on("click",".add",function () {
    var t=$(this).parent().find('input[class*=text_box]');
    t.val(parseInt(t.val())+1)
    setTotal();
});
$(document).on("click",".min",function () {
    var t=$(this).parent().find('input[class*=text_box]');
    t.val(parseInt(t.val())-1)
    if(parseInt(t.val())<0){
        t.val(0);
    }
    setTotal();
});
var proId = location.search;
proId = proId.substr(1).split("=")[1];
if (proId === undefined){
}else {
    proId = proId;
    var class1 = '#'+proId;
}
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
                    sessionStorage.setItem("hotel-date",JSON.stringify(vm.date))
                }
            } else {
                $('#'+val1+' .null').show();
                arrNull.push({id:val1})
                sessionStorage.setItem('arrNull',JSON.stringify(arrNull))
            }
            if (vm.gyms1.isLast == 0 && vm.gyms1.commoditylist !== undefined){
                $('#'+val1+' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val1 == arr[s].class){
                        arr[s].is = false;
                    }
                }
                sessionStorage.setItem("hotel-arr",JSON.stringify(arr))
            }
        }
    });
}
function ajax2(val,arr1) {
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val+";]&isfather=2&currentPage="+arr1,
        type:"POST",
        dataType:"json",
        // beforeSend: LoadFunction(), //加载执行方法
        success: function (data) {
            vm.gyms1 = data;
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++) {
                    vm.date.push(vm.gyms1.commoditylist[j]);
                    sessionStorage.setItem("hotel-date",JSON.stringify(vm.date))
                }
            }
            $('#'+val+ ' .text-center').hide();
            if (data.isLast == 0) {
                $('#'+val+ ' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val == arr[s].class){
                        arr[s].is = false;
                    }
                }
                sessionStorage.setItem("hotel-arr",JSON.stringify(arr))
                zhen = false;
            }
        }
    });
}
function selected1(index) {
    sessionStorage.setItem("hotel-selected",index);
}
function ajax(val) {
    var zhen = "";
    for (var i = 0; i< vm.gyms.categorylist.length; i++){
        if (val == vm.gyms.categorylist[i].commodity_category_id){
            arr[i].i = arr[i].i+1;
            zhen = arr[i].is;
            sessionStorage.setItem("hotel-arr",JSON.stringify(arr))
            ajax2(val,arr[i].i)
        }
    }
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
    var arrNull1 = sessionStorage.getItem('arrNull');
    var arrNull2 = JSON.parse(arrNull1);
    if (arrNull2 !==null){
        for (var n = 0;n<arrNull2.length;n++){
            console.log(arrNull2[n].id);
            $('#'+arrNull2[n].id+' .null').show();
        }
    }
    var selected = sessionStorage.getItem("hotel-selected");
    if (selected !== null){
        $('#myTab li:eq('+selected+') a').tab('show');
    }else{
        if (class1 === undefined){
            $('#myTab a:first').tab('show')
        }else {
            $('#myTab a[href='+class1+']').tab('show');
        }
    }
    $('#myTabContent')[0].style.height = (h-93)+"px";
    var loading = document.getElementById('loading');
    loading.style.display='none';
    if (classTop !== null){
        var classTop1 = JSON.parse(classTop);
        var classId = classTop1[0].id;
        $('#'+classId).scrollTop(classTop1[0].top);
    }
    for (var i = 0; i < vm.gyms.categorylist.length; i++){
        var id = vm.gyms.categorylist[i].commodity_category_id
        $("#"+ id +"").scroll(function(){
            var $this =$(this),
                viewH =$(this).height(),//可见高度
                contentH =$(this).get(0).scrollHeight,//内容高度
                scrollTop =$(this).scrollTop();//滚动高度
            var arrTop = [{id:"",top:""}];
            arrTop[0].id = $this[0].id;
            arrTop[0].top = scrollTop;
            sessionStorage.setItem("hotel-top",JSON.stringify(arrTop));
            // if(contentH - viewH - scrollTop <= 100) { //到达底部 100px时,加载新内容
            if(scrollTop/(contentH -viewH)>=0.99){ //到达底部100px时,加载新内容
                var this1 = $this[0].id;
                // 这里加载数据..
                for (var s = 0; s<arr.length;s++){
                    if (this1 == arr[s].class && arr[s].is == true){
                        $('#'+this1+ ' .text-center').show();
                        setTimeout(function () {
                            ajax(this1);
                        },1000)
                    }
                }
            }
        });
    }
});
