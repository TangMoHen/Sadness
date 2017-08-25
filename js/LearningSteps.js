window.onload=function(){
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/1080+'px';
    window.onresize=function(){
        document.documentElement.style.fontSize=100*document.documentElement.clientWidth/1080+'px'
    };
    //以上是rem布局代码

    var https=window.location.search;
    // console.log(https);
    // 获取https
	$('#gemeover').click(function(){
		$(".top").remove();
	})

    $.ajax({
        url:`https://www.kpmaolv.com/maolv/cookbook/queryInfo${https}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data.catagoryinfo[1]);
            if(r.result=='0000'){
                for(var i=1;i<r.data.catagoryinfo.length;i++){
                    $(`
                        <div class="swiper-slide" id="li">
                           <img src="${r.data.catagoryinfo[i].cookbookinfo_img}" alt="">
                        </div>
                    `).appendTo('.swiper-wrapper');
                }
                new Swiper('.swiper-container');
            }
        },
        error:()=>{
            alert('错了404');
        }
    });
    $.ajax({
        url:`https://www.kpmaolv.com/maolv/cookbook/queryInfo${https}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data.catagoryinfo[1]);
            if(r.result=='0000'){
                for(var i=0;i<1;i++){
                    $(`
                        <img src="${r.data.catagoryinfo[i].cookbookinfo_img}" alt="">
                    `).appendTo('.the-dishes-b');
                }
                new Swiper('.the-dishes-b');
            }
        },
        error:()=>{
            alert('错了404');
        }
    });










};
    // $("#search-q").click(function(){
    //     $("nav .search-goods").children('li').remove();  // 删除ul下的子元素li
    //     var value=$("#search-s").val();