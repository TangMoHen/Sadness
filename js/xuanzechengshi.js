/**
 * Created by 周贺星 on 2017/7/1.
 */
var vm = new Vue({
    el:"#form1",
    data:{
        gyms:[]
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/store/searchByQu",
    type:"post",
    dataType:"json",
    success:function (data) {
        console.log(data);
        vm.gyms = data;
    }
});