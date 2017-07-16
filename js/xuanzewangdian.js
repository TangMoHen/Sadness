var proId = location.search;
proId = proId.substr(1).split("=")[1]
var qu = ''
if (proId==1){
    qu = "新华区"
    console.log(qu)
}else if (proId == 2){
    qu = "长安区"
    console.log(qu)
}
else if (proId == 3){
    qu = "桥东区"
    console.log(qu)
}
else if (proId == 4){
    qu = "桥西区"
    console.log(qu)
}
else if (proId == 5){
    qu = "裕华区"
    console.log(qu)
}

console.log(proId);

var vm = new Vue({
    el:"#form1",
    data:{
        gyms:[]
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/store/searchByQu?qu="+qu,
    type:"get",
    dataType:"json",
    success:function (data) {
        console.log(data);
        vm.gyms = data;
    }
});
/**
 * Created by 周贺星 on 2017/7/1.
 */
vm.$watch('gyms',function(val){
    var loading = document.getElementById('loading')
    loading.style.display='none';
});