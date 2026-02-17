// this is main.js file 

const form = document.getElementById("newsletterForm");
const msg = document.getElementById("newsletterMsg");

document.addEventListener("DOMContentLoaded", () => {

  if (document.getElementById("trending")) {
    loadTrending();
  }

  if (document.getElementById("categories")) {
    loadCategories();
  }

});


// navbar menu toggle
 const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });


  form.addEventListener("submit", function(e){
  e.preventDefault();

  msg.classList.remove("hidden");

  setTimeout(() => {
    msg.classList.add("hidden");
    form.reset();
  }, 3000);
});




// Modal বন্ধ করার ফাংশন (এটি গ্লোবাল রাখুন)
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.add("hidden");
}

// Product Details দেখানোর ফাংশন
function showDetails(product) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  // modal-content এর ভেতর সব ডেটা ইনজেক্ট করুন
  content.innerHTML = `
    <button onclick="closeModal()" class="absolute top-2 right-2 text-xl font-bold">✖</button>
    <div class="flex flex-col items-center">
      <img src="${product.image}" class="h-48 object-contain mb-4">
      <h2 class="text-xl font-bold mb-2">${product.title}</h2>
      <p class="text-gray-600 mb-4 text-sm">${product.description}</p>
      <div class="flex justify-between w-full items-center">
        <p class="text-2xl font-bold text-purple-600">$${product.price}</p>
        <p class="text-yellow-500">⭐ ${product.rating.rate}</p>
      </div>
      <button id="modal-add-cart" class="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
        Add to Cart
      </button>
    </div>
  `;

  // Modal এর ভেতরে থাকা 'Add to Cart' বাটনের কাজ
  document.getElementById("modal-add-cart").onclick = () => {
    addToCart(product);
    closeModal();
  };

  modal.classList.remove("hidden");
}