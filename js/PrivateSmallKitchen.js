
window.onload=function(){
	document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px';
   window.onresize=function(){
      document.documentElement.style.fontSize=100*document.documentElement.clientWidth/375+'px'
   };
   //以上是rem布局代码

	var oNav=document.getElementById("kitchen");
	var aLi=oNav.getElementsByTagName('li');
	for( var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for( var i=0;i<aLi.length;i++){
				aLi[i].className='';
			}
			this.className='red';
		};
	}
	//分类点击转换样式

    $.ajax({
        url:`https://www.kpmaolv.com/maolv/cookbook/queryByCategory?cookbook_category=0`,
        dataType:'json',
        cache:false,
        type:'post',
        success:function(r){
            console.log(r.data[0]);
            if(r.result=='0000'){
                for(var i=0;i<r.data.length;i++){
                    $(`
						<li>
							<a href="LearningSteps.html?cookbook_id=${r.data[i].cookbook_id}" class="clearFix">
								<img src="${r.data[i].cookbook_coverimg}" alt="" class="fl">
								<p class="fl">${r.data[i].cookbook_name}</p>
								<span class="fr">点击学习</span>
							</a>
						</li>`).appendTo('.vegetarian-dishes');
                }


            }
        },
        error:()=>{
            alert('错了404');
        }
    });


    $(function() {
        $("nav #kitchen #su").click(function() {
            $(".dishes .vegetarian-dishes").children('li').remove();  // 删除ul下的子元素li
            $.ajax({
                url:`https://www.kpmaolv.com/maolv/cookbook/queryByCategory?cookbook_category=0`,
                dataType:'json',
                cache:false,
                type:'post',
                success:function(r){
                    console.log(r.data[0]);
                    if(r.result=='0000'){
                        for(var i=0;i<r.data.length;i++){
                            $(`
						<li>
							<a href="LearningSteps.html?cookbook_id=${r.data[i].cookbook_id}" class="clearFix">
								<img src="${r.data[i].cookbook_coverimg}" alt="" class="fl">
								<p class="fl">${r.data[i].cookbook_name}</p>
								<span class="fr">点击学习</span>
							</a>
						</li>`).appendTo('.vegetarian-dishes');
                        }


                    }
                },
                error:()=>{
                    alert('错了404');
                }
            });
        });
    })

    $(function() {
        $("nav #kitchen #hun").click(function() {
            $(".dishes .vegetarian-dishes").children('li').remove();  // 删除ul下的子元素li
            $.ajax({
                url:`https://www.kpmaolv.com/maolv/cookbook/queryByCategory?cookbook_category=1`,
                dataType:'json',
                cache:false,
                type:'post',
                success:function(r){
                    console.log(r.data[0]);
                    if(r.result=='0000'){
                        for(var i=0;i<r.data.length;i++){
                            $(`
						<li>
							<a href="LearningSteps.html?cookbook_id=${r.data[i].cookbook_id}" class="clearFix">
								<img src="${r.data[i].cookbook_coverimg}" alt="" class="fl">
								<p class="fl">${r.data[i].cookbook_name}</p>
								<span class="fr">点击学习</span>
							</a>
						</li>`).appendTo('.vegetarian-dishes');
                        }


                    }
                },
                error:()=>{
                    alert('错了404');
                }
            });
        });
    })

};