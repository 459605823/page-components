requirejs.config({
    paths: {
        jquery: 'jquery-3.3.1.min'
    }
})

requirejs(['jquery', 'backtop'], function ($, backtop) {
    new backtop.BackTop($('#backTop'), {
        mode: 'move'
    })


    // $.proxy(function, context) : 将function的this指向context
    // $('#backTop').on('click', $.proxy(scroll.move, scroll))

})