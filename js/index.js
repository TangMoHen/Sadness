window.onload=function(){
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/320+'px';
    window.onresize=function(){
       document.documentElement.style.fontSize=100*document.documentElement.clientWidth/320+'px'
    }
    let aFun=document.querySelector('.hand-r');
    let oFun=document.querySelector('.function');
    aFun.onclick=function(){
        if(oFun.style.display=="block"){
             oFun.style.display="none";
        }else{
            oFun.style.display="block";
        }
    };
    let oUse=document.querySelector('.hand-l');
    let oUser=document.querySelector('.user');
    let oHand=document.querySelector('.hand');
    oUse.onclick=function(){
        if (oUser.style.marginLeft=="-3.2rem") {
            oUser.style.marginLeft="-.8rem";
        }else {
            oUser.style.marginLeft="-3.2rem";
        }
    };

    // document.onclick=function(){
    //     oUser.style.display="none";
    // }
}
