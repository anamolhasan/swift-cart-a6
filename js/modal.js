function showDetails(product) {
  const modal = document.getElementById("modal");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${product.title}</h2>
    <p class="mb-2">${product.description}</p>
    <p class="font-bold mb-1">$${product.price}</p>
    <p>⭐ ${product.rating.rate}</p>
     <button id="modal-add-cart" class="mt-3 bg-purple-600 text-white px-4 py-2 rounded">
      Add to Cart
    </button>
  `;

   document.getElementById("modal-close").onclick = () => {
    modal.classList.add("hidden");
  };

    document.getElementById("modal-add-cart").onclick = () => {
    addToCart(product);
    modal.classList.add("hidden");
    }

  modal.classList.remove("hidden");
}


