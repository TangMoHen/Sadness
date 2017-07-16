/**
 * Created by 周贺星 on 2017/7/1.
 */

$("#ok").click(function () {
    var user = $("#user").val();
    var shoujihao = $("#phone").val();
    $.ajax({
        type: "GET",
        url: "https://www.kpmaolv.com/maolv/delivery/addDelivery",
        data: {
            consignee: user,
            deliveryPhone: shoujihao,
            storeId:1
        },
        dataType: "json",
        success: function (data) {
            alert("添加成功");
        },
        error: function (res) {
            alert("添加失败");
        }
    })
})
window.onload = function() {
    var loading = document.getElementById('loading')
    loading.style.display='none';
};