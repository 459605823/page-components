//!!!!快速拖动选取框时会卡顿
window.onload = function(){
   prepareActions();
}
function prepareActions(){
  document.onselectstart = new Function('event.returnValue=false;');//防止图片被选中
  var mainDiv = document.getElementById('main');
  var rightMid = document.getElementById('rightMid');
  var upMid = document.getElementById("upMid");
  var leftMid = document.getElementById("leftMid");
  var downMid = document.getElementById("downMid");
  var leftUp = document.getElementById("leftUp");
  var rightUp = document.getElementById("rightUp");
  var leftDown = document.getElementById("leftDown");
  var rightDown = document.getElementById("rightDown");
  var parent = document.getElementById("img2");
  var isMouseDown = false;//鼠标按下状态
  var contact = '';//表示被按下的触点
  // startDrag(mainDiv,mainDiv);使用了张鑫旭的拖拽插件
  //使用jquery拖拽插件
  // $( "#main" ).draggable({ containment: 'parent' ,drag: setChoice});
  drag(mainDiv,parent);
  preview(mainDiv);//刚开始加载就将预览区域裁剪
  //e.stopPropagation()防止触发父元素拖拽事件
  rightMid.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'right';
  }
  upMid.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'up';
  }
  leftMid.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'left';
  }
  downMid.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'down';
  }
  leftUp.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'leftUp';
  }
  rightUp.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'rightUp';
  }
  leftDown.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'leftDown';
  }
  rightDown.onmousedown = function(e){
    e.stopPropagation();
    isMouseDown = true;
    contact = 'rightDown';
  }
  window.onmouseup = function(){
    isMouseDown = false;
  }
  window.onmousemove = function(e){
    if(isMouseDown){
       switch (contact) {
         case 'right':rightMove(e,mainDiv);break;
         case 'up':upMove(e,mainDiv);break;
         case 'left':leftMove(e,mainDiv);break;
         case 'down':downMove(e,mainDiv);break;
         case 'leftUp':upMove(e,mainDiv);leftMove(e,mainDiv);break;
         case 'rightUp':upMove(e,mainDiv);rightMove(e,mainDiv);break;
         case 'rightDown':downMove(e,mainDiv);rightMove(e,mainDiv);break;
         case 'leftDown':downMove(e,mainDiv);leftMove(e,mainDiv);break;
       }
    }
    setChoice(mainDiv);
    preview(mainDiv);
  }
}
  //原生JS实现拖拽功能
function drag(target,parent){
  var mouseDownX,mouseDownY,initX,initY,flag;
  target.onmousedown = function(e){
    //初始鼠标X、Y坐标
     mouseDownX = e.clientX;
     mouseDownY = e.clientY;
    //元素初始X、Y坐标
    initX = this.offsetLeft;
    initY = this.offsetTop;
    //表示鼠标已按下
    flag = true;
  }
 target.onmousemove = function(e){
   if(flag){
     //鼠标移动后的X、Y坐标
     var mouseMoveX = e.clientX;
     var mouseMoveY = e.clientY;
     //元素偏移量
     var offsetX = mouseMoveX - mouseDownX;
     var offsetY = mouseMoveY - mouseDownY;
     var finX = initX + offsetX;
     var finY = initY + offsetY;
     if(finX <= 0){
       finX = 0
     }
     if(finX >= parent.offsetWidth - target.offsetWidth){
       finX = parent.offsetWidth - target.offsetWidth;
     }
     if(finY <= 0){
       finY = 0
     }
     if(finY >= parent.offsetHeight - target.offsetHeight){
       finY = parent.offsetHeight - target.offsetHeight;
     }
     this.style.left = finX + 'px';
     this.style.top = finY + 'px';
   }
 }
 target.onmouseup = function(){
    //标识已松开鼠标
    flag = false;
 }
}
function rightMove(e,target){
  var x = e.clientX;
  if(x >= 950){
    x = 949;
  }
  if(x <= 200){
    x = 200;
  }
  target.style.width = x - getElementLeft(target) + 'px';
}
function upMove(e,target){
  var y = e.clientY;
  if(y <= 100){
    y = 100
  }
  if(y > 850){
    y = 849;
  }
  target.style.height = target.clientHeight + getElementTop(target) - y + 'px';
  target.style.top = target.offsetTop - getElementTop(target) + y + 'px';
}
function leftMove(e,target){
  var x = e.clientX;
  if(x <= 200){
    x = 200;
  }
  if(x >= 950){
    x = 949;
  }
  target.style.width = target.clientWidth + getElementLeft(target) - x + 'px';
  target.style.left = target.offsetLeft - getElementLeft(target) + x + 'px';
}
function downMove(e,target){
  var y = e.clientY;
  if(y <= 100){
    y = 99;
  }
  if(y >= 850){
    y = 850;
  }
  target.style.height = y - getElementTop(target) + 'px';
}
//设置选取区域高亮可见
function setChoice(target){
  var top = target.offsetTop;
  var right = target.offsetLeft+target.offsetWidth;
  var bottom = target.offsetTop+target.offsetHeight;
  var left = target.offsetLeft;
  var img2 = document.getElementById("img2");
  img2.style.clip = "rect("+top+"px "+right+"px "+bottom+"px "+left+"px)";
}
//设置预览图片大小
function preview(target){
  var top = target.offsetTop;
  var right = target.offsetLeft+target.offsetWidth;
  var bottom = target.offsetTop+target.offsetHeight;
  var left = target.offsetLeft;
  var img3 = document.getElementById("img3");
  img3.style.top = -top + 'px';
  img3.style.left = -left + 'px';
  img3.style.clip = "rect("+top+"px "+right+"px "+bottom+"px "+left+"px)";
}
//获取元素相对于屏幕左边的距离
function getElementLeft(ele){
  var actualLeft = ele.offsetLeft;
  var parent = ele.offsetParent;
  while(parent !== null){
    actualLeft += parent.offsetLeft;
    parent = parent.offsetParent;
  }
  return actualLeft;
}
//获取元素相对于屏幕上边的距离
function getElementTop(ele){
  var actualTop = ele.offsetTop;
  var parent = ele.offsetParent;
  while(parent !== null){
    actualTop += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return actualTop;
}
