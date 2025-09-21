const DISCOUNT_PERCENT = 10;
const DISCOUNT_THRESHOLD = 1000;
const TAX_PERCENT = 8;

const cartIcon = document.querySelector(".cart-header");
const cartCount = document.querySelector("header span");
const addButtons = document.querySelectorAll(".card button");
const cart = document.querySelector(".cart");
const receiptPopup = document.getElementById("receipt-popup");
const receiptDetails = document.getElementById("receipt-details");
const closeReceiptBtn = document.getElementById("close-receipt");

let cartItems = [];

function updateCartCount() {
  let totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalQty;
}

function addToCart(itemData) {
  let existing = cartItems.find(item => item.name === itemData.name);
  if (existing) {
    existing.quantity++;
  } else {
    cartItems.push({ ...itemData, quantity: 1 });
  }
  updateCartCount();
  renderCart();
}

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const name = card.querySelector("h1").textContent;
    const price = parseFloat(card.querySelector("p").textContent.replace("$", ""));
    const imgSrc = card.querySelector("img").src;

    addToCart({ name, price, imgSrc });
  });
});

cartIcon.addEventListener("click", () => {
  cart.style.display = cart.style.display === "block" ? "none" : "block";
});

function renderCart() {
  cart.innerHTML = "";

  if (cartItems.length === 0) {
    cart.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}" width="50" height="50">
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
      <span>${item.quantity}</span>
      <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
    `;
    cart.appendChild(itemDiv);
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `
    <hr>
    <p><strong>Subtotal: $${subtotal.toFixed(2)}</strong></p>
    <button id="checkout-btn">Checkout</button>
  `;
  cart.appendChild(totalDiv);

  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;
      if (action === "increase") {
        cartItems[index].quantity++;
      } else if (action === "decrease" && cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
      } else if (action === "decrease" && cartItems[index].quantity === 1) {
        cartItems.splice(index, 1);
      }
      updateCartCount();
      renderCart();
    });
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    showReceipt(subtotal);
  });
}

function showReceipt(subtotal) {
  let html = "<h3>Order Summary</h3>";

  cartItems.forEach(item => {
    html += `<p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>`;
  });

  let discount = 0;
  if (subtotal >= DISCOUNT_THRESHOLD) {
    discount = (subtotal * DISCOUNT_PERCENT) / 100;
  }

  let taxedAmount = subtotal - discount;
  let tax = (taxedAmount * TAX_PERCENT) / 100;

  let total = taxedAmount + tax;

  html += `<hr>
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    ${discount > 0 ? `<p>Discount (${DISCOUNT_PERCENT}%): -$${discount.toFixed(2)}</p>` : ""}
    <p>Tax (${TAX_PERCENT}%): $${tax.toFixed(2)}</p>
    <p><strong>Total: $${total.toFixed(2)}</strong></p>
  `;

  receiptDetails.innerHTML = html;
  receiptPopup.style.display = "flex";
}

closeReceiptBtn.addEventListener("click", () => {
  receiptPopup.style.display = "none";
});
