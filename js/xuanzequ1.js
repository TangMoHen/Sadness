/**
 * Created by 周贺星 on 2017/7/1.
 */
function getUrlParam (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!= null) {
        return decodeURI(r[2]);
    }else{
        return null;
    }
}
var name=getUrlParam("name");
var tel=getUrlParam("tel");
var id1=getUrlParam("id1");
$("#qu").click(function () {
    var url = "xiugaishouhuodizhi1.html?id=1&name="+name+"&tel="+tel+"&id1="+id1;
    var qu=$("#qu").val();
    $.ajax({
        type:"GET",
        url:"http://www.kpmaolv.com/maolv/store/searchByQu",
        data:{
            qu:qu
        },
        dataType: "json",
        success:function(data) {
            alert("成功")
        },
        error:function (res) {
            alert("失败")
        }
    })
    window.location.href=url
});

$("#qu1").click(function () {
    var url = "xiugaishouhuodizhi1.html?id=2&name="+name+"&tel="+tel+"&id1="+id1;
    var qu=$("#qu1").val();
    $.ajax({
        type:"GET",
        url:"http://www.kpmaolv.com/maolv/store/searchByQu",
        data:{
            qu:qu
        },
        dataType: "json",
        success:function(data) {
            alert("成功")
        },
        error:function (res) {
            alert("失败")
        }
    })
    window.location.href=url
})
$("#qu2").click(function () {
    var url = "xiugaishouhuodizhi1.html?id=3&name="+name+"&tel="+tel+"&id1="+id1;
    var qu=$("#qu2").val();
    $.ajax({
        type:"GET",
        url:"http://www.kpmaolv.com/maolv/store/searchByQu",
        data:{
            qu:qu
        },
        dataType: "json",
        success:function(data) {
            alert("成功")
        },
        error:function (res) {
            alert("失败")
        }
    })
    window.location.href=url
})
$("#qu3").click(function () {
    var url = "xiugaishouhuodizhi1.html?id=4&name="+name+"&tel="+tel+"&id1="+id1;
    var qu=$("#qu3").val();
    $.ajax({
        type:"GET",
        url:"http://www.kpmaolv.com/maolv/store/searchByQu",
        data:{
            qu:qu
        },
        dataType: "json",
        success:function(data) {
            alert("成功")
        },
        error:function (res) {
            alert("失败")
        }
    })
    window.location.href=url
})
$("#qu4").click(function () {
    var url = "xiugaishouhuodizhi1.html?id=5&name="+name+"&tel="+tel+"&id1="+id1;
    var qu=$("#qu4").val();
    $.ajax({
        type:"GET",
        url:"http://www.kpmaolv.com/maolv/store/searchByQu",
        data:{
            qu:qu
        },
        dataType: "json",
        success:function(data) {
            alert("成功")
        },
        error:function (res) {
            alert("失败")
        }
    })
    window.location.href=url
})