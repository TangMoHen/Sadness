/**
 * Created by dell on 2017/6/28.
 */
var user = sessionStorage.getItem("user");
if (user == null){
    // window.location.href="../userlogin/index1.html";
}
var data111=JSON.parse(user);
data11111= data111.date.user_id;

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}7
var commodityId = GetQueryString('commodityId');
var deliveryId = GetQueryString('deliveryId');
var orderId = GetQueryString('orderId');
var chapin = null;
var dianpu =null;
$("#submit").click(function () {
    chapin = $('input[name="score"]:checked ').val();
    dianpu = $('input[name="score1"]:checked ').val();
    var commodityCommentBody = $("#comment").val()
    var StoreCommentBody = $("#store").val();
    if (chapin == null){
        alert("请对商品进行评星")
    }
    else if (dianpu == null){
        alert("请对网点进行评星")
    }
    else if (chapin !=null && dianpu !== null){
        $.ajax({
            type:"post",
            url:"https://www.kpmaolv.com/maolv/commodityComment/addStoreAndCommodityComment",
            dataType:"json",
            data:{
                commodityCommentScore:chapin,
                commodityCommentBody:commodityCommentBody,
                storeCommentScore:dianpu,
                storeCommentBody:StoreCommentBody,
                commodityId:commodityId,
                deliveryId:deliveryId,
                orderId:orderId,
                userId:data11111
            },
            success:function (ResponseText) {
                alert(ResponseText.reMessage);
                sessionStorage.removeItem('arr5');
                sessionStorage.removeItem('arr6');
                sessionStorage.removeItem('order-top');
                sessionStorage.setItem('order_selected',4);
                window.location.href="../order/my-order.html"
            },
            error:function (val) {
                alert("网络异常")
            }
        })
    }
});