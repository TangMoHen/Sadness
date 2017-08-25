window.onload=function() {
    document.documentElement.style.fontSize = 100 * document.documentElement.clientWidth / 639 + 'px';
    window.onresize = function () {
        document.documentElement.style.fontSize = 100 * document.documentElement.clientWidth / 639 + 'px'
    };

    var search=window.location.search;

    var user = JSON.parse(sessionStorage.getItem("user"));
    var userId=user.date.user_id;
    console.log(user);


    $.ajax({
        url:`https://www.kpmaolv.com/maolv/Integral/queryintegralinfo${search}`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r);
            if(r.result=="0000"){
                // $(`${r.data.user_info_integral}`).appendTo('#userIntegral');
                // $('#userIntegral').append(`${r.data.user_info_integral}`);
                $(`
                <img class="fl" src="${r.data[0].commodity.commodity_coverimg}" alt="">
                <div class="js fl">
                    ${r.data[0].commodity.commodity_name} <br>
                    积分：${r.data[0].integral_mall_price}<br>    
                    <div class="shul">
                        所需兑换积分:<span id="zongh">${r.data[0].integral_mall_price}</span>
                        <input type="button" value="-" id="small">
                        <input type="text" value="1" id="text" disabled>
                        <input type="button" value="+" id="large">
                    </div>
                </div>
                `).appendTo('.details');

                sessionStorage.cid=r.data[0].commodity_id;


                            function small() {
                                var txt=parseInt(document.getElementById("text").value);
                                var zongh=parseInt(document.getElementById("zongh").value);
                                if (txt>1){
                                    document.getElementById("text").value=txt-1;
                                    $('#zongh').html((txt-1)*`${r.data[0].integral_mall_price}`);
                                }else{
                                    alert("兑换数量不能低于1个")
                                }
                            }
                            function large() {
                                var txt=parseInt(document.getElementById("text").value);
                                if (txt<9999){
                                    document.getElementById("text").value=txt+1;
                                    $('#zongh').html((txt+1)*`${r.data[0].integral_mall_price}`);
                                }
                            }

                            $("#small").click(small);
                            $("#large").click(large);

                            //  加减积分商品的数量


            }
        },
        error:()=>{
            alert('加载错误请重新刷新');
        }
    })


    	$.ajax({
            url:`https://www.kpmaolv.com/maolv/delivery/searchDefault?userId=${userId}`,
             dataType:'json',
             cache:false,
             type:'post',
             success:function(r){
                    console.log(userId);
                    console.log(r);
                 if(r.result=='0000'){
                     $(`
                        <a href="./userlogin/shouhuodizhi.html">
                                    <div class="address">${r.data.store_address_shi}${r.data.store_address_qu}${r.data.store_address_info}</div>
                                    <div class="name fl">${r.data.delivery_consignee}</div>
                                    <div class="phone fl">${r.data.delivery_phone}</div>
                        </a>
                    `).appendTo('.fill-in');
                     sessionStorage.did=r.data.delivery_id;
                 }else{
                     $(`
            <div class="not-obtain" id="txdz">
                <a class="txdz">
                    请填写收货地址
                </a>
            </div>
                `).appendTo('.fill-in');

                     $('#txdz').click(function () {
                         sessionStorage.setItem('url1',document.URL);
                         window.location.href="./userlogin/shouhuodizhi.html"
                     });
                 }
             },
             error:()=>{
                 alert('错了404');
             }
         });


    var cid=sessionStorage.getItem('cid');
    var did=sessionStorage.getItem('did');

    $('#confirm').click(function(){
        var text=$('#text').val();
        $.post(`https://www.kpmaolv.com/maolv/integralHistory/add?uid=${userId}&cid=${cid}&num=${text}&did=${did}`,function (data) {
            console.log(data)

            if(data.result=='0000'){
                alert('兑换成功')
            }else{
                alert('兑换失败')
            }
        })
    })


};