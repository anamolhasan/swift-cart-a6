// products.js
const API = "https://fakestoreapi.com/products";

let allProducts = [];

// Load Trending (Home Page)
async function loadTrending() {
  const container = document.getElementById("trending");
  if (!container) return;

  container.innerHTML = "Loading...";

  try {
    const res = await fetch(API);
    const data = await res.json();
    allProducts = data;

    const top3 = data.slice(0, 3);

    container.innerHTML = top3.map(product => `
      <div class="bg-white p-4 rounded shadow">
        <img src="${product.image}" class="h-40 mx-auto object-contain">
        <h3 class="font-semibold mt-3">${product.title.substring(0,40)}...</h3>
        <p class="text-purple-600 font-bold">$${product.price}</p>
        <button class="details-btn mt-2 bg-blue-600 text-white px-3 py-1 rounded" data-index="${data.indexOf(product)}">Details</button>
        <button class="add-btn mt-2 bg-purple-600 text-white px-3 py-1 rounded" data-index="${data.indexOf(product)}">Add to Cart</button>
      </div>
    `).join("");

    addProductEventListeners(top3);
  } catch(err) {
    container.innerHTML = "Failed to load products.";
    console.error(err);
  }
}

// Load Categories
async function loadCategories() {
  const container = document.getElementById("categories");
  if (!container) return;

  try {
    const res = await fetch(`${API}/categories`);
    const categories = await res.json();

    container.innerHTML = categories.map(cat => `
      <div class="category-btn bg-purple-600 text-white px-4 py-2 rounded cursor-pointer text-center" data-category="${cat}">
        ${cat}
      </div>
    `).join("");

    // Add click events for individual categories
    document.querySelectorAll(".category-btn[data-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.category;
        loadProducts(cat);
      });
    });

    // All Category Button
    const allBtn = document.getElementById("all-category");
    allBtn.addEventListener("click", () => {
      loadProducts(); // No category = all products
    });

    // Load all products by default
    loadProducts();

  } catch(err) {
    container.innerHTML = "Failed to load categories.";
    console.error(err);
  }
}


// Load Products
async function loadProducts(category) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "Loading...";

  let url = API;
  if (category) url = `${API}/category/${category}`;

  try {
    const res = await fetch(url);
    const products = await res.json();
    allProducts = products;

    container.innerHTML = products.map(product => `
      <div class="bg-white p-4 rounded shadow">
        <img src="${product.image}" class="h-40 mx-auto object-contain">
        <span class="text-xs bg-gray-200 px-2 py-1 rounded">${product.category}</span>
        <h3 class="font-semibold mt-3">${product.title.substring(0,40)}...</h3>
        <p class="text-yellow-500">⭐ ${product.rating.rate}</p>
        <p class="text-purple-600 font-bold">$${product.price}</p>
        <button class="details-btn mt-2 bg-blue-600 text-white px-3 py-1 rounded" data-index="${products.indexOf(product)}">Details</button>
        <button class="add-btn mt-2 bg-purple-600 text-white px-3 py-1 rounded" data-index="${products.indexOf(product)}">Add to Cart</button>
      </div>
    `).join("");

    addProductEventListeners(products);
  } catch(err) {
    container.innerHTML = "Failed to load products.";
    console.error(err);
  }
}

// Attach event listeners to dynamically created buttons
function addProductEventListeners(productsArray) {
  document.querySelectorAll(".details-btn").forEach(btn => {
    const idx = btn.dataset.index;
    btn.addEventListener("click", () => showDetails(productsArray[idx]));
  });

  document.querySelectorAll(".add-btn").forEach(btn => {
    const idx = btn.dataset.index;
    btn.addEventListener("click", () => addToCart(productsArray[idx]));
  });
}


 document.getElementById("shopBtn").addEventListener("click", function() {
      window.location.href = "products.html";
    });
