document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { image: "./images/umbrella.jpg", title: "Umbrella", rating: "★★★★☆ (1,234)", price: "₦ 12,499" },
    { image: "./images/leather-jacket.png", title: "Leather Jacket", rating: "★★★★☆ (980)", price: "₦ 30,000" },
    { image: "./images/singlet.jpg", title: "Singlet", rating: "★★★★★ (2,341)", price: "₦ 2,100" },
    { image: "./images/suit.png", title: "Suit", rating: "★★★☆☆ (1,200)", price: "₦ 60,230" },
    { image: "./images/socks.png", title: "Socks", rating: "★★★☆☆ (1,200)", price: "₦ 1,230" },
    { image: "./images/travelling.png", title: "Travelling Bag", rating: "★★★☆☆ (1,200)", price: "₦ 20,230" },
    { image: "./images/T-shirt.png", title: "T-shirt", rating: "★★★☆☆ (1,200)", price: "₦ 6,230" },
    { image: "./images/shoes.png", title: "Shoes", rating: "★★★☆☆ (1,200)", price: "₦ 40,230" },
    { image: "./images/umbrella.jpg", title: "Umbrella", rating: "★★★☆☆ (1,000)", price: "₦ 8,499" },
    { image: "./images/watch.jpg", title: "Smart Watch", rating: "★★★★☆ (900)", price: "₦ 15,000" },
    { image: "./images/cap.jpg", title: "Baseball Hat", rating: "★★★☆☆ (700)", price: "₦ 4,500" },
    { image: "./images/backpack.jpg", title: "Backpack", rating: "★★★★★ (1,800)", price: "₦ 18,200" },
    { image: "./images/headphones.png", title: "Headphones", rating: "★★★★☆ (2,000)", price: "₦ 25,500" },
    { image: "./images/glasses.jpg", title: "Sunglasses", rating: "★★★☆☆ (1,100)", price: "₦ 6,800" },
    { image: "./images/keyboard.png", title: "Gaming Keyboard", rating: "★★★★☆ (1,450)", price: "₦ 22,000" },
    { image: "./images/mouse.jpg", title: "Wireless Mouse", rating: "★★★★☆ (1,300)", price: "₦ 4,500" },
    { image: "./images/LED-monitor.webp", title: "LED Monitor", rating: "★★★★★ (2,100)", price: "₦ 85,000" },
    { image: "./images/coffee-mug.jpg", title: "Coffee Mug", rating: "★★★☆☆ (900)", price: "₦ 1,200" },
    { image: "./images/leather-jacket.png", title: "Leather Jacket", rating: "★★★★☆ (1,050)", price: "₦ 60,000" },
    { image: "./images/desk-lamp.webp", title: "Desk Lamp", rating: "★★★☆☆ (650)", price: "₦ 3,200" }
  ];

  const grid = document.getElementById("product-grid");
  let html = "";

  products.forEach(product => {
    html += `
      <article class="card">
        <img src="${product.image}" alt="${product.title}">
        <div class="title">${product.title}</div>
        <div class="rating">${product.rating}</div>
        <div class="price">${product.price}</div>
        <button class="addbtn">Add to cart</button>
      </article>
    `;
  });

  grid.innerHTML = html;
});
