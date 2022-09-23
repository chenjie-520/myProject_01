//冒泡排序
function bubble() {
  for (var i = 0; i < arr.length; i++) {
    //每一轮比较的次数
    for (var j = 0; j < arr.length - i - 1; j++) {
      //判断前后两个数是否符合交换
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

//选择排序
function choose(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
}

function $(vArg) {
  //1、对参数进行区分
  switch (vArg[0]) {
    case "#": //id
      return document.getElementById(vArg.substring(1));
      break;
    case ".": //calssName
      return elementByClassName(document, vArg.substring(1));
    default:
      //2、对参数的前5个字符进行判断
      var str = vArg.substring(0, 5);
      if (str == "name=") {
        //name
        return document.getElementsByName(vArg.substring(5));
      } else {
        //tagName
        return document.getElementsByTagName(vArg);
      }
      break;
  }
}

//避免IE不支持的document.getElementsByClassName封装函数
function elementByClassName(parent, classStr) {
  //<1>找到parent下所有的元素节点
  var nodes = parent.getElementsByTagName("*");
  var result = []; //用于记录符合条件的元素节点
  for (var i = 0; i < nodes.length; i++) {
    //如果符合条件，添加到数组中
    if (nodes[i].className == classStr) {
      result.push(nodes[i]);
    }
  }
  return result;
}

//获取当前样式的兼容函数

function getStyle(elem, attr) {
  return elem.currentStyle
    ? elem.currentStyle[attr]
    : getComputedStyle(elem)[attr];
}

//显示当前时间
function showDate() {
  var d = new Date();
  var year = d.getFullYear();
  var month = (d.getMonth() + 1 + "").padStart(2, "0"); //月从0开始
  var date = d.getDate();
  var week = d.getDay(); //星期0代表周日
  var arr = ["日", "一", "二", "三", "四", "五", "六"];
  var hour = (d.getHours() + "").padStart(2, "0");
  var minute = (d.getMinutes() + "").padStart(2, "0");
  var sec = (d.getSeconds() + "").padStart(2, "0");
  var t = `${year}年${month}月${date}日 ${hour}:${minute}:${sec} 星期${arr[week]}`;
  return t;
}

function removeSpaceNode(nodes) {
  var result = []; //用来存放不是空白节点的节点
  for (var i = 0; i < nodes.length; i++) {
    //判断是否是空白节点
    if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
      continue;
    }
    result.push(nodes[i]);
  }
  return result;
}

function removeSpaceNode2(parent) {
  var nodes = parent.childNodes;
  for (var i = nodes.length - 1; i >= 0; i--) {
    if (nodes[i].nodeType == 3 && /^\s+$/.test(nodes[i].nodeValue)) {
      //删除空白节点
      parent.removeChild(nodes[i]);
    }
  }
}

//封装一个创建带文本内容的元素节点
function createElementWithTxt(tagName, txt) {
  var node = document.createElement(tagName);
  var oTxt = document.createTextNode(txt);
  node.appendChild(oTxt);
  return node;
}

//封装一个插入到指定节点之后函数
function insertAfter(newNode, oldNode) {
  //判断旧节点是否是最后一个节点
  var parent = oldNode.parentNode;
  if (oldNode == parent.lasChild) {
    //旧节点是最后一个节点，直接插入到字节点末尾
    parent.appendChild(newNode);
  } else {
    //插入到old节点的下一个节点
    parent.insertBefore(newNode, oldNode.nextSibling);
  }
}

//封装添加和移除事件的兼容函数
function addEvent(obj, type, fun) {
  if (obj.addEventListener) {
    obj.addEventListener(type, fun, false);
  } else {
    obj.attachEvent("on" + type, fun);
  }
}
function removeEvent(obj, type, fun) {
  if (obj.removeEventListener) {
    obj.removeEventListener(type, fun);
  } else {
    obj.detachEvent("on" + type, fun);
  }
}

//设置cookie
function setCookie(name, value, day) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + day);
  document.cookie = name + "=" + value + "; expires=" + oDate;
}

