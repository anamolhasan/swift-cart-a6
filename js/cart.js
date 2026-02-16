// cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to Cart!");
}

// Show Cart Modal
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
  renderCart();
  cartModal.classList.remove("hidden");
});

closeCartBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Render cart items in modal
function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "0";
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="flex justify-between items-center border-b pb-2">
      <div class="flex items-center gap-2">
        <img src="${item.image}" class="h-12 w-12 object-contain">
        <span class="font-semibold">${item.title.substring(0,30)}...</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="font-bold text-purple-600">$${item.price}</span>
        <button class="remove-btn bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Remove</button>
      </div>
    </div>
  `).join("");

  totalEl.textContent = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  // Add remove event listeners
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = btn.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    });
  });
}

updateCartCount();
