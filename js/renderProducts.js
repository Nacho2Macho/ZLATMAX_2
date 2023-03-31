const productsContainer = document.getElementById("catalog__products");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const domElements = {
  filters: {
    color: document.getElementById("filter-color"),
    category: document.getElementById("filter-category"),
    year: document.getElementById("filter-year"),
    country: document.getElementById("filter-country"),
  },
};
let productsArray = [];
let categories = {};
// Запускаем getProducts
getProducts();
// Асинхронная функция получения данных из файла products.json
async function getProducts() {
  // Получаем данные из products.json
  const response = await fetch("./js/products.json");
  const data = await response.json();
  categories = data.category;
  // Парсим данные из JSON формата в JS
  productsArray = data.data;
  // Запускаем ф-ю рендера (отображения товаров)
  renderProducts(productsArray);
  // debugger;
}

function renderProducts(renderData) {
  productsContainer.innerHTML = "";
  renderData.forEach(function (item) {
    const productHTML = `<article class="product-card" data-id="${item.id}">
							<img class="product-img" src="img/knifes/${item.imgSrc}" alt="">
							<div class="product-card__body">
								<h4 class="product-card__title">${item.title}</h4>
								<p><small data-items-in-box class="text-muted">${
                  item.itemsInBox
                } шт.</small></p>								
								<div class="product-card__actions actions-product">
									<!-- Счетчик -->
									<div class="actions-product__quantity quantity">
									<div class="quantity__control" data-action="minus">-</div>
									<div class="quantity__current" data-counter>1</div>
									<div class="quantity__control" data-action="plus">+</div>
									</div>
									<!-- // Счетчик -->
									<div class="product-card__price price-product">
										<div class="price-product__weight">${item.weight}г.</div>
										<div class="price-product__currency">${item.price} ₽</div>
									</div>
								</div>
                <div class="card__param">
                <label for="">Год</label>
                <div id="year">${item.params.year}</div>
               </div>
               <div  class="card__param">
                <label for="">Цвет</label>
                <div id="color">${item.params.color}</div>
               </div>
               <div class="card__param">
                <label for="">Страна</label>
                <div id="country">${item.params.country}</div>
               </div>
               <div class="card__param">
                <label for="">Категория</label>
                <div id="tec">${categories[item.params.category]}</div>
               </div>
								<button data-cart type="button" class="button">
									+ в корзину
								</button>
							</div>
						</article>`;
    productsContainer.insertAdjacentHTML("beforeend", productHTML);
  });

  let searchValue = "";
  searchInput.oninput = (event) => {
    searchValue = event.target.value;
    filterSearch();
  };

  searchButton.onclick = () => {
    filterSearch();
  };

  function filterSearch() {
    const rgx = new RegExp(searchValue, "i");
    let filteredCardsData = productsArray.filter((card) =>
      rgx.test(card.title)
    );

    renderProducts(filteredCardsData);
  }
  

  // Функция фильтрации товаров по списку параметров
  const filtersType = ["category", "color", "year", "country"];
  // отслеживание изменени фильтров и фильтрация
  filtersType.forEach((type) => handleChangeFilter(type));
  //Отслеживание изменений значений фильтров
  function handleChangeFilter(type) {
    domElements.filters[type].onchange = (event) => {
      const value = event.target.value;
      let filteredCards = productsArray;

      if (type === "category") {
        filteredCards = filterCards(type, value, filteredCards);
      }
      filteredCards = checkOtherFilters(filtersType, filteredCards, type);
      renderProducts(filteredCards);
    };
  }
  // Функция фильтрации карточек по фильтру
  function filterCards(filterType, value, cards) {
    if (!value) {
      return productsArray;
    }
    return cards.filter((card) => categories[card.params.category] == value);
  }

  // Фильтрация по значениям соседних фильтров
  function checkOtherFilters(filtersType, filteredCards, extraFilterType) {
    const filters = {};
    filtersType.forEach((type) => {
      if (type === "category") return;
      filters[type] = domElements.filters[type].value;
    });

    filteredCards = filteredCards.filter((item) => {
      let compare = [];

      Object.entries(filters).forEach(([key, value]) => {
        if (!value) return;
        compare.push(item.params[key] == value);
      });

      if (!compare.length) return true;
      return compare.reduce((prev, next) => prev && next);
    });
    return filteredCards;
  }
}
