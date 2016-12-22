//获取id函数
function $$(id){
    return document.getElementById(id);
}
//获取样式函数
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
//动画函数
function doMove(obj,attr,target,secondes){
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        var leader = parseInt(getStyle(obj,attr)) || 0;
        var bc = (target-leader)/10;
        bc = bc > 0 ? Math.ceil(bc) : Math.floor(bc);
        obj.style[attr] = leader + bc + 'px';
        if(leader == target){
            clearInterval(obj.timer);
        }
    },secondes)
}
//添加事件函数
function addEvents(obj,type,listener){
    return obj.addEventListener ? obj.addEventListener(type,listener,false) : obj.attachEvent('on'+type,listener);
}

//jq入口函数
$(function (){
    //js效果部分
    var aLi_riqi = $$('riqi').getElementsByTagName('li');
    aLi_riqi[0].style.textIndent = '212px';
    aLi_riqi[1].style.textAlign = 'center';
    aLi_riqi[2].style.textIndent = '44px';
    var aSpanzhou = $$('zhou').getElementsByTagName('span');
    var aAzhou = $$('zhou').getElementsByTagName('a');
    aSpanzhou[0].style.marginTop = '8px';
    aSpanzhou[1].style.cssText = 'position: absolute; left:50%;top:8px'
    aSpanzhou[2].style.cssText = 'position: absolute; left:50%;top:8px'
    aSpanzhou[3].style.marginTop = '8px';
    var aEm = $$('zhou').getElementsByTagName('em');
    aEm[0].style.left = '503px';
    aEm[0].style.background = 'url("imgs/activezhou.png") no-repeat';
    aEm[1].style.left = '614px';
    aEm[2].style.right = '132px';
    aEm[3].style.right = '42px';
    aEm[4].style.left = '38px';
    aEm[5].style.left = '182px';
    aEm[6].style.left = '240px';
    aEm[7].style.left = '355px';
    aEm[8].style.right = '358px';
    aEm[9].style.right = '228px';
    aEm[10].style.right = '156px';
    aEm[11].style.right = '68px';
    for(var i=0;i<aAzhou.length;i++){
        if(i%2 == 0){
            aAzhou[i].style.background = 'url(imgs/zuo1.png) no-repeat center'
            aAzhou[i].onmouseover = function (){
                this.style.background = 'url(imgs/zuo1active.png) no-repeat center'
            }
            aAzhou[i].onmouseout = function (){
                this.style.background = 'url(imgs/zuo1.png) no-repeat center'
            }
        }else{
            aAzhou[i].style.background = 'url(imgs/you1noact.png) no-repeat center'
            aAzhou[i].onmouseover = function (){
                this.style.background = 'url(imgs/you1.png) no-repeat center'
            }
            aAzhou[i].onmouseout = function (){
                this.style.background = 'url(imgs/you1noact.png) no-repeat center'
            }
        }
    }
    var PicArrodd = ['imgs/wotch.jpg','imgs/wc1.jpg','imgs/Des.jpg','imgs/pic22.jpg','imgs/putao.jpg','imgs/pic33.jpg','imgs/camelor.jpg','imgs/pic44.jpg','imgs/cm2.jpg','imgs/pic66.jpg','imgs/yanjing.jpg','imgs/pic77.jpg','imgs/youqi.jpg','imgs/pic88.jpg','imgs/dancer.jpg','imgs/pic99.jpg','imgs/dancer1.jpg','imgs/pic100.jpg','imgs/yinxiang.jpg','imgs/pic111.jpg','imgs/angrin.jpg','imgs/pic122.jpg','imgs/wumen.jpg','imgs/pic133.jpg'];
    var aLi = $$('piczhou').getElementsByTagName('li');
    for(var i=0;i<aLi.length;i++){
        if(i%2 == 1){
            aLi[i].style.width = '496px';
            aLi[i].style.marginLeft = 0;
            var oDiv = aLi[i].getElementsByTagName('div')[0];
            oDiv.style.background = 'url('+PicArrodd[i]+')';
            aLi[i].style.display = 'none';
        }else{
            aLi[i].style.marginRight = 0;
            var oImg = aLi[i].getElementsByTagName('img')[0];
            oImg.src = PicArrodd[i];
        }
    }
    var aAanniu = $$('zhouPrevOrNext').getElementsByTagName('a');
    aAanniu[0].style.cssText = 'left:0;top:0;background:url(imgs/zuo2.png) no-repeat center';
    aAanniu[1].style.cssText = 'right:0;top:0;background:url(imgs/you2.png) no-repeat center';
    for(var i=0;i<aAanniu.length;i++){
        if(i%2 == 0){
            aAanniu[i].onmouseover = function (){
                this.style.background = 'url(imgs/zuo2act.png) no-repeat center';
            }
            aAanniu[i].onmouseout = function (){
                this.style.background = 'url(imgs/zuo2.png) no-repeat center';
            }
        }else{
            aAanniu[i].onmouseover = function (){
                this.style.background = 'url(imgs/you2act.png) no-repeat center';
            }
            aAanniu[i].onmouseout = function (){
                this.style.background = 'url(imgs/you2.png) no-repeat center';
            }
        }
    }


    //jq效果部分
    $('#zhouprev').click(function (){
        if(parseInt($('#zhouul').css('left')) < 0 ){
            zhouzdzoup();
        }
    })
    $('#zhounext').click(function (){
        if(parseInt($('#zhouul').css('left')) == 0 ){
            zhouzdzoun();
        }
    })
    function zhouzdzoun(){
        $('#zhouul').animate({
            "left":"-898px"
        },1000);
        $('#riqi li').eq(0).fadeOut(400,function (){
            $('#riqi li').eq(0).html('JULY').fadeIn(400);
        });
        $('#riqi li').eq(2).fadeOut(400,function (){
            $('#riqi li').eq(2).html('AUGUST').fadeIn(400);
        });
    }
    function zhouzdzoup(){
        $('#zhouul').animate({
            "left":0
        },1000);
        $('#riqi li').eq(0).fadeOut(400,function (){
            $('#riqi li').eq(0).html('MAY').fadeIn(400);
        });
        $('#riqi li').eq(2).fadeOut(400,function (){
            $('#riqi li').eq(2).html('JUNE').fadeIn(400);
        });
    }
    var aEm = $$('zhou').getElementsByTagName('em');
    var aLi = $$('piczhou').getElementsByTagName('li');
    var widthPicLi = parseInt(getStyle(aLi[0],'width'));
    for(var i=0;i<aEm.length;i++){
        aEm[i].num = i;
        aEm[i].onclick = function (){
            for(var i=0;i<aEm.length;i++){
                aEm[i].style.background =  'url("imgs/noactivezhou.png") no-repeat';
            }
            this.style.background = 'url("imgs/activezhou.png") no-repeat';
            var target = -widthPicLi * this.num + 400;
            doMove($$('piczhou'),'left',target,30);
            num = leader = this.num;
        }
    }
    var aA = $$('zhouPrevOrNext').getElementsByTagName('a');
    var num = 0;
    var leader = 0;
    addEvents(aA[1],'click',function (){
        if(onOff()){
            nextPic();
            for(var i=0;i<aLi.length;i++){
                if(i%2 == 1){
                    aLi[i].style.display = 'none';
                    aLi[i].removeAttribute('flag');
                }
            }
        }else{
            nextPic();
        }
    })
    addEvents(aA[0],'click',function (){
        if(onOff()){
            prevPic();
            for(var i=0;i<aLi.length;i++){
                if(i%2 == 1){
                    aLi[i].style.display = 'none';
                    aLi[i].removeAttribute('flag');
                }
            }
        }else{
            prevPic();
        }
    })
    $('.divpic img').mouseenter(function (){
        $(this).next().animate({
            "height":"125",
            "width":"200"
        },100);
    })
    $('.divpic').mouseleave(function (){
        $(this).find('.divpic1').animate({
            "height":"0",
            "width":"0"
        },100);
    })
    $('.divpic2 button').click(function (){
        for(var i=0;i<aLi.length;i++){
            if(i%2 == 1){
                aLi[i].style.display = 'none';
                aLi[i].removeAttribute('flag');
            }
        }
        $(this).parent().parent().parent().next().show(400).attr('flag',true);
    })
    $('.divpic3 input').click(function (){
        $(this).parent().parent().hide(400);
    })
    //判断是否是当前Li元素展开后的轮播标识
    function onOff(){
        for(var i=0;i<aLi.length;i++){
            if(i%2 == 1){
                if(aLi[i].getAttribute('flag') == 'true'){
//                            var aLiEvenWidth = parseInt(getStyle(aLi[i],'width'));
                    return true;
                }
            }
        }
    }
    //next按钮点击时的效果
    function nextPic(){
        num++;
        if (num == 4) {
            zhouzdzoun();
        }
        if (num == aEm.length) {
            num = aEm.length - 1;
        }
        var target = -widthPicLi * num + 400;
        doMove($$('piczhou'), 'left', target, 30);
        leader++;
        if (leader == aEm.length) {
            leader = aEm.length - 1;
        }
        for (var i = 0; i < aEm.length; i++) {
            aEm[i].style.background = 'url("imgs/noactivezhou.png") no-repeat';
        }
        aEm[leader].style.background = 'url("imgs/activezhou.png") no-repeat';
    }
    //prev按钮点击时的效果
    function prevPic(){
        num--;
        if(num == 3){
            zhouzdzoup();
        }
        if(num == -1){
            num = 0;
        }
        var target = -widthPicLi * num + 400 ;
        doMove($$('piczhou'),'left',target,30);
        leader--;
        if(leader == -1){
            leader = 0;
        }
        for(var i=0;i<aEm.length;i++){
            aEm[i].style.background = 'url("imgs/noactivezhou.png") no-repeat';
        }
        aEm[leader].style.background = 'url("imgs/activezhou.png") no-repeat';
    }
    $('#piczhou li:even').each(function (index,ele){
        $(ele).fadeOut((index+1)*100,function(){
            $('#piczhou li:even').each(function (index,ele){
                $(ele).fadeIn(($('li').length - index)*100);
            })
        })
    })
})