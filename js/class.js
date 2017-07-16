/**
 * Created by dell on 2017/6/17.
 */
$('#myTabContent .text-center').hide();
$('#myTabContent .null').hide();
var h = ($(window).height());
console.log(h);
var user = sessionStorage.getItem("user");
var arr = [];
var vm = new Vue({
    el:"#tab",
    data:{
        gyms:[],
        gyms1:[],
        date:[]
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
    proId = "0654fb24-a143-47bf-911b-d2956888cbed";
}else {
    proId = proId;
}
var class1 = '#'+proId;
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;]&currentPage=0",
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.gyms = data;
        console.log(data);
        for (var i = 0; i < vm.gyms.categorylist.length; i++){
            arr.push({i:1,"is":true,"class":vm.gyms.categorylist[i].commodity_category_id});
            ajax1(vm.gyms.categorylist[i].commodity_category_id)
        }
        console.log(vm.date)
    }
});
function ajax1(val1) {
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val1+";]&currentPage=1",
        type:"POST",
        dataType:"json",
        success: function (data) {
            vm.gyms1 = data;
            console.log(data);
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++){
                    vm.date.push(vm.gyms1.commoditylist[j]);
                }
            } else {
                console.log(val1);
                $('#'+val1+' .null').show();
            }
            if (vm.gyms1.isLast == 0 && vm.gyms1.commoditylist !== undefined){
                $('#'+val1+' .my-text').show();
                for (var s = 0; s<arr.length;s++){
                    if (val1 == arr[s].class){
                        arr[s].is = false;
                    }
                }
            }
        }
    });
}
function ajax2(val,arr1) {
    console.log(arr1);
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/commodity/ByCategory?keyWord=[;commodity_status;:;1;,;commodity_category_id;:;"+val+";]&currentPage="+arr1,
        type:"POST",
        dataType:"json",
        // beforeSend: LoadFunction(), //加载执行方法
        success: function (data) {
            vm.gyms1 = data;
            console.log(data);
            if (vm.gyms1.commoditylist !== undefined){
                for (var j = 0; j < vm.gyms1.commoditylist.length; j++) {
                    vm.date.push(vm.gyms1.commoditylist[j]);
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
                zhen = false;
            }
        }
    });
}
function ajax(val) {
    var zhen = "";
    for (var i = 0; i< vm.gyms.categorylist.length; i++){
        if (val == vm.gyms.categorylist[i].commodity_category_id){
            arr[i].i = arr[i].i+1;
            zhen = arr[i].is;
            ajax2(val,arr[i].i)
        }
    }
}

vm.$watch('gyms',function(val){
    $('#myTab a[href='+class1+']').tab('show');
    $('#myTabContent')[0].style.height = (h - 54)+"px";
    var loading = document.getElementById('loading');
    loading.style.display='none';
    console.log(vm.gyms);
    for (var i = 0; i < vm.gyms.categorylist.length; i++){
        $("#"+ vm.gyms.categorylist[i].commodity_category_id +"").scroll(function(){
            var $this =$(this),
                viewH =$(this).height(),//可见高度
                contentH =$(this).get(0).scrollHeight,//内容高度
                scrollTop =$(this).scrollTop();//滚动高度
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
