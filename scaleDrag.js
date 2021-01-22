function mouseDrag(objParent,fn) {//event 事件对象, objParent父元素或限制其范围的元素, fn移动时触发自定义函数
  var mouseDrag = function (event){ 
    event = e(event);
    var obj = event.target;
    if (!objParent) {
      objParent = obj.parentNode;
    }
    old_MouseInfo = getMousePos(event);
    //移动元素信息
    old_ObjInfo = getElePos(obj);
    //父级元素边界属性
    
    old_ObjParentInfo = getElePos(objParent);
    obj.onmousemove = moveLimit; // 注册鼠标移动事件处理函数
    obj.onmouseup = stop; // 注册松开鼠标事件处理函数
    obj.onmouseout = stop; // 注册松开鼠标事件处理函数
  }
  return mouseDrag;
}

function moveLimit(event) { // 鼠标移动处理函数

  var obj = event.target;
  
  var curMousePos = getMousePos(event);
  console.log(curMousePos);
  var limitObj = old_ObjParentInfo;
  var curPointerPosLeft = old_ObjInfo.offsetLeft + curMousePos.x - old_MouseInfo.x;
  var curPointerPosTop = old_ObjInfo.offsetTop + curMousePos.y - old_MouseInfo.y;

  var curPointerPosBottom = curPointerPosTop + old_ObjInfo.offsetHeight;
  var curPointerPosRight = curPointerPosLeft + old_ObjInfo.offsetWidth;

  if (curPointerPosLeft < 0) { //左边越界
    curPointerPosLeft = 0;
  }
  if (curPointerPosRight > limitObj.offsetWidth) { //右边越界
    curPointerPosLeft = limitObj.offsetWidth - old_ObjInfo.offsetWidth;
  }
  

  if (curPointerPosBottom > limitObj.offsetHeight) { //下边越界
    curPointerPosTop = limitObj.offsetHeight - old_ObjInfo.offsetHeight;
  }
  if (curPointerPosTop < 0) { //上边越界
    curPointerPosTop = 0;
  }

  obj.style.left = curPointerPosLeft + "px"; // 定义拖动元素的x轴距离
  obj.style.top = curPointerPosTop + "px"; // 定义拖动元素的y轴距离
  // fn();

}

function stop(event) { // 松开鼠标处理函数
  var obj = event.target;
  // 释放所有操作对象
  obj = obj.onmousemove = obj.onmouseup = null;

}

function getElePos(ele) {
  return {
    offsetLeft: parseFloat(ele.offsetLeft),
    offsetTop: parseFloat(ele.offsetTop),
    offsetWidth: parseFloat(ele.offsetWidth),
    offsetHeight: parseFloat(ele.offsetHeight),
    offsetRight: parseFloat(ele.offsetLeft) + parseFloat(ele.offsetWidth),
    offsetButtom: parseFloat(ele.offsetTop) + parseFloat(ele.offsetHeight)
  };
}

function getMousePos(event) {
  var mx = event.pageX || event.clientX + document.body.scrollLeft;
  // 计算鼠标指针的x轴距离
  var my = event.pageY || event.clientY + document.body.scrollTop;
  // 计算鼠标指针的y轴距离
  return {
    x: mx,
    y: my
  };
}
// 定义事件对象标准化函数
function e(event) {
  if (!event) { // 兼容IE浏览器
    event = window.event;
    event.target = event.srcElement;
    event.layerX = event.offsetX;
    event.layerY = event.offsetY;
  }
  return event; // 返回标准化的事件对象
}