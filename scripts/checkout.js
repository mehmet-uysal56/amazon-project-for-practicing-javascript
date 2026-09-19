import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";


async function loadPage() {
  try {
    await loadProductsFetch();

const value = await new Promise((resolve, reject) => {
  loadCart(() => {
    //reject('error3');
    resolve('value3');
  });
});
} catch (error) {
  console.log('Unexpected error. PLease try again later.');
}

 

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();