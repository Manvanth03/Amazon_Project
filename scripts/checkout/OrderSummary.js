import { cart, removeFromCart, updateDeliveryOptions } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./PaymentSummary.js";

export function renderOrderSummary() {
let CartSummaryHTML = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct=getProduct(productId);

 

  let deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption=getDeliveryOption(deliveryOptionId)


  let today = dayjs();
  let deliveryDate = today.add(deliveryOption.deliveryDays, "days");

  let dateString = deliveryDate.format("dddd, MMMM D");

 
  CartSummaryHTML += `
    <div class="cart-item-container-${matchingProduct.id} js-cart-item-container" >
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="${matchingProduct.name}">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    let dateString = deliveryDate.format("dddd, MMMM D");

    let priceString =
      deliveryOption.price === 0 ? "Free" : `Rs. ${deliveryOption.price} -`;

    let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
    <div class="delivery-option" data-product-id='${matchingProduct.id}' data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" 
      ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>`;
  });
  return html;
}

document.querySelector(".order-summary").innerHTML = CartSummaryHTML;

document.querySelectorAll(".delete-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeFromCart(productId);

    let container = document.querySelector(`.cart-item-container-${productId}`);

    container.remove();

    renderPaymentSummary()
  });
});

document.querySelectorAll(".delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    let { productId, deliveryOptionId } = element.dataset;

    updateDeliveryOptions(productId, deliveryOptionId);
    renderOrderSummary()
    renderPaymentSummary()
  });
});
 }

