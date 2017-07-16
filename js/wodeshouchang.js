var data1 = {"user":"user_id"}
var data = JSON.stringify(data1);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
data11111= data111.date.user_id
console.log(data11111);
var vm = new Vue({
    el:"#pc",
    data:{
        gyms:[]
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/favorites/searchFavoritesByUser",
    type:"post",
    dataType:"json",
    data:{
        userId:data11111
    },
    success:function (data) {
        vm.gyms = data.maps;
        console.log(vm.gyms);
    }
});

function sss(val) {
    $.ajax({
        url: "https://www.kpmaolv.com/maolv/favorites/deleteFavorites",
        type: "post",
        dataType: "json",
        data: {
            userId: data11111,
            commodityId: val,
        },
        success: function (data) {
            window.location.reload();
            console.log(data);
        }
    });
}
vm.$watch('gyms',function(val){
    var loading = document.getElementById('loading')
    loading.style.display='none';
});