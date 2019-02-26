(function($){
   var Carousel = function(poster, options) {
       var self = this
       // 获取dom对象
       this.poster = poster
       this.imgList = poster.find('ul.img-list')
       this.buttons = poster.find('.btn')
       this.prevBtn = poster.find('.prev')
       this.nextBtn = poster.find('.next')
       this.imgItems = this.imgList.find('li')
       this.firstImg = this.imgItems.first()
       this.lastImg = this.imgItems.last()
       this.animateFlag = false
       // 组合默认参数和用户传递参数
       this.setting = $.extend({}, Carousel.DEFAULT, options)
       // 设置基础样式
       this.setStyle()
       // 设置左右图片样式
       this.setImgStyle()
       // 按钮事件绑定
       this.nextBtn.click(function(){
          if(!self.animateFlag) {
            self.animateFlag = true
            self.carouseRotate("left");
          }
       })
       this.prevBtn.click(function () {
           if(!self.animateFlag){
              self.animateFlag = true
              self.carouseRotate("right");
           }
       })
       // 设置自动播放
       if(this.setting.autoplay) {
           this.autoplay()
           this.poster.hover(function(){
              clearInterval(self.timer)
           },function(){
              self.autoplay()
           })
       }
   }
        // 默认配置参数
        // 共有变量定义在构造函数上，避免每个实例都生成私有变量
       Carousel.DEFAULT = {
           width: 1000, // 幻灯片宽度
           height: 270, // 幻灯片高度
           posterWidth: 640, // 第一帧宽度
           posterHeight: 270, // 第一帧高度
           scale: 0.9, // 每张图片相对缩放比例
           speed: 500, // 轮播速度
           autoplay: true, // 是否自动轮播
           delay: 2000, // 自动轮播延时
           verticalAlign: 'middle' // 图片垂直对齐方式 top bottom
       }
   Carousel.prototype = {
       // 自动播放
       autoplay: function () {
           var self = this
           this.timer = setInterval(function(){
               self.nextBtn.click()
           }, self.setting.delay)
       },
       // 设置基础样式
       setStyle: function () {
         this.poster.css({
             "width" : this.setting.width,
             "height" : this.setting.height
         })
         this.imgList.css({
             "width": this.setting.width,
             "height": this.setting.height
         })
         this.buttons.css({
             "width": (this.setting.width - this.setting.posterWidth) / 2,
             "height": this.setting.height,
             "z-index": Math.ceil(this.imgItems.length/2)
         })
         this.firstImg.css({
             "left": (this.setting.width - this.setting.posterWidth) / 2,
             "width": this.setting.posterWidth,
             "height": this.setting.posterHeight,
             "z-index": Math.floor(this.imgItems.length / 2)
         })
       },
       // 设置左右侧图片样式
       setImgStyle: function () {
           var restImgs = this.imgItems.slice(1), // 获取除第一张图片以外的图片
               sideImgSize = restImgs.length / 2, // 两侧分布图片的数量
               rightImgs = restImgs.slice(0,sideImgSize), // 右侧图片
               LeftImgs = restImgs.slice(sideImgSize), // 左侧图片
               maxIndex = Math.floor(this.imgItems.length / 2) // 图片最大的z-index值
           var posterWidth = this.setting.posterWidth
           var posterHeight = this.setting.posterHeight
           var gap = ((this.setting.width - this.setting.posterWidth) / 2) / sideImgSize // 每张图片间隔
           var self = this
           var fixOffsetLeft = posterWidth + (this.setting.width - this.setting.posterWidth) / 2
           // 设置右侧图片样式
           // 右侧图片样式设置以第一张图片为基准
           rightImgs.each(function(i){
            maxIndex--
            posterWidth = posterWidth * self.setting.scale
            posterHeight = posterHeight * self.setting.scale
            var j = i
            $(this).css({
                "z-index": maxIndex,
                "width": posterWidth,
                "height": posterHeight,
                "opacity": 1 / (++i),
                "left": fixOffsetLeft + (++j) * gap - posterWidth,
                "top": self.setVerticalAlign(posterHeight)
            })
           })
           // 设置左侧图片样式
           // 保证图片切换顺序，左侧图片样式设置依照右侧最后一张图片样式为基准
           var lw = rightImgs.last().width(),
               lh = rightImgs.last().height(),
               lIndex = Math.floor(this.imgItems.length / 2)
           LeftImgs.each(function(i){
               $(this).css({
                   "z-index": i,
                   "width": lw,
                   "height": lh,
                   "opacity": 1 / lIndex,
                   "left": i * gap,
                   "top": self.setVerticalAlign(lh)
               })
               lw = lw / self.setting.scale
               lh = lh / self.setting.scale
               lIndex--
           })
       },
       setVerticalAlign: function (height) {
           var verticalAlignType = this.setting.verticalAlign
           var result = 0
           switch (verticalAlignType) {
               case 'middle':
               result = (this.setting.height - height) / 2
               break;
               case 'top':
               result = 0
               break;
               case 'bottom':
               result = this.setting.height - height
               break;
           }
           return result
       },
       carouseRotate: function (dir) {
           var self = this
           var zIndexArr = []
           if(dir === 'left') {
               // 向左旋转：将每张图片样式设置为其前一张图片的样式即可完成旋转
               this.imgItems.each(function(){
                   var _this = $(this),
                   // 获取当前图片的上一张图片
                   // 如果上一张图片不存在，就切换到最后一张图片
                        prev = _this.prev().get(0) ? _this.prev() : self.lastImg,
                        width = prev.width(),
                        height = prev.height(),
                        zIndex = prev.css("zIndex"),
                        opacity = prev.css("opacity"),
                        left = prev.css("left"),
                        top = prev.css("top");
                        // $(selector).animate(styles,speed,easing,callback)
                        _this.animate({
                            width: width,
                            height: height,
                            opacity: opacity,
                            left: left,
                            top: top
                        },self.setting.speed, function(){
                            self.animateFlag = false
                        })
                    zIndexArr.push(zIndex)
               })
               this.imgItems.each(function(i){
                   $(this).css('zIndex', zIndexArr[i])
               })
           } else if(dir === 'right') {
                 // 向右旋转：将每张图片样式设置为其下一张图片的样式即可完成旋转
                 this.imgItems.each(function () {
                     var _this = $(this),
                         // 获取当前图片的下一张图片
                         // 如果下一张图片不存在，就切换到第一张图片
                         next = _this.next().get(0) ? _this.next() : self.firstImg,
                         width = next.width(),
                         height = next.height(),
                         zIndex = next.css("zIndex"),
                         opacity = next.css("opacity"),
                         left = next.css("left"),
                         top = next.css("top");
                        _this.animate({
                            width: width,
                            height: height,
                            zIndex: zIndex,
                            opacity: opacity,
                            left: left,
                            top: top
                        },self.setting.speed, function(){
                            self.animateFlag = false
                        })
                     zIndexArr.push(zIndex)
                 })
                this.imgItems.each(function (i) {
                    $(this).css('zIndex', zIndexArr[i])
                })
           }
       }

   }
   // jQuery封装插件 调用方式 $.carousel
   $.extend({
    carousel: function (poster, options) {
        new Carousel(poster, options);
    }
   })
})(jQuery)