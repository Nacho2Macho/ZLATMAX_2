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
const rangeSlider = document.getElementById("range-slider");
if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [500, 999999],
    connect: true,
    tooltips: [false, true],
    step: 1,
    range: {
      min: [500],
      max: [20000],
    },
  });

  const input0 = document.getElementById("input-0");
  const input1 = document.getElementById("input-1");
  const inputs = [input0, input1];

  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    console.log(arr);

    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach((el, index) => {
    el.addEventListener("change", (e) => {
      console.log(index);
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
if (document.querySelector(".thumbs-images")) {
  const thumbsSwiper = new Swiper(".thumbs-images", {
    observer: true,
    observeParents: true,
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 800,
    pagination: {
      el: ".product-new__dotts",
      clickable: true,
      type: "bullets",
    },
    breakpoints: {
      1330: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });
  new Swiper(".images-product__slider", {
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}
const select2 = new ItcCustomSelect("#select-2", {
  name: "car", // значение атрибута name у кнопки
  options: [
    ["popular", "По популярности"],
    ["price", "По цене"],
    ["type", "По типу"],
    ["category", "По категории"],
  ], // опции
});
const select3 = new ItcCustomSelect("#select-3", {
  name: "car", // значение атрибута name у кнопки
  options: [
    ["popular", "По популярности"],
    ["price", "По цене"],
    ["type", "По типу"],
    ["category", "По категории"],
  ], // опции
});
const select4 = new ItcCustomSelect("#select-4", {
  name: "car", // значение атрибута name у кнопки
  options: [
    ["popular", "По популярности"],
    ["price", "По цене"],
    ["type", "По типу"],
    ["category", "По категории"],
  ], // опции
});
const select5 = new ItcCustomSelect("#select-5", {
  name: "car", // значение атрибута name у кнопки
  options: [
    ["popular", "По популярности"],
    ["price", "По цене"],
    ["type", "По типу"],
    ["category", "По категории"],
  ], // опции
});
