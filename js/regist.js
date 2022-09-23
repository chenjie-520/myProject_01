window.addEventListener("load", function () {
  var regtel = /^1[3|4|5|7|8]\d{9}/; // 验证手机号的正则表达式
  var regqq = /^[1-9]\d{4,}/; // 验证qq号的正则表达式
  var regnc = /^[\u4e00-\u9fa5]{2,6}$/; // 验证昵称的正则表达式
  var regmsg = /^\d{6}$/; // 验证短信验证码的正则表达式
  var regpwd = /^[0-9a-zA-Z_.-]{6,16}$/; // 验证密码的正则表达式
  var tel = document.querySelector("#tel");
  var qq = document.querySelector("#qq");
  var nc = document.querySelector("#nc");
  var msg = document.querySelector("#msg");
  var pwd = document.querySelector("#pwd");
  var cfpwd = document.querySelector("#cfpwd");
  var safe = document.querySelector(".safe");
  regexp(tel, regtel);
  regexp(qq, regqq);
  regexp(nc, regnc);
  regexp(msg, regmsg);
  regexp(pwd, regpwd);

  pwd.addEventListener("keyup", function () {
    //console.log(this.value.length);
    if (this.value.length >= 6 && this.value.length <= 9) {
      safe.innerHTML = `安全程度 <em class="ruo">弱</em>`;
    } else if (this.value.length >= 10 && this.value.length <= 12) {
      safe.innerHTML = `安全程度 <em class="zhong">中</em>`;
    } else if (this.value.length >= 13) {
      safe.innerHTML = `安全程度 <em class="qiang">强</em>`;
    } else {
      safe.innerHTML = "";
    }
  });
  cfpwd.addEventListener("blur", function () {
    if (this.value == pwd.value) {
      this.nextElementSibling.className = "success";
      this.nextElementSibling.innerHTML = `<i class="success_icon"></i> `;
    } else {
      this.nextElementSibling.className = "error";
      this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 两次密码不一致`;
    }
  });

  // 表单验证函数
  function regexp(ele, reg) {
    ele.addEventListener("blur", function () {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = "success";
        this.nextElementSibling.innerHTML = `<i class="success_icon"></i> `;
      } else {
        this.nextElementSibling.className = "error";
        this.nextElementSibling.innerHTML = `<i class="error_icon"></i> 格式不正确，请从新输入`;
      }
    });
  }
});
