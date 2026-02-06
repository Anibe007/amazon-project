document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const countEl = document.getElementById("cart-count");

  if (!productGrid) return;

  // Render products dynamically
  productGrid.innerHTML = products.map(product => `
    <article class="card">
      <img src="${product.image}" alt="${product.title}">
      <div class="title">${product.title}</div>
      <div class="rating">${product.rating}</div>
      <div class="price">₦${product.price.toLocaleString()}</div>
      <button class="addbtn" data-id="${product.id}">Add to cart</button>
    </article>
  `).join("");

  // Add to cart
  document.querySelectorAll(".addbtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const product = products.find(p => p.id === id);
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({...product, quantity: 1});
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    });
  });

  // Update cart count in topbar
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (countEl) countEl.textContent = total;
  }

  updateCartCount();

  // Real-time update across tabs/pages
  window.addEventListener("storage", (e) => {
    if (e.key === "cart") updateCartCount();
  });
});
