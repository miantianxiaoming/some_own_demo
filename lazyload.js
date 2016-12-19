 //实现懒加载
    //利用clientHeight和srrolltop来控制图片的加载
    //利用在ajax的轮播图中当clientHeight+scrollTop的和喝放置图片的ul的offsettop比较，当前者大于后者的时候，开始发送请求来加载图片
    (function (win){
            win.lazyLoad = function (imgDom,callback){
                //首先定义屏幕的高度
                var cliiHright = document.documentElement.clientHeight;
                var flag = true;//定义节流阀
                window.addEventListener('scroll', function (){
                    if(flag){
                        //实时更新滚轮滚动是scrollTop的值
                     var sTop = document.documentElement.scrollTop || document.body.scrollTop;
                    //当图片的offsettop小于scrolltop+clientHeight的和时，关闭节流阀，执行循环给每张图片设置上新的地址
                    if(imgDom[0].offsetTop < sTop+cliiHright){
                        flag = false;
                      //利用ajax技术请求图片数据并渲染
                        callback();
                    }
                }
                })
            };          
        })(window)
  
