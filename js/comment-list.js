/**
 * Created by dell on 2017/6/28.
 */
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
var commodityId = GetQueryString("commodityId");

var vm = new Vue({
    el:"#comment-list",
    data:{
        commentList:[],
        userList:[]
    },
    filters: {
        data: function (input) {
            var d = new Date(input);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
            var hour = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        }
    }
});
$.ajax({
    url:"https://www.kpmaolv.com/maolv/commodityComment/searchByCommodityId?commodityId="+commodityId,
    type:"POST",
    dataType:"json",
    success: function (data) {
        vm.commentList = data.map1.commodityCommentList;
        for (var i=0;i<vm.commentList.length;i++){
            $('.star li').eq(vm.commentList[i].commodity_comment_score-1).nextAll().addClass('glyphicon-star-empty');
        }
    }
});