//获取cookie
function getCookie(name) {
  var str = document.cookie;
  var arr = str.split(";");
  for (vari = 0; i < arr.length; i++) {
    var arrl = arr[i].split("=");
    if (arr1[0] == name) {
      return arr1[1];
      console.log(getCookie("name1"));
    }
  }
}

//移除cookie
function removeCookie(name) {
  setCookie(name, 1, -1);
}

function getStyle(ele, property) {
  if (getComputedStyle) {
    return getComputedStyle(ele)[property];
  } else {
    return ele.currentStyle[property];
  }
}
function animate(obj, target, callback) {
  // 先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    // 步长值写到定时器的里面
    // 把我们步长值改为整数 不要出现小数的问题
    // var step = Math.ceil((target - obj.offsetLeft) / 10);
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    if (obj.offsetLeft == target) {
      // 停止动画 本质是停止定时器
      clearInterval(obj.timer);
      // 回调函数写到定时器结束里面
      // if (callback) {
      //     // 调用函数
      //     callback();
      // }
      callback && callback();
    }
    // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
    obj.style.left = obj.offsetLeft + step + "px";
  }, 15);
}

function animate2(ele, properties) {
  clearInterval(ele.timerID);
  ele.timerID = setInterval(function () {
    for (var property in properties) {
      var current;
      var target = properties[property];

      if (property === "opacity") {
        current = Math.round(parseFloat(getStyle(ele, "opacity")) * 100);
      } else {
        current = parseInt(getStyle(ele, property));
      }

      var speed = (target - current) / 30;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (property === "opacity") {
        ele.style.opacity = (current + speed) / 100;
      } else {
        ele.style[property] = current + speed + "px";
      }
    }
  }, 20);
}

/* 
*******************************************************************
重要，因为设置maxLength的缘故，textarea自带属性的计算方式为无论中英文都计算为一个字符，
和本文有出入，如果希望同步需要只需要切换最下方向标签内写值的方法即可（已提供）
*******************************************************************
*/

//传入参数依次为textarea的id和需要输出字数的span的id
function startMonitor(id, outId, max) {
  //给textarea附加最大字数限制
  $("#" + id + "").attr("maxLength", max);

  var EventUtil = function () {};

  EventUtil.addEventHandler = function (obj, EventType, Handler) {
    //如果是FF
    if (obj.addEventListener) {
      obj.addEventListener(EventType, Handler, false);
    }
    //如果是IE
    else if (obj.attachEvent) {
      obj.attachEvent("on" + EventType, Handler);
    } else {
      obj["on" + EventType] = Handler;
    }
  };

  if ($("#" + id + "")) {
    var target = document.getElementById(id);
    EventUtil.addEventHandler(target, "propertychange", CountChineseCharacters);
    EventUtil.addEventHandler(target, "input", CountChineseCharacters);
    //EventUtil.addEventHandler($('chaptercontent'),'keydown',CountChineseCharacters('chaptercontent'));
  }
  window.onload = CountChineseCharacters();

  function CountChineseCharacters() {
    Words = $("#" + id + "").val();
    var W = new Object();
    var Result = new Array();
    var iNumwords = 0;
    var sNumwords = 0;
    var sTotal = 0; //双字节字符;
    var iTotal = 0; //中文字符；
    var eTotal = 0; //Ｅ文字符
    var otherTotal = 0;
    var bTotal = 0;
    var inum = 0;

    for (i = 0; i < Words.length; i++) {
      var c = Words.charAt(i);
      if (c.match(/[\u4e00-\u9fa5]/)) {
        if (isNaN(W[c])) {
          iNumwords++;
          W[c] = 1;
        }
        iTotal++;
      }
    }

    for (i = 0; i < Words.length; i++) {
      var c = Words.charAt(i);
      if (c.match(/[^\x00-\xff]/)) {
        if (isNaN(W[c])) {
          sNumwords++;
        }
        sTotal++;
      } else {
        eTotal++;
      }
      if (c.match(/[0-9]/)) {
        inum++;
      }
    }
    //新浪计算方式
    //$('#' + outId + '').text(Math.ceil(sTotal + eTotal / 2)+"/"+max);
    //无论英文汉子都算一个字符方式
    $("#" + outId + "").html(sTotal + eTotal + "/" + max);
  }
}
