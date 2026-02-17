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