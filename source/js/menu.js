(function () {
  if (document.querySelector(".page-header__button")) {
    var menuToogle = document.querySelector(".page-header__button"),
      menu = document.querySelector(".main-menu"),
      toggleOpenClass = "page-header__button--open",
      toggleCloseClass = "page-header__button--close",
      menuClosedClass = "main-menu--closed";

    menuToogle.classList.remove("visually-hidden");
    menu.classList.add("main-menu--interactive");
    menu.classList.add(menuClosedClass);
    menuToogle.classList.add(toggleOpenClass);
    menuToogle.classList.remove(toggleCloseClass);

    menuToogle.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (menuToogle.classList.contains(toggleOpenClass)) {
        menuToogle.classList.remove(toggleOpenClass);
        menuToogle.classList.add(toggleCloseClass);
        menu.classList.remove(menuClosedClass);
      } else {
        menuToogle.classList.add(toggleOpenClass);
        menuToogle.classList.remove(toggleCloseClass);
        menu.classList.add(menuClosedClass);
      }
    })
  }
}());
