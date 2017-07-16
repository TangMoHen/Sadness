/**
 * Created by 周贺星 on 2017/7/6.
 */
var user= JSON.parse(sessionStorage.getItem("user"));
if (user == null){
    window.location.href="index1.html"
}
console.log(user)
var data11 = sessionStorage.getItem("user");
var data111=JSON.parse(data11);
var vm = new Vue({
    el:"#form1",
    data:{
        gyms:[]
    }
});
vm.gyms = data111;