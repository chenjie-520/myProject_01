$(function () {
  // 1. 全选 全不选功能模块
  // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
  // 事件可以使用change
  $(".checkall").change(function () {
    // console.log($(this).prop("checked"));
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    if ($(this).prop("checked") == true) {
      $(".cart-item").addClass("check-cart-item");
    } else {
      $(".cart-item").removeClass("check-cart-item");
    }
    getSum();
  });
  // 2. 如果小复选框被选中的个数等于小复选框的全部个数 就应该把全选按钮选上，否则全选按钮不选。
  $(".j-checkbox").change(function () {
    //console.log($(".j-checkbox:checked").length);
    //console.log($(".j-checkbox").length);
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
    if ($(this).prop("checked") == true) {
      $(this).parents(".cart-item").addClass("check-cart-item");
    } else {
      $(this).parents(".cart-item").removeClass("check-cart-item");
    }
    getSum();
  });
  // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
  $(".increment").click(function () {
    // console.log($(this).siblings(".itxt").val());
    var num = $(this).siblings(".itxt").val();
    num++;
    $(this).siblings(".itxt").val(num);

    // 定义单价
    //console.log($(this).parents(".p-num").siblings(".p-price"));
    //console.log($(this).parents(".p-num").siblings(".p-price").html().substr(1));
    var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (price * num).toFixed(2));
    getSum();
  });
  // 4. 增减商品数量模块 首先声明一个变量,当我们点击-号（decrement），就让这个值--，然后赋值给文本框。
  $(".decrement").click(function () {
    // console.log($(this).siblings(".itxt").val());
    var num = $(this).siblings(".itxt").val();
    if (num == 1) {
      return false;
    }
    num--;
    $(this).siblings(".itxt").val(num);
    var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (price * num).toFixed(2));
    getSum();
  });
  //  5. 用户修改文本框的值 计算 小计模块
  $(".itxt").change(function () {
    var value = $(this).val();
    var price = $(this).parents(".p-num").siblings(".p-price").html().substr(1);
    $(this)
      .parents(".p-num")
      .siblings(".p-sum")
      .html("￥" + (price * value).toFixed(2));
    getSum();
  });
  // 6. 计算总计和总额模块
  function getSum() {
    var count = 0; //总件数
    var money = 0; //总价
    $(".j-checkbox").each(function (i, e) {
      //console.log(e);
      if ($(e).prop("checked") == true) {
        //选中的商品的总数 total
        var total = parseInt(
          $(e)
            .parents(".p-checkbox")
            .siblings(".p-num")
            .children(".quantity-form")
            .children(".itxt")
            .val()
        );
        //console.log(total);
        count += total;
        //选中的商品的总价 total unit price  简写 tuprice
        var tuprice = parseFloat(
          $(e).parents(".p-checkbox").siblings(".p-sum").html().substr(1)
        );
        // console.log(singletotal);
        money += tuprice;
      }
    });
    // $(".itxt").each(function (i, e) {
    //   count += parseInt($(e).val());
    // });
    $(".amount-sum em").html(count);
    // $(".p-sum").each(function (i, e) {
    //   //console.log($(e).html());
    //   //console.log(parseFloat($(e).html().substr(1)));
    //   money += parseFloat($(e).html().substr(1));
    //   //console.log(money);
    // });
    $(".price-sum em").html(`￥${money.toFixed(2)}`);
  }
  getSum();
  // 7. 删除商品模块
  // (1) 商品后面的删除按钮
  $(".p-action a").click(function () {
    $(this).parents(".cart-item").remove();
    getSum();
  });
  // (2) 删除选中的商品
  $(".remove-batch").click(function () {
    $(".j-checkbox:checked").parents(".cart-item").remove();
    getSum();
  });

  // (3) 清空购物车 删除全部商品
  $(".clear-all").click(function () {
    $(".cart-item-list").remove();
    getSum();
  });
});
