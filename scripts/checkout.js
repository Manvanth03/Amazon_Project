import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

let CartSummaryHTML = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  let deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  
  });

  let today = dayjs();
  let deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  

  let dateString = deliveryDate.format("dddd, MMMM D");
console.log(dateString)
  CartSummaryHTML += `
    <div class="cart-item-container-${matchingProduct.id}">
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
                  Rs. ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(productId, cartItem)}
              </div>
            </div>
          </div>
    `;
});

function deliveryOptionsHTML(productId, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    let today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, "days");

    let dateString = deliveryDate.format("dddd, MMMM D");

    let priceString =
      deliveryOption.price === 0 ? "Free" : `Rs. ${deliveryOption.price} -`;

    let isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
    <div class="delivery-option">
      <input type="radio" 
      ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${productId}">
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
  });
});
