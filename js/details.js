window.addEventListener("load", function () {
  var lis = document.querySelector(".params").querySelectorAll("li");
  var items = document.querySelectorAll(".item");
  for (var i = 0; i < lis.length; i++) {
    lis[i].setAttribute("index", i);
    lis[i].addEventListener("click", function () {
      for (var i = 0; i < lis.length; i++) {
        lis[i].removeAttribute("class");
        items[i].style.display = "none";
      }
      this.setAttribute("class", "current");
      var index = this.getAttribute("index");
      items[index].style.display = "block";
    });
  }
});
