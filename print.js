var canvas = document.getElementById("can");

var od = document.getElementsByClassName("content")[0];
canvas.setAttribute("width", od.clientWidth + "px");
canvas.setAttribute("height", od.clientHeight - 3 + "px");
var og = canvas.getContext("2d");
var oc = document.getElementById("app");
var canvas_width = document.getElementById("canvas_width");
canvas_width.innerText = canvas.width;
var canvas_height = document.getElementById("canvas_height");
canvas_height.innerText = canvas.height;
og.fillStyle = "#fff";
og.fillRect(0, 0, canvas.width, canvas.height);
var ioStatus = "print"; //输入状态
var earse_size = 0;
var earse_mask = document.getElementsByClassName("earse_mask")[0];
oc.onmousedown = function (ev) {
  var ev = ev || event;
  var contentScroll = {
    top: od.scrollTop,
    left: od.scrollLeft
  };
  og.beginPath(); //这样才能不整体换颜色
  var og_x = ev.clientX - oc.offsetLeft - 9 + contentScroll.left;
  var og_y = ev.clientY - od.offsetTop - 8 + contentScroll.top;
  og.moveTo(og_x, og_y);
  if (ioStatus == "earser") {
    earse_mask.style.display = "block";
    earse_mask.style.width = earse_size + "px";
    earse_mask.style.height = earse_size + "px";
    var nextL = og_x - earse_size / 2;
    var nextR = og_y - earse_size / 2;
    isOverBorder(od, earse_mask, nextL, nextR);
    //判断是否越界

  } else {
    earse_mask.style.display = "none";
  }
  document.onmousemove = function (ev) {
    var ev = ev || event;
    var contentScroll = {
      top: od.scrollTop,
      left: od.scrollLeft
    };
    var og_x = ev.clientX - oc.offsetLeft - 9 + contentScroll.left;
    var og_y = ev.clientY - od.offsetTop - 8 + contentScroll.top;
    if (ioStatus == "print") {
      og.lineTo(og_x, og_y);
      og.stroke();
    } else {
      og.fillStyle = "#fff";
      var nextL = og_x - earse_size / 2;
      var nextR = og_y - earse_size / 2;
      //判断是否越界
      isOverBorder(od, earse_mask, nextL, nextR);
      og.fillRect(og_x - earse_size / 2, og_y - earse_size / 2, earse_size, earse_size);

    }
  };

  document.onmouseup = function () {
    document.onmousedown = document.onmousemove = null;
  };
};
//判断是否越界
function isOverBorder(borderObj, sonObj, nextL, nextY) {
  var s = sonObj,
    b = borderObj;
  var borderObj = {
    w: borderObj.clientWidth,
    h: borderObj.clientHeight,
    r: borderObj.clientWidth,
    b: borderObj.clientHeight
  }; //clientHeight 仅为content宽度
  var sonObj = {
    w: sonObj.offsetWidth,
    h: sonObj.offsetHeight,
    l: nextL,
    r: nextL + sonObj.offsetWidth,
    t: nextY,
    b: nextY + sonObj.offsetHeight
  };
  //上
  if (sonObj.t < 0) {
    nextY = 0;
  }
  //下
  if (sonObj.b > borderObj.b) {
    nextY = borderObj.h - sonObj.h;
  }
  //左
  if (sonObj.l < 0) {
    nextL = 0;
  }
  //右
  if (sonObj.r > borderObj.r) {
    nextL = borderObj.w - sonObj.w;

  }
  s.style.left = nextL + "px";
  s.style.top = nextY + "px";
}
var pointer_x = document.getElementById("pointer_x");

var pointer_y = document.getElementById("pointer_y");
// 移动端
oc.ontouchstart = function (ev) {
  var ev = ev || event;
  var contentScroll = {
    top: od.scrollTop,
    left: od.scrollLeft
  };
  og.beginPath(); //这样才能不整体换颜色
  var og_x = ev.changedTouches[0].clientX - oc.offsetLeft - 9 + contentScroll.left;
  var og_y = ev.changedTouches[0].clientY - od.offsetTop - 8 + contentScroll.top;
  og.moveTo(og_x, og_y);
  
  if (ioStatus == "earser") {
    earse_mask.style.display = "block";
    earse_mask.style.width = earse_size + "px";
    earse_mask.style.height = earse_size + "px";
    var nextL = og_x - earse_size / 2;
    var nextR = og_y - earse_size / 2;
    isOverBorder(od, earse_mask, nextL, nextR);
    //判断是否越界
  } else {
    earse_mask.style.display = "none";
  }
  document.ontouchmove = function (ev) {
    var ev = ev || event;
    var contentScroll = {
      top: od.scrollTop,
      left: od.scrollLeft
    };
    var og_x = ev.changedTouches[0].clientX - oc.offsetLeft - 9 + contentScroll.left;
    var og_y = ev.changedTouches[0].clientY - od.offsetTop - 8 + contentScroll.top;
    if (ioStatus == "print") {
      og.lineTo(og_x, og_y);
      og.stroke();
    } else {
      og.fillStyle = "#fff";
      var nextL = og_x - earse_size / 2;
      var nextR = og_y - earse_size / 2;
      //判断是否越界
      isOverBorder(od, earse_mask, nextL, nextR);
      og.fillRect(og_x - earse_size / 2, og_y - earse_size / 2, earse_size, earse_size);

    }
  };

  document.ontouchend = function () {
    document.onmousedown = document.onmousemove = null;
  };
};