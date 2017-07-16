/**
 * Created by dell on 2017/6/17.
 */
function sousuo() {
    var content=document.getElementById('my-content');
    content.style.display='none';
    var footer=document.getElementById('footer');
    footer.style.display='none';
    var sousuo = document.getElementById('sousuo');
    sousuo.style.display='none';
    var sousuo1 = document.getElementById('sousuo1');
    sousuo1.style.display='block'
}
function index() {
    var content=document.getElementById('my-content');
    content.style.display='block';
    var footer=document.getElementById('footer');
    footer.style.display='block';
    var sousuo = document.getElementById('sousuo');
    sousuo.style.display='block';
    var sousuo1 = document.getElementById('sousuo1');
    sousuo1.style.display='none'
}
var vm = new Vue({
    el:"#app",
    data:{
        gyms:[],
        img:[],
        search:[],
        classes:[],
        tuijian:[],
        tuijian1:[]
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/loadIndex/show",
    type:"POST",
    dataType:"json",
    success: function (data) {
        console.log(data);
        vm.img = data.data.bannerList;
//      vm.href=data.data.;
        vm.classes = data.data.categoryList;
        vm.tuijian =data.data.commodityList.tuijian;
        vm.tuijian1 = vm.tuijian.length;
    }
});
vm.$watch('img',function(val){
    var mySwiper = new Swiper(".swiper-container",{
        direction:"horizontal",/*横向滑动*/
        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
        autoplay:2000,/*每隔3秒自动播放*/
        autoplayDisableOnInteraction : false  //默认是true
    });
    var loading = document.getElementById('loading');
    loading.style.display='none';
});
