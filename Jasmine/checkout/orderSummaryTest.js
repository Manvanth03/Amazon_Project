import { renderOrderSummary} from "../../scripts/checkout/OrderSummary.js"
import { loadFromStorage,cart } from "../../data/cart.js";

describe("test suite: renderOrderSummary", () => {
    let productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    let productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d'
    beforeEach(() => {
        spyOn(localStorage,'setItem')

    document.querySelector(".js-test-container").innerHTML = `
        <div class="order-summary"></div>
        <div class='payment-summary'></div>
        `;
    
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
       {
    productId:productId1,
    quantity:2,
    deliveryOptionId: '1'
  },
  {
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryOptionId: '2'
  }
      ]);
    });

    loadFromStorage();

    renderOrderSummary()
    })

  it("display cart", () => {


   expect( document.querySelectorAll('.js-cart-item-container').length).toEqual(2)

    expect(document.querySelector(`.product-quantity-${productId1}`).innerText).toContain('Quantity: 2')

    expect(document.querySelector(`.product-quantity-${productId2}`).innerText).toContain('Quantity: 1')

    document.querySelector(".js-test-container").innerHTML = ''
  });

  it('removes a product', () =>{

    document.querySelector(`.delete-link-${productId1}`).click()
    expect( document.querySelectorAll('.js-cart-item-container').length).toEqual(1)

    expect(document.querySelector(`.cart-item-container-${productId1}`)).toEqual(null)

    expect(document.querySelector(`.cart-item-container-${productId2}`)).not.toEqual(null)

    expect(cart.length).toEqual(1)
    expect(cart[0].productId).toEqual(productId2)

    document.querySelector(".js-test-container").innerHTML = ''
  })
});
