window.addEventListener("load", function () {
  // 1. 获取元素
  var arrow_l = document.querySelector(".arrow_l");
  var arrow_r = document.querySelector(".arrow_r");
  var focus = document.querySelector(".focus");
  var focusWidth = focus.offsetWidth;
  // 2. 鼠标经过focus 就显示隐藏左右按钮
  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    timer = null; // 清除定时器变量
  });
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });
  // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement("li");
    // 记录当前小圆圈的索引号 通过自定义属性来做
    li.setAttribute("index", i);
    ol.appendChild(li);
    li.addEventListener("click", function () {
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      this.className = "current";
      // 5. 点击小圆圈，移动图片 当然移动的是 ul
      // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
      // 当我们点击了某个小li 就拿到当前小li 的索引号
      var index = this.getAttribute("index");
      num = circle = index;
      animate(ul, -index * focusWidth);
    });
  }

  //  把ol里面的第一个小li设置类名为 current
  ol.children[0].className = "current";
  // 6. 克隆第一张图片(li)放到ul 最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 7. 点击右侧按钮， 图片滚动一张
  var num = 0;
  var circle = 0;
  // flag 节流阀
  var flag = true;

  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false; // 关闭节流阀
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle++;
      if (circle == ol.children.length) {
        circle = 0;
      }
      circleChange();
    }
  });

  // 9. 左侧按钮做法
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle--;
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circleChange();
    }
  });
  function circleChange() {
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    ol.children[circle].className = "current";
  }

  // 10. 自动播放轮播图
  var timer = setInterval(() => {
    arrow_r.click();
  }, 2000);

  var flag = true;
  function toggleTool() {
    if ($(window).scrollTop() > $(".recommend").offset().top) {
      $(".fixedtool").stop().fadeIn();
    } else {
      $(".fixedtool").stop().fadeOut();
    }
  }
  toggleTool();
  $(window).scroll(function () {
    toggleTool();
    if (flag) {
      $(".floor .w").each(function (i, ele) {
        if ($(window).scrollTop() >= $(ele).offset().top) {
          $(".fixedtool li")
            .eq(i)
            .addClass("current")
            .siblings()
            .removeClass("current");
        }
      });
    }
  });

  $(".fixedtool li").click(function () {
    flag = false;
    $(this).addClass("current").siblings().removeClass("current");
    var current = $(".floor .w").eq($(this).index()).offset().top;
    $("html,body")
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          flag = true;
        }
      );
  });
});
