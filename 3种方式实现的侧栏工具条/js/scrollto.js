define(['jquery'], function ($) {
    function ScrollTo(opts) {
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts)
        this.$el = $('html, body')
    }
    // 共有变量定义在构造函数本身
    // 若定义在构造函数内部，那么每一个实例在调用构造函数后都会
    // 在自身新建一个私有变量，是一种浪费
    ScrollTo.DEFAULTS = {
        dest: 0, // 运动终点
        speed: 800 // 运动速度
    }
    ScrollTo.prototype = {
        move: function () {
            var opts = this.opts,
                dest = opts.dest,
                $el = this.$el
            if($(window).scrollTop() != dest) { // 当未达到目的地并且元素未在运动时执行
                if(!$el.is(':animated')) {
                    $el.animate({
                       scrollTop: dest
                   }, opts.speed)
                }
            }
        },
        go: function () {
          var dest = this.opts.dest
          if ($(window).scrollTop() != dest) { // 当未达到目的地时执行
            this.$el.scrollTop(dest)
          }
        }
    }

    return { ScrollTo }
})