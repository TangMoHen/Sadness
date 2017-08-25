/**
 * Created by null on 2017/8/15.
 */
/**
 * Created by dell on 2017/6/17.
 */
function public() {
    var user = JSON.parse(sessionStorage.getItem("user"));
    if (user == null){
        $('.sum').html('&yen;'+0.00);
    }else {
        var user_id = user.date.user_id;
    }
    $.ajax({
        url:"https://www.kpmaolv.com/maolv/shoppingCart/queryShoppingCart?user_id="+user_id,
        type:"POST",
        dataType:"json",
        success: function (data) {
            var goods = data.data;
            var sum = 0;
            for (var i = 0; i < goods.length; i++){
                if (goods[i].activity_price !== undefined){
                    sum+= goods[i].shoppingCart_quantity * goods[i]["activity_price"];
                }else {
                    sum+= goods[i].shoppingCart_quantity * goods[i]["commodity_imgprice"];
                }
            }
            $('.sum').html('&yen;'+sum.toFixed(2));
        }
    });
}
