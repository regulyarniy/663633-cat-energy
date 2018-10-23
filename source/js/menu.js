if (document.querySelector(".page-header__button")) {
  document.querySelector(".page-header__button").classList.remove("visually-hidden");
  document.querySelector(".main-menu").classList.add("main-menu--interactive");
  document.querySelector(".main-menu").classList.add("main-menu--closed");
  document.querySelector(".page-header__button").classList.add("page-header__button--open");
  document.querySelector(".page-header__button").classList.remove("page-header__button--close");

  document.querySelector(".page-header__button").addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.classList.contains("page-header__button--open")) {
      this.classList.remove("page-header__button--open");
      this.classList.add("page-header__button--close");
      document.querySelector(".main-menu").classList.remove("main-menu--closed");
    } else {
      this.classList.add("page-header__button--open");
      this.classList.remove("page-header__button--close");
      document.querySelector(".main-menu").classList.add("main-menu--closed");
    }
  })

  window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 27 && !document.querySelector(".main-menu").classList.contains('main-menu--closed')) {
    evt.preventDefault();
    document.querySelector(".page-header__button").classList.add("page-header__button--open");
    document.querySelector(".page-header__button").classList.remove("page-header__button--close");
    document.querySelector(".main-menu").classList.add("main-menu--closed");
  };
});
}
