/**
 * Created by null on 2017/8/16.
 */
$.ajax({
    url:"https://www.kpmaolv.com/maolv/shoppingCart/shopping",
    type:"post",
    data:{
        user_id:'',
        commodity_id:'',
        shoppingCart_quantity:1
    },
    dataType: "json",
    success:function(data) {
        if (data.result=="1234"){
            $.toast(data.reMessage);
        }
    },
    error:function (res) {
    }
});