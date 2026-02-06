document.addEventListener("DOMContentLoaded", () => {
  // ===== ELEMENTS =====
  const cartItemsContainer = document.getElementById("cart-items"); // cart page
  const subtotalEl = document.getElementById("subtotal");
  const subtotal2El = document.getElementById("subtotal-2");
  const itemCountEl = document.getElementById("item-count");
  const itemCount2El = document.getElementById("item-count-2");
  const cartCountBadge = document.getElementById("cart-count"); // index.html & header

  // ===== CART HELPERS =====
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateHeaderCount() {
    if (!cartCountBadge) return;
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalQty;
  }

  // ===== RENDER CART (cart.html) =====
  function renderCart() {
    if (!cartItemsContainer) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    }

    let subtotal = 0;
    let totalQty = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      totalQty += item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="item-details">
          <div class="item-title">${item.title}</div>
          <div class="item-seller">Sold by Shop</div>

          <label>Qty:</label>
          <select class="qty-select" data-id="${item.id}">
            ${[1,2,3,4,5,6,7].map(q =>
              `<option value="${q}" ${q === item.quantity ? "selected" : ""}>${q}</option>`
            ).join("")}
          </select>

          <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>

        <div class="item-price">₦${itemTotal.toLocaleString()}</div>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Update subtotals & counts
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString();
    if (subtotal2El) subtotal2El.textContent = subtotal.toLocaleString();
    if (itemCountEl) itemCountEl.textContent = totalQty;
    if (itemCount2El) itemCount2El.textContent = totalQty;

    attachEvents();
    updateHeaderCount();
  }

  // ===== ATTACH EVENTS =====
  function attachEvents() {
    // Quantity change
    document.querySelectorAll(".qty-select").forEach(select => {
      select.addEventListener("change", e => {
        const id = Number(e.target.dataset.id);
        const cart = getCart();
        const product = cart.find(item => item.id === id);
        if (!product) return;
        product.quantity = Number(e.target.value);
        saveCart(cart);
        renderCart();
      });
    });

    // Remove item
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        let cart = getCart();
        cart = cart.filter(item => item.id !== id);
        saveCart(cart);
        renderCart();
      });
    });
  }

  // ===== INITIALIZE =====
  updateHeaderCount();
  renderCart();

  // ===== REAL-TIME SYNC ACROSS TABS =====
  window.addEventListener("storage", e => {
    if (e.key === "cart") {
      updateHeaderCount();
      renderCart();
    }
  });
});
