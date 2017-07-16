/**
 * Created by dell on 2017/6/28.
 */
var name1 =  sessionStorage.getItem("sou");
$('#inp').val(name1);
$('#inp1').text(" '"+name1+"' ");
if (name !== ""){
    $('#search').show();
}else {
    $('#search').hide();
}

var vm = new Vue({
    el:"#search",
    data:{
        search:[],
        name:[]
    }
});
name = sessionStorage.getItem("sou");
var url="https://www.kpmaolv.com/maolv/commodity/search?keyWord=[;commodity_name;:;"+name+";,;commodity_status;:;1;]";
$.ajax({
    url:url,
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.search = data.data.commodityList;
        vm.name=name;
    }
});
function search1() {
    var name=$('#inp').val();
    sessionStorage.setItem("sou",name);
    if (name == ""){
        alert('请输入关键词')
    }else {
        window.location.reload();
    }
    if (vm.search == undefined){
        $('#null').show()
    }
}
vm.$watch('search',function(val){
    var loading = document.getElementById('loading')
    loading.style.display='none';
});