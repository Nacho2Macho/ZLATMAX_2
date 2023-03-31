const productCard = document.querySelector(".product-card");
const catalog = document.querySelector(".catalog");

function onCartCounter(event) {
  const cardElement = event.target.closest(".cart-item");

  const productId = cardElement
    ? parseInt(cardElement.getAttribute("data-id"))
    : undefined;
  const productInfo = getFavoriteById(productId);
  if (!productId || !productInfo) return;

  const action = event.target.dataset.action;

  if (action === "plus")
    favoriteSetCountById(productId, productInfo.counter + 1);
  else if (action === "minus")
    favoriteSetCountById(productId, productInfo.counter - 1);

  if (action) {
    renderFavorites();
  }

  if (productInfo.counter <= 0) {
    removeFromFavoritesProductById(productId);
  }
}

// Добавляем прослушку на всем окне
catalog.addEventListener("click", function (event) {
  const counterWrapper = event.target.closest(".actions-product__quantity");
  // Находим див с числом счетчика
  const counter = counterWrapper?.querySelector("[data-counter]");
  if (!counter) return;
  const action = event.target.dataset.action;
  let count = parseInt(counter.innerText);
  action === "plus" ? count++ : count--;

  if (count < 1) return;
  counter.innerText = count;
});

productCard.addEventListener("click", function (event) {
  // Объявляем переменную для счетчика
  onCartCounter(event);

  //   let counter;
  //   // Проверяем клик строго по кнопкам Плюс либо Минус
  //   if (
  //     event.target.dataset.action === "plus" ||
  //     event.target.dataset.action === "minus"
  //   ) {
  //     // Находим обертку счетчика
  //     const counterWrapper = event.target.closest(".actions-product__quantity");
  //     // Находим див с числом счетчика
  //     counter = counterWrapper.querySelector("[data-counter]");
  //   }
  //   // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
  //   if (event.target.dataset.action === "plus") {
  //     counter.innerText = ++counter.innerText;
  //   }
  //   // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  //   if (event.target.dataset.action === "minus") {
  //     // Проверяем чтобы счетчик был больше 1
  //     if (parseInt(counter.innerText) > 1) {
  //       // Изменяем текст в счетчике уменьшая его на 1
  //       counter.innerText = --counter.innerText;
  //     } else if (
  //       event.target.closest(".cart-wrapper") &&
  //       parseInt(counter.innerText) === 1
  //     ) {
  //   const productId = event.target
  //     .closest(".cart-item")
  //     .getAttribute("data-id");
  //       // Проверка на товар который находится в корзине
  //       console.log("IN CART!!!!");
  //       // Удаляем товар из корзины
  //       removeFromFavoritesProductById(productId);
  //       // Отображение статуса корзины Пустая / Полная
  //       toggleCartStatus();
  //       // Пересчет общей стоимости товаров в корзине
  //     //   calcCartPriceAndDelivery();
  //     }
  //   }
  //   // Проверяем клик на + или - внутри коризины
  //   if (
  //     event.target.hasAttribute("data-action") &&
  //     event.target.closest(".cart-wrapper")
  //   ) {
  //     // Пересчет общей стоимости товаров в корзине
  //     calcCartPriceAndDelivery();
  //   }
});
