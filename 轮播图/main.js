window.onload = function () {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var btnWrapper = document.getElementById('buttons');
    var buttons = btnWrapper.getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1
    var timer = null
    function animate (offset) {
       var left = parseInt(list.style.left) + offset
       console.log(left)
       list.style.left = left + 'px'
       if(left < -3000) {
          list.style.left = -600 + 'px'
       }
       if(left > -600) {
          list.style.left = -3000 + 'px'
       }
    }
    // 按钮样式改变
    function showBtn () {
        for(var i=0;i<buttons.length;i++){
            if(buttons[i].classList.contains('on')){
                buttons[i].classList.remove('on')
                break
            }
        }
        buttons[index - 1].classList.add('on')
    }
    // 上一张
    prev.onclick = function () {
        if(index <= 1){
            index = 5
        } else {
            index--
        }
        animate(600)
        showBtn()
    }
    // 下一张
    next.onclick = function () {
        if(index >= 5){
            index = 1
        } else {
            index++
        }
        animate(-600)
        showBtn()
    }
    // 按钮点击切换
    function btnClickHandler (target) {
        if(target.classList.contains('on')){
            return
        }
        var targetIndex = parseInt(target.getAttribute('index'))
        var offset = -600 * (targetIndex - index)
        animate(offset)
        index = targetIndex
        showBtn()
    }
    btnWrapper.onclick = function (e) {
        var e = e || window.event
        var target = e.target || e.srcElement
        if(target.nodeName === 'SPAN'){
          btnClickHandler(target)
        }
    }
    // 自动切换
    function autoPlay () {
        timer = setInterval(() => {
            next.onclick()
        }, 2000)
    }
    function stop () {
        clearInterval(timer)
    }
    container.onmouseout = autoPlay
    container.onmouseover = stop
    autoPlay()
}