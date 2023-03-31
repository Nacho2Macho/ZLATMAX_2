tippy("[data-tippy-content]");
let accordions = document.querySelectorAll(".phones-header__item");
for (let i = 0; i < accordions.length; i++) {
  accordions[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content === null) {
      return false;
    }
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
document.addEventListener("click", documentActions);
const menuBlocks = document.querySelectorAll(".sub-menu-catalog__block");
if (menuBlocks.length) {
  menuBlocks.forEach((menuBlock) => {
    const menuBlockItems = menuBlock.querySelectorAll(
      ".sub-menu-catalog__category"
    ).length;
    menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
  });
}
function documentActions(e) {
  const targetElement = e.target;
  if (targetElement.closest("[data-parent]")) {
    const subMenuId = targetElement.dataset.parent
      ? targetElement.dataset.parent
      : null;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);
    if (subMenu) {
      const activeLink = document.querySelector("._sub-menu-active");
      const activeBlock = document.querySelector("._sub-menu-open");

      if (activeLink && activeLink !== targetElement) {
        activeLink.classList.remove("_sub-menu-active");
        activeBlock.classList.remove("_sub-menu-open");
        document.documentElement.classList.remove("sub-menu-open");
      }
      document.documentElement.classList.toggle("sub-menu-open");
      targetElement.classList.toggle("_sub-menu-active");
      subMenu.classList.toggle("_sub-menu-open");
    } else {
      console.log("Ой ой, нет такого подменю :");
    }
    e.preventDefault();
  }
  if (targetElement.closest(".menu-top-header__link_catalog")) {
    document.documentElement.classList.add("catalog-open");
    e.preventDefault();
  }
  if (targetElement.closest(".menu-catalog__back")) {
    document.documentElement.classList.remove("catalog-open");
    document.querySelector("._sub-menu-active")
      ? document
          .querySelector("._sub-menu-active")
          .classList.remove("_sub-menu-active")
      : null;
    document.querySelector("._sub-menu-open")
      ? document
          .querySelector("._sub-menu-open")
          .classList.remove("_sub-menu-open")
      : null;
    e.preventDefault();
  }
  if (targetElement.closest(".sub-menu-catalog__back")) {
    document.documentElement.classList.remove("sub-menu-open");
    document.querySelector("._sub-menu-active")
      ? document
          .querySelector("._sub-menu-active")
          .classList.remove("_sub-menu-active")
      : null;
    document.querySelector("._sub-menu-open")
      ? document
          .querySelector("._sub-menu-open")
          .classList.remove("_sub-menu-open")
      : null;
    e.preventDefault();
  }
}
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu) {
  const menuBody = document.querySelector(".menu__body");
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    const findClassAndDel = (cl) => {
      const elem = document.querySelector(`.${cl}`);
      elem && elem.classList.remove(cl);
    };
    findClassAndDel("catalog-open");
    findClassAndDel("sub-menu-open");
  });
}
new Swiper(".swiper", {
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 40,
  speed: 800,
  parallax: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  on: {
    init: function (swiper) {
      const allSlides = document.querySelector(".fraction-controll__all");
      const allSlidesItems = document.querySelectorAll(
        ".slide-main-block:not(.swiper-slide-duplicate)"
      );
      allSlides.innerHTML =
        allSlidesItems.length < 10
          ? `0${allSlidesItems.length}`
          : allSlidesItems.length;
    },
    slideChange: function (swiper) {
      const currentSlide = document.querySelector(
        ".fraction-controll__current"
      );
      currentSlide.innerHTML =
        swiper.realIndex + 1 < 10
          ? `0${swiper.realIndex + 1}`
          : swiper.realIndex + 1;
    },
  },
});
if (document.querySelector(".products-slider")) {
  new Swiper(".products-slider__slider", {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 30,
    speed: 800,
    loop: true,
    parallax: true,
    pagination: {
      el: ".product-slider__dotts",
      clickable: true,
      type: "bullets",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1370: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });
}
if (document.querySelector(".products-new")) {
  new Swiper(".products-new__slider", {
    observer: true,
    observeParents: true,
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    pagination: {
      el: ".product-new__dotts",
      clickable: true,
      type: "bullets",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      1330: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  });
}
const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
  initRatings();
}
function initRatings() {
  let ratingActive, ratingValue;
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();
    if (rating.classList.contains("rating_set")) {
      setRating(rating);
    }
  }

  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }
  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }
  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(".rating__item");
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];

      ratingItem.addEventListener("mouseenter", function (e) {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating);
        } else {
          ratingValue.innerHTML = index + 1;
          setRatingActiveWidth();
        }
      });
    }
  }
}
const spollersArray = document.querySelectorAll("[data-spollers]");
if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return !item.dataset.spollers.split(",")[0];
  });
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }

  const spollersMedia = Array.from(spollersArray).filter(function (
    item,
    index,
    self
  ) {
    return item.dataset.spollers.split(",")[0];
  });

  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach((item) => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });

    let mediaQueries = breakpointsArray.map(function (item) {
      return (
        "(" +
        item.type +
        "-width: " +
        item.value +
        "px)," +
        item.value +
        "," +
        item.type
      );
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });

    mediaQueries.forEach((breakpoint) => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);

      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });

      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
  function initSpollers(spollersArray, matchMedia = false) {
    spollersArray.forEach((spollersBlock) => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add("_init");
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove("_init");
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }
  function initSpollerBody(spollersBlock, hideSpollerBody = true) {
    const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
    if (spollerTitles.length > 0) {
      spollerTitles.forEach((spollerTitle) => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute("tabindex");
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute("tabindex", "-1");
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
      const spollerTitle = el.hasAttribute("data-spoller")
        ? el
        : el.closest("[data-spoller]");
      const spollersBlock = spollerTitle.closest("[data-spollers]");
      const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
        ? true
        : false;
      if (!spollersBlock.querySelectorAll("._slide").length) {
        if (oneSpoller && !spollerTitle.classList.contains("_active")) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle("_active");
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }

  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector(
      "[data-spoller]._active"
    );
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove("_active");
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}
let _slideUp = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty("");
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideDown = (target, duration = 500) => {
  if (!target.classList.contains("_slide")) {
    target.classList.add("_slide");
    if (target.hidden) {
      target.hidden = false;
    }
    let height = target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
      target.style.removeProperty("height");
      target.style.removeProperty("overflow");
      target.style.removeProperty("transition-duration");
      target.style.removeProperty("transition-property");
      target.classList.remove("_slide");
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// let popupBg = document.querySelector(".popup__bg"); // Фон попап окна
// let popup = document.querySelector(".popup"); // Само окно
// let openPopupButtons = document.querySelectorAll(".top-header__user"); // Кнопки для показа окна
// let closePopupButton = document.querySelector(".close-popup"); // Кнопка для скрытия окна
// openPopupButtons.forEach((button) => {
//   // Перебираем все кнопки
//   button.addEventListener("click", (e) => {
//     // Для каждой вешаем обработчик событий на клик
//     e.preventDefault(); // Предотвращаем дефолтное поведение браузера
//     popupBg.classList.add("active"); // Добавляем класс 'active' для фона
//     popup.classList.add("active"); // И для самого окна
//     document.body.classList.toggle("_close");
//   });
// });
// closePopupButton.addEventListener("click", () => {
//   // Вешаем обработчик на крестик
//   popupBg.classList.remove("active"); // Убираем активный класс с фона
//   popup.classList.remove("active"); // И с окна
//   document.body.classList.remove("_close");
// });
// document.addEventListener("click", (e) => {
//   // Вешаем обработчик на весь документ
//   if (e.target === popupBg) {
//     // Если цель клика - фот, то:
//     popupBg.classList.remove("active"); // Убираем активный класс с фона
//     popup.classList.remove("active"); // И с окна
//     document.body.classList.remove("_close");
//   }
// });
// const form = {
//   email: document.getElementById("Email"),
//   password: document.getElementById("Password"),
//   button: document.querySelector(".button"),
// };
// function handleInput(e, name) {
//   const { value } = e.target;
//   if (value) {
//     form[name].classList.add("filed");
//   } else {
//     form[name].classList.remove("filed");
//   }
// }

// form.email.oninput = (e) => handleInput(e, "email");
// form.password.oninput = (e) => handleInput(e, "password");
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault;
    });
  }
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper") + "px";
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = "px";
    }
    body.style.paddingRight = "px";
    body.classList.remove("lock");
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});
const form = {
  email: document.getElementById("Email"),
  password: document.getElementById("Password"),
  text: document.getElementById("Name"),
  mail: document.getElementById("email"),
  Password: document.getElementById("password"),
  Pasword: document.getElementById("conf_password"),
  button: document.getElementById("button"),
  Button: document.getElementById("button-create"),
  error: document.querySelector(".form__error"),
  eror: document.querySelector(".form__erro"),
  erorr: document.querySelector(".form__err"),
  ero: document.querySelector(".form__er"),
  er: document.querySelector(".form__e"),
};
function checkForm() {
  const email = form.email.getElementsByTagName("input")[0].value;
  const password = form.password.getElementsByTagName("input")[0].value;

  const mail = form.mail.getElementsByTagName("input")[0].value;
  const Password = form.Password.getElementsByTagName("input")[0].value;
  const Pasword = form.Pasword.getElementsByTagName("input")[0].value;

  if (email && password) {
    form.button.classList.remove("disabled");
  } else {
    form.button.classList.add("disabled");
  }
  if(mail && Password && Pasword){
    form.Button.classList.remove("disabled");
  }
  else {
    form.Button.classList.add("disabled");
  }
}
function handleInput(e, name) {
  const { value } = e.target;
  if (value) {
    form[name].classList.add("filed");
  } else {
    form[name].classList.remove("filed");
  }
  checkForm();
}
function deleteError() {
  form.email.classList.remove("error");
  form.error.classList.remove("view");
  form.mail.classList.remove("error");
  form.eror.classList.remove("view");
}
function validateEmail() {
  const emailValue = form.email.getElementsByTagName("input")[0].value;
  const mailValue = form.mail.getElementsByTagName("input")[0].value;
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!reg.test(emailValue )) {
    form.button.classList.add("disabled");
    form.email.classList.add("error");
    form.eror.classList.add("view");
    return
  } else {
    alert("Вы вошли");
    deleteError();
  }
  if(!reg.test(mailValue )){
    form.Button.classList.add("disabled");
    form.mail.classList.add("error");
    form.eror.classList.add("view");
  }
  else {
    alert("Вы вошли");
    deleteError();
  }
}
form.email.oninput = (e) => handleInput(e, "email");
form.password.oninput = (e) => handleInput(e, "password");
form.text.oninput = (e) => handleInput(e, "text");
form.mail.oninput = (e) => handleInput(e, "mail");
form.Password.oninput = (e) => handleInput(e, "Password");
form.Pasword.oninput = (e) => handleInput(e, "Pasword");
form.button.onclick = validateEmail;
form.Button.onclick = validateEmail;
form.email.getElementsByTagName("input")[0].onblur = validateEmail;
form.email.getElementsByTagName("input")[0].onfocus = deleteError;
form.mail.getElementsByTagName("input")[0].onblur = validateEmail;
form.mail.getElementsByTagName("input")[0].onfocus = deleteError;

function showHidePasswor(target,e){
  let input = document.getElementById(e);
  
  if (input.getAttribute("type") == "password") {
    target.classList.add("view");
    input.setAttribute("type", "text");
  } 
  else {
    target.classList.remove("view");
    input.setAttribute("type", "password");
  }
  return false;
}

// function showHidePassword(target) {

  // let input = document.getElementById("password-input");
  
  // if (input.getAttribute("type") == "password") {
  //   target.classList.add("view");
  //   input.setAttribute("type", "text");
  // } 
  // else {
  //   target.classList.remove("view");
  //   input.setAttribute("type", "password");
  // }
  // return false;
// }
// function showHidePasswor(target) {

//   let input = document.getElementById("passwor-input");
  
//   if (input.getAttribute("type") == "password") {
//     target.classList.add("view");
//     input.setAttribute("type", "text");
//   } 
//   else {
//     target.classList.remove("view");
//     input.setAttribute("type", "password");
//   }
//   return false;
// }

