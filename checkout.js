document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.getElementById("checkout-items");
  const subtotalElem = document.getElementById("subtotal");
  const itemCountElem = document.getElementById("item-count");
  const confirmBtn = document.getElementById("confirm-order");

  function renderCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    itemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      subtotalElem.textContent = "0";
      itemCountElem.textContent = "0";
      return;
    }

    cart.forEach((item, index) => {
      const priceNum = Number(item.price);
      const itemTotal = priceNum * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.classList.add("checkout-item");
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-details">
          <div class="item-title">${item.title}</div>
          <div class="item-price">₦${priceNum.toLocaleString()}</div>
          Qty: <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}">
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
        <div class="item-total">₦${itemTotal.toLocaleString()}</div>
      `;
      itemsContainer.appendChild(itemEl);
    });

    subtotalElem.textContent = total.toLocaleString();
    itemCountElem.textContent = cart.length;

    attachEvents(cart);
  }

  function attachEvents(cart) {
    // Quantity change
    document.querySelectorAll(".qty-input").forEach(input => {
      input.addEventListener("change", (e) => {
        const idx = e.target.dataset.index;
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        cart[idx].quantity = val;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCheckout();
      });
    });

    // Remove item
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = btn.dataset.index;
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCheckout();
      });
    });
  }

  // Confirm order
  confirmBtn.addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you! Your order has been placed.");
    localStorage.removeItem("cart");
    renderCheckout();
  });

  renderCheckout();
});
