(function(){
  var list = document.getElementById("list");
  const num = 20;//每次增加的数目
  var current = 0;
  var isAddItem = false;//是否正处于添加项目阶段
  init();
  function init(){
    render();
    window.addEventListener('scroll',function(){
      var totalHeight = document.documentElement.scrollHeight;//页面总高度
      var scrollTop = document.documentElement.scrollTop;//隐藏在上部的高度
      var clientHeight = document.documentElement.clientHeight;//视口区高度
      var bottom = totalHeight-scrollTop-clientHeight;
      if(bottom < 100){
        render();
      }
    })
  }
  //使用promise模拟从后端获取数据
  function getData(){
    return new Promise(function(resolve,reject){
      setTimeout(function(){
        var data = [];
        for(var i=current;i<current+num;i++){
          data.push('item'+(i+1));
        }
        resolve(data);
      },3000);
    })
  }
  function render(){
    if(!isAddItem){
      isAddItem = true;
      getData(num,current).then(function(data){
        var block = document.createDocumentFragment();
        data.forEach(function(item){
          var li = document.createElement('li');
          li.innerText = item;
          block.appendChild(li);
        })
        list.appendChild(block);
        current += num;
        isAddItem = false;
      }).catch(function(err){
        console.log(err);
      })
    }
  }
})();
