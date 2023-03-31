// Div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector(".cart-wrapper");
const account = document.querySelector("#Account");

let cart = [];
let favorites = [];
let deleteProducts = document.querySelector("#deleteProducts");

function onFavoritesUpdate() {
  calcCartPriceAndDelivery();
  account.innerText = favorites.reduce((acc, value) => acc + value.counter, 0);
  toggleCartStatus();
}

function renderFavoritesCart(productInfo) {
  // Собранные данные подставим в шаблон для товара в корзине
  const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
    <div class="cart-item__top">
      <div class="cart-item__img">
        <img src="img/knifes/${productInfo.imgSrc}" alt="${productInfo.title}">
      </div>
      <div class="cart-item__desc">
        <div class="cart-item__title">${productInfo.title}</div>
        <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
        <div class="product-card__actions actions-product">
          <div class="actions-product__quantity quantity">
            <div class="quantity__control" data-action="minus">-</div>
            <div class="quantity__current" data-counter="">${productInfo.counter}</div>
            <div class="quantity__control" data-action="plus">+</div>
          </div>
          <div class="product-card__price price-product">
            <div class="price-product__currency">${productInfo.price}</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  // Отобразим товар в корзине
  cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
}

function renderFavorites() {
  cartWrapper.innerHTML = "";
  favorites.forEach((item) => {
    renderFavoritesCart(item);
  });
  onFavoritesUpdate();
}

function addProductToFavorites(productInfo) {
  favorites.push(productInfo);
  renderFavorites();
}

function getFavoriteById(productId) {
  return favorites.find((item) => item.id === productId);
}

function removeFromFavoritesProductById(productId) {
  favorites = favorites.filter((item) => item.id !== productId);
  renderFavorites();
}
function favoriteSetCountById(productId, count) {
  getFavoriteById(productId).counter = count;
  renderFavorites();
}

function clearFavorites() {
  favorites = [];
  renderFavorites();
}

// Отслеживаем клик на странице
function productHandler(event) {
  if (!event.target.hasAttribute("data-cart")) return;
  // Находим карточку с товаром, внутри котрой был совершен клик
  const card = event.target.closest(".product-card");
  // Собираем данные с этого товара и записываем их в единый объект productInfo
  const productInfo = productsArray.find(
    (item) => item.id === parseInt(card.dataset.id)
  );
  if (!productInfo.counter) {
    productInfo.counter = parseInt(
      card.querySelector("[data-counter]").innerText
    );
  }

  if (!productInfo) return;
  // const productInfo = {
  //   id: parseInt(card.dataset.id),
  //   imgSrc: card.querySelector(".product-img").getAttribute("src"),
  //   title: card.querySelector(".product-card__title").innerText,
  //   itemsInBox: card.querySelector("[data-items-in-box]").innerText,
  //   weight: card.querySelector(".price-product__weight").innerText,
  //   price: card.querySelector(".price-product__currency").innerText,
  //   counter: parseInt(card.querySelector("[data-counter]").innerText),
  // };

  // Проверять если ли уже такой товар в корзине
  const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

  // Если товар есть в корзине
  if (itemInCart) {
    const counterElement = itemInCart.querySelector("[data-counter]");
    console.log(counterElement.innerText);
    favoriteSetCountById(
      productInfo.id,
      productInfo.counter +
        parseInt(card.querySelector("[data-counter]").innerText)
    );
    // productInfo.counter += parseInt(counterElement.innerText);
  } else {
    // Отобразим товар в корзине
    addProductToFavorites(productInfo);
  }
  // Сбрасываем счетчик добавленного товара на "1"
  card.querySelector("[data-counter]").innerText = "1";
  // Отображение статуса корзины Пустая / Полная
  toggleCartStatus();
  // Пересчет общей стоимости товаров в корзине
  calcCartPriceAndDelivery();
}

window.addEventListener("DOMContentLoaded", () => {
  deleteProducts.addEventListener("click", () => {
    clearFavorites();
    toggleCartStatus();
  });
  window.addEventListener("click", productHandler);
});

// window.addEventListener("click", function (event) {
//   // productHandler(event);
//   // Проверяем что клик был совершен по кнопке "Добавить в корзину"
//   if (!event.target.hasAttribute("data-cart")) return;
//   // Находим карточку с товаром, внутри котрой был совершен клик
//   const card = event.target.closest(".product-card");
//   // Собираем данные с этого товара и записываем их в единый объект productInfo
//   const productInfo = {
//     id: card.dataset.id,
//     imgSrc: card.querySelector(".product-img").getAttribute("src"),
//     title: card.querySelector(".product-card__title").innerText,
//     itemsInBox: card.querySelector("[data-items-in-box]").innerText,
//     weight: card.querySelector(".price-product__weight").innerText,
//     price: card.querySelector(".price-product__currency").innerText,
//     counter: card.querySelector("[data-counter]").innerText,
//   };
//   // Проверять если ли уже такой товар в корзине
//   const itemInCart = cartWrapper.querySelector(
//     `[data-id="${productInfo.id}"]`
//   );
//   // Если товар есть в корзине
//   if (itemInCart) {
//     const counterElement = itemInCart.querySelector("[data-counter]");
//     counterElement.innerText =
//       parseInt(counterElement.innerText) + parseInt(productInfo.counter);
//   } else {
//     // Если товара нет в корзине
//     // Собранные данные подставим в шаблон для товара в корзине
//     const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
//               <div class="cart-item__top">
//                 <div class="cart-item__img">
//                   <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
//                 </div>
//                 <div class="cart-item__desc">
//                   <div class="cart-item__title">${productInfo.title}</div>
//                   <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>
//                   <div class="product-card__actions actions-product">
//                     <div class="actions-product__quantity quantity">
//                       <div class="quantity__control" data-action="minus">-</div>
//                       <div class="quantity__current" data-counter="">${productInfo.counter}</div>
//                       <div class="quantity__control" data-action="plus">+</div>
//                     </div>
//                     <div class="product-card__price price-product">
//                       <div class="price-product__currency">${productInfo.price}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>`;
//     // Отобразим товар в корзине
//     cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
//   }
//   // Сбрасываем счетчик добавленного товара на "1"
//   card.querySelector("[data-counter]").innerText = "1";
//   // Отображение статуса корзины Пустая / Полная
//   toggleCartStatus();
//   // Пересчет общей стоимости товаров в корзине
//   calcCartPriceAndDelivery();
// });
