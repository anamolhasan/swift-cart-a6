// ==========================
// Global Variables
// ==========================
const productContainer = document.getElementById("product-container");
const categoryButtons = document.getElementById("category-buttons");
const trendingContainer = document.getElementById("trending-products");
const cartCount = document.getElementById("cart-count");
const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const closeModalBtn = document.getElementById("close-modal");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");


modal.addEventListener("click", (e) => {
  // যদি click হয় modal এর background (overlay) এ, content নয়
  if (e.target === modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
});

// Close button already works
document.getElementById("close-modal").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

const BASE_URL = "https://fakestoreapi.com/products";

// ==========================
// Initial Load
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();

  loadAllProducts();
  loadCategories();
  loadTrendingProducts();
});

document.getElementById("cart-btn").addEventListener("click", showCartSummary);

// ==========================
// Fetch Functions
// ==========================
async function loadAllProducts() {
  try {
    showLoader();
    const res = await fetch(BASE_URL);
    const data = await res.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error loading products:", error);
  } finally {
    hideLoader();
  }
}

async function loadCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    const categories = await res.json();
    renderCategories(categories);
  } catch (error) {
    console.error("Error loading categories:", error);
  }
}

async function loadProductsByCategory(category) {
  try {
    showLoader();
    const res = await fetch(`${BASE_URL}/category/${category}`);
    const data = await res.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error loading category products:", error);
  } finally {
    hideLoader();
  }
}

async function loadTrendingProducts() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    const topThree = data.slice(0, 3);
    renderTrending(topThree);
  } catch (error) {
    console.error("Error loading trending products:", error);
  }
}

// ==========================
// Render Functions
// ==========================
function renderProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = `
      bg-white p-4 rounded-2xl shadow-lg transform 
      hover:scale-105 transition-transform duration-300
      flex flex-col justify-between
    `;

    card.innerHTML = `
      <img src="${product.image}" 
           class="h-48 w-full object-contain mb-4" />

      <h3 class="font-semibold text-sm mb-2 truncate">
        ${product.title}
      </h3>

      <p class="text-indigo-600 font-bold mb-2">$${product.price}</p>

      <p class="text-xs bg-gray-200 inline-block px-2 py-1 rounded mb-2">
        ${product.category}
      </p>

      <p class="text-sm mb-3">
        ${renderStars(product.rating.rate)} <span class="text-gray-500">(${product.rating.count})</span>
      </p>

      <div class="flex gap-2 mt-auto">
        <button onclick="openModal(${product.id})"
                class="bg-gray-800 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition">
          Details
        </button>

        <button onclick="addToCart(${product.id})"
                class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform">
          Add
        </button>
      </div>
    `;

    productContainer.appendChild(card);
  });
}


function renderCategories(categories) {
  categoryButtons.innerHTML = "";

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.className = "category-btn px-4 py-2 bg-gray-200 rounded transition";

    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("bg-indigo-600", "text-white"));
      btn.classList.add("bg-indigo-600", "text-white");
      loadProductsByCategory(category);
    });

    categoryButtons.appendChild(btn);
  });
}

function renderTrending(products) {
  const trendingContainer = document.getElementById("trending-products");
  trendingContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = `
      bg-white p-4 rounded-2xl shadow-lg transform 
      hover:scale-105 transition-transform duration-300
      flex flex-col justify-between
    `;

    card.innerHTML = `
      <img src="${product.image}" 
           class="h-48 w-full object-contain mb-4" />

      <h3 class="font-semibold text-sm mb-2 truncate">
        ${product.title}
      </h3>

      <p class="text-indigo-600 font-bold mb-2">$${product.price}</p>

      <p class="text-sm mb-3">
        ${renderStars(product.rating.rate)}
      </p>

      <button onclick="addToCart(${product.id})"
              class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform mt-auto">
        Add to Cart
      </button>
    `;

    trendingContainer.appendChild(card);
  });
}

// ==========================
// Rating Stars Utility
// ==========================
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '⭐';
  }
  if (halfStar) starsHTML += '✰';

  return starsHTML;
}

