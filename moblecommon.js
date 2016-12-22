/**
 * Created by Administrator on 2016/10/31.
 */
var movebleFF = {
    settap : function (Element,calllback){
        var isMove = false;
        var date = null;
        var date1 = null;
        Element.addEventListener('touchstart',function (){
            date = Date.now();
        });
        Element.addEventListener('touchmove',function (){
            isMove = true;
        });
        Element.addEventListener('touchend',function (e){
            date1 = Date.now();
            if(isMove == false && date1-date < 150){
                calllback && calllback(e);
            }
            isMove=false;
        });
    },
    //清除过度
    removetransition:function (Element){
        Element.style.transition = 'none';
        Element.style.webkitTransition = 'none';
    },
    //设置过度
    settransition:function (Element){
        Element.style.transition = 'all 0.5s';
        Element.style.webkitTransition = 'all 0.5s';
    },
    //设置偏移
    settransform:function (Element,current){
        Element.style.transform = 'translateX('+current+'px)';
        Element.style.webkitTransform = 'translateX('+current+'px)';
    },
    //设置轮播图封装
    //参数介绍    操作元素,标题数组，banner元素class（字符串），小圆点元素父级class（字符串），活动class，
    setbannerloor:function (Element,alt,banners,tip,act){
        var timer = null;
        var flag = true;
        //获取banner宽度
        var bannerWidth = $(banners).width();
        window.addEventListener('resize',function (){
            //获取window宽度
            var windowWidth = $(window).width();
            $(banners).width(windowWidth);
            bannerWidth = $(banners).width();
        });
        var aulLi = Element.getElementsByTagName('li');
        var oulLiWidth = parseInt(getComputedStyle(aulLi[1])['width']);
        //获取ol下面的li
        var aLi = $(tip).find('li');
        var index = 1;
        //小点走 的函数
        function aLiGo(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].classList.remove(act);
            }
            aLi[index-1].classList.add(act);
        }
        function zdlb() {
            timer = setInterval(function () {
                index++;
                movebleFF.settransition(Element);
                movebleFF.settransform(Element,-oulLiWidth*index);
            }, 2000)
        }
        zdlb();
        //设置滑动事件
        //设置三个坐标
        var startX = 0;
        var moveX = 0;
        var endX = 0;
        Element.addEventListener('touchstart',function (e){
            clearInterval(timer);
                startX = e.touches[0].clientX;
        });
        Element.addEventListener('touchmove',function (e){
                moveX = e.touches[0].clientX;
                endX = moveX - startX;
                movebleFF.removetransition(Element);
                movebleFF.settransform(Element, (-oulLiWidth * index + endX));
        });
        Element.addEventListener('touchend',function (){
            if(flag) {
                flag = false;
                if (Math.abs(endX) > oulLiWidth / 3) {
                    if (endX > 0) {
                        index--;
                        movebleFF.settransition(Element);
                        movebleFF.settransform(Element, -oulLiWidth * index);
                    } else {
                        index++;
                        movebleFF.settransition(Element);
                        movebleFF.settransform(Element, -oulLiWidth * index);
                    }
                } else {
                    movebleFF.settransition(Element);
                    movebleFF.settransform(Element, -oulLiWidth * index);
                }
                zdlb();
            }else{
                movebleFF.settransition(Element);
                movebleFF.settransform(Element, -oulLiWidth * index);
            }
        });
        setTransitionEnd(function (){
            flag = true;
        });
        //设置transitionend事件，过度完之后才执行的事件
        function setTransitionEnd(callback){
            window.addEventListener('transitionend',function (){
                if(index == 0){
                    index = aulLi.length-2;
                    movebleFF.removetransition(Element);
                    movebleFF.settransform(Element,-oulLiWidth*index);
                }else if(index == aulLi.length-1){
                    index = 1;
                    movebleFF.removetransition(Element);
                    movebleFF.settransform(Element,-oulLiWidth*index);
                }
                aLiGo();
                callback && callback();
                if(alt){
                    var oSpan = $(banners).find('span');
                    $(oSpan).html(alt[index-1]);
                }

            })
        }
    },
    setData:function (url,attr,id,callback,endfn){
        $.ajax({
            type:'get',
            url:url,
            data:attr,
            success:function (data){
                var html = template(id,{"items":data.result});
                callback && callback(html);
            },
            complete:function (){
                endfn && endfn();
            }
        })
    },
    setData1:function (url,attr,callback,endfn){
        $.ajax({
            type:'get',
            url:url,
            data:attr,
            success:function (data){
                callback && callback(data);
            },
            complete:function (){
                endfn && endfn();
            }
        })
    },
    setQueryString:function (name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
};