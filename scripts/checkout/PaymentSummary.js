import {cart} from '../../data/cart.js'
import { getProduct, products } from '../../data/products.js'

import { getDeliveryOption } from '../../data/deliveryOptions.js'


export function renderPaymentSummary(){
    let productPrice=0
    let shippingPrice=0
    cart.forEach((cartItem) =>{
        let product=getProduct(cartItem.productId)
        productPrice+=product.price*cartItem.quantity

        let deliveryOption=getDeliveryOption(cartItem.deliveryOptionId)
        shippingPrice+=deliveryOption.price
    })
    
    let totalBeforeTax=productPrice+shippingPrice

    let tax =totalBeforeTax*0.05

    let total=totalBeforeTax+tax

    let paymentSummaryHTML=`
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">Rs. ${productPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">Rs. ${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Rs. ${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (5%):</div>
            <div class="payment-summary-money">Rs. ${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Rs. ${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>    
    `

    document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML
}