// ==========================
// Open Modal Function (Enhanced)
// ==========================
async function openModal(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    const product = await res.json();

    const modalBody = document.getElementById("modal-body");

    modalBody.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Product Image -->
        <div class="md:w-1/2 flex justify-center items-center">
          <img src="${product.image}" 
               class="h-64 w-full object-contain rounded-2xl shadow-lg" />
        </div>

        <!-- Product Info -->
        <div class="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 class="text-2xl font-extrabold mb-3 text-gray-800">
              ${product.title}
            </h2>

            <p class="text-gray-600 mb-4">
              ${product.description}
            </p>

            <p class="text-indigo-600 font-bold text-xl mb-3">
              $${product.price}
            </p>

            <p class="text-sm mb-4">
              ${renderStars(product.rating.rate)} 
              <span class="text-gray-500">(${product.rating.count} reviews)</span>
            </p>

            <p class="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs font-semibold mb-4">
              ${product.category}
            </p>
          </div>

          <div class="flex gap-4 flex-wrap mt-4">
            <button onclick="addToCart(${product.id})"
                    class="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform">
              Add To Cart
            </button>

            <button id="close-modal-enhanced"
                    class="bg-gray-300 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-400 transition">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    // Show Modal
    const modal = document.getElementById("product-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Close Modal Button inside modal
    document.getElementById("close-modal-enhanced").addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });

  } catch (error) {
    console.error("Error loading product details:", error);
  }
}


closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// ==========================
// Cart Functions
// ==========================
function addToCart(id) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast("Added to cart!");
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartSummary();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  cartCount.textContent = totalItems;
}

// ==========================
// Enhanced showCartSummary with blur
// ==========================
async function showCartSummary() {
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");

  if (cart.length === 0) {
    modalBody.innerHTML = "<p class='text-center text-gray-700'>Your cart is empty</p>";
  } else {
    let total = 0;
    let html = "<h2 class='text-xl font-bold mb-4'>Cart Items</h2>";

    for (let item of cart) {
      const res = await fetch(`${BASE_URL}/${item.id}`);
      const product = await res.json();

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      html += `
        <div class="flex justify-between items-center mb-3">
          <div>
            <p>${truncateText(product.title, 25)}</p>
            <p class="text-sm text-gray-500">
              $${product.price} × ${item.quantity}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="changeQuantity(${item.id}, -1)"
              class="px-2 bg-gray-300 rounded hover:bg-gray-400 transition">-</button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity(${item.id}, 1)"
              class="px-2 bg-gray-300 rounded hover:bg-gray-400 transition">+</button>

            <button onclick="removeFromCart(${item.id})"
              class="text-red-500 hover:text-red-700 transition">✖</button>
          </div>
        </div>
      `;
    }

    html += `
      <hr class="my-4">
      <p class="font-bold text-lg">Total: $${total.toFixed(2)}</p>
    `;

    modalBody.innerHTML = html;
  }

  // Show modal with flex and blur
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}


function changeQuantity(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartSummary();
}

// ==========================
// Search & Sort
// ==========================
searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  const res = await fetch(BASE_URL);
  const products = await res.json();

  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  renderProducts(filtered);
});

sortSelect.addEventListener("change", async (e) => {
  const res = await fetch(BASE_URL);
  let products = await res.json();

  if (e.target.value === "low") products.sort((a, b) => a.price - b.price);
  if (e.target.value === "high") products.sort((a, b) => b.price - a.price);
  if (e.target.value === "rating") products.sort((a, b) => b.rating.rate - a.rating.rate);

  renderProducts(products);
});

// ==========================
// Toast
// ==========================
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 2000);
}

// ==========================
// Utility
// ==========================
function truncateText(text, limit) {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
}

function showLoader() {
  productContainer.innerHTML = `
    <div class="col-span-full flex justify-center py-10">
      <div class="w-10 h-10 border-4 border-indigo-600 border-dashed rounded-full animate-spin"></div>
    </div>
  `;
}

function hideLoader() {
  // optional - loader auto removed when renderProducts runs
}
