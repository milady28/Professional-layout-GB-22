"use strict";

const basketBtn = document.querySelector(".header__basket-btn");
const basketBlock = document.querySelector(".header__basket-wrap");
const basketCounter = document.querySelector(".basket-counter");
const basketTotalPrice = document.querySelector(".basket__total-price");
const basket = {};

/**
 * Функция обработчик клика на значок корзины
 */
basketBtn.addEventListener("click", () => {
  basketBlock.classList.toggle("active");

  window.addEventListener('click', function (e) {
    if (!document.querySelector('.header__basket').contains(e.target) 
      && basketBlock.classList.contains("active")) {
      basketBlock.classList.toggle("active");
    }
  });
});

/**
 * Функция обработчик клика на кнопке "Добавить в корзину"
 */
document.querySelector(".products__list").addEventListener("click", (e) => {
  if (!e.target.classList.contains("products__add2cart")) {
    return;
  }

  const prodItemEl = e.target.closest('.products__item');
  const id = Number(prodItemEl.dataset.id);
  const name = prodItemEl.dataset.name;
  const price = Number(prodItemEl.dataset.price);

  addToBasket(id, name, price);
});

/**
 * Функция добавляет продукт в корзину
 * @param {number} id - Id продукта.
 * @param {string} name - Название продукта.
 * @param {number} price - Цена продукта.
 */
function addToBasket(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id: id, name: name, price: price, count: 0};
  } 

  basket[id].count++;

  basketCounter.textContent = updateBasketCounter();
  updateBasketCounter();

  basketTotalPrice.textContent = updateBasketTotalPrice().toFixed(2);
  renderProductInfo(id);
}

/**
 * Функция возвращает количество товаров в корзине
 * @return {number} - Количество товаров в корзине
 */
function updateBasketCounter() {
  return Object.keys(basket).length;
}

/**
 * Функция возвращает общую стоимость товаров в корзине
 * @return {number} - общая сумма товаро в корзине
 */
function updateBasketTotalPrice() {
  return Object
    .values(basket)
    .reduce((prod1, prod2) => { return prod1 + prod2.price * prod2.count; }, 0);
}

/**
 * Отрисовывает в корзине информацию о товаре
 * @param {number} productId - Id продукта
 */
function renderProductInfo(productId) {
  const basketRow = basketBlock.querySelector(`.basket__prod-row[data-id="${productId}"]`);

  if (!basketRow) {
    renderNewProductInfo(productId);
    return;
  }

  const product = basket[productId];
  basketRow.querySelector('.basket__prod-count').textContent = product.count;
  basketRow
    .querySelector('.basket__prod-total-price')
    .textContent = (product.price * product.count).toFixed(2);
}

/**
 * Функция отрисовывает новый товар в корзине
 * @param {number} productId - Id товара
 */
function renderNewProductInfo(productId) {
  const productRow = `
    <tr class="basket__prod-row" data-id="${productId}">
      <td>${basket[productId].name}</td>
      <td>
        <span class="basket__prod-count">${basket[productId].count}</span> шт.
      </td>
      <td>$${basket[productId].price}</td>
      <td>
        $<span class="basket__prod-total-price">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </td>
    </tr>
    `;
  basketBlock.querySelector("table").insertAdjacentHTML("beforeend", productRow);
}

