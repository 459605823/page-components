define(['jquery', 'scrollto'], function ($, scrollto) {
    function BackTop (el, opts) {
        this.opts = $.extend({}, BackTop.DEFAULTS, opts)
        this.$el = $(el)
        this.scroll = new scrollto.ScrollTo({
            dest: 0,
            speed: this.opts.speed
        })
        // 第一次加载页面就判断位置控制按钮显示隐藏
        this._checkPosition()
        if(this.opts.mode === 'move'){
            this.$el.on('click', $.proxy(this._move, this))
        } else {
            this.$el.on('click', $.proxy(this._go, this))
        }
        $(window).on('scroll', $.proxy(this._checkPosition, this))
    }
    BackTop.DEFAULTS = {
        mode: 'move', // 运动模式
        pos: $(window).height(), // 显隐交界点
        speed: 800
    }
    BackTop.prototype = {
        _move: function () {
            this.scroll.move()
        },
        _go: function () {
            this.scroll.go()
        },
        _checkPosition: function () {
            var $el = this.$el
            if($(window).scrollTop() > this.opts.pos){
                $el.fadeIn()
            } else {
                $el.fadeOut()
          }
        }
      }

      return {
          BackTop
      }
    
})