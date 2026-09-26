import {cart} from '../../data/cart.js';
import {products} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
function useTax(Element){
  
  return Math.round(Element += (Element*0.1));
}
export function renderPaymentSummary() {
  let itemsCount = 0; 

  cart.forEach((cartItem) => {
    
    itemsCount += cartItem.quantity;
  });
  let totalCents = 0;
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) =>{
      if(product.id === productId) {
        matchingProduct = product;
      }
    })
    totalCents += matchingProduct.priceCents * cartItem.quantity;
    
    });
    
    
    
 const totalPrice = formatCurrency(totalCents);
 let totalShipping = 0;
  cart.forEach((cartItem) =>{
    const deliveryOptionId = cartItem.deliveryOptionId || '1';
    let matchingoption;
    deliveryOptions.forEach((Element)=>{
      if(Element.id === deliveryOptionId) {
        matchingoption = Element;
      }
    });
    totalShipping += matchingoption.priceCents;
  });
   let totalCentsWithShipping = totalCents + totalShipping;
   let estimatedTax = Math.round(totalCentsWithShipping * 0.1);
   let totalCentsOrder = useTax(totalCentsWithShipping);


const paymentSummaryHTML =`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemsCount}):</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(totalShipping)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCentsWithShipping)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCentsOrder)}</div>
          </div> <button class="place-order-button button-primary">
            Place your order
          </button>`;

document.querySelector('.js-payment-summary')
   .innerHTML = paymentSummaryHTML;

   document.querySelector('.js-checkout-header-middle-section')
.innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${itemsCount} items</a>)`;
}
