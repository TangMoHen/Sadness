/**
 * Created by 周贺星 on 2017/8/5.
 */
var user= JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="./index1.html"
}
console.log(user);
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
var vm = new Vue({
    el:"#main",
    data:{
        gyms:[]
    }
});
vm.gyms = data111;
function order_selected(val) {
    sessionStorage.setItem('order_selected',val);
    window.location.href='../order/my-order.html'
}
// window.onload = function() {
//     var loading = document.getElementById('loading')
//     loading.style.display='none';
// };
// vm.$watch('gyms',function(val){
//     var loading = document.getElementById('loading');
//     loading.style.display='none';
// });