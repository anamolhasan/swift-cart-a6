# SwiftCart - Simple E-Commerce Website

## 🌐 Live Link
YOUR_DEPLOYED_URL_HERE

## 💻 GitHub Repository
YOUR_REPO_URL_HERE

---

## 🛍️ Project Overview

SwiftCart একটি ছোট ও সহজ ই-কমার্স ওয়েবসাইট যা **Vanilla JavaScript**, **Tailwind CSS v4**, এবং **Fakestore API** ব্যবহার করে বানানো হয়েছে।  
এই প্রজেক্টের মাধ্যমে আমরা শিখেছি:

- API থেকে ডায়নামিকভাবে data fetch করা  
- Product category অনুযায়ী filter করা  
- Add to Cart, Remove, Quantity update ও Total calculation  
- Modal এবং Toast notification implement করা  
- Responsive design তৈরি করা  

---

## ⚡ Project Features

### ১. Navbar
- ওয়েবসাইটের নাম/Logo: **SwiftCart** (left)  
- Menu Items: Home, Products, About, Contact (center)  
- Cart Icon/Count (right)  

### ২. Hero Section
- Background image & title: "Best Collection For You"  
- Subtitle: Latest trends in fashion & electronics  
- "Shop Now" button  

### ৩. Features Section
- Fast Delivery  
- Secure Payment  
- 24/7 Support  
- Top Quality Products  

### ৪. Trending Section
- Top 3 products fetched from API  

### ৫. Category Section
- All categories fetched dynamically  
- Click → show products of that category  
- Active button highlighted  

### ৬. Products Section
- Product card includes:
  - Image, Title, Price, Category, Rating  
  - Details button → opens modal  
  - Add to Cart button  

### ৭. Cart Functionality
- Add to Cart → updates count & stores in LocalStorage  
- Remove from Cart  
- Change Quantity (+/-)  
- Cart Summary modal with total price  

### ৮. Newsletter & Footer
- Newsletter subscription form  
- Footer with quick links & social info  

### ৯. Search & Sort
- Search by product title  
- Sort by price (low → high, high → low)  
- Sort by rating  

### 🔟 Responsiveness
- Mobile-first design  
- Grid layout adapts to screen sizes  

---

## 📝 Assignment Questions (Bangla উত্তর)

### ১ Null এবং Undefined এর মধ্যে পার্থক্য কি?

- **null:** একটি intentional value যা বোঝায় “কোনো value নেই”।  
- **undefined:** কোনো variable declare করা হয়েছে কিন্তু value দেওয়া হয়নি।  

উদাহরণ:  
```js
let a;       // undefined
let b = null; // null
```

### ২ map() function এর ব্যবহার ও forEach এর পার্থক্য কি?

- **map():** array এর প্রতিটি item এ function apply করে **নতুন array** return করে।  
- **forEach():** array এর প্রতিটি item এ function apply করে **return value দেয় না**।  

উদাহরণ:  
```js
const nums = [1, 2, 3];
const squares = nums.map(x => x * x); // [1, 4, 9]
nums.forEach(x => console.log(x));     // output: 1, 2, 3
```

### ৩ == এবং === এর পার্থক্য কি?

- **== :** value compare করে, type ignore করে (type coercion)  
- **=== :** value এবং type উভয় compare করে (strict equality)  

উদাহরণ:  
```js
5 == '5'   // true
5 === '5'  // false
```
### ৪ async/await এর গুরুত্ব

- API থেকে data fetch করার সময় asynchronous কাজ সহজ ও readable করে।  
- `async` ফাংশন সবসময় promise return করে।  
- `await` দিয়ে promise resolve না হওয়া পর্যন্ত execution stop করে।  

উদাহরণ:  
```js
async function fetchData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
```

### ৫ Scope এর ধারণা (Global, Function, Block)

- **Global Scope:** ফাইলের যেকোনো জায়গা থেকে accessable variable।  
- **Function Scope:** শুধু সেই function এর ভিতরে accessable।  
- **Block Scope:** `{ }` এর ভিতরে accessable, যেমন `let` বা `const` দিয়ে declare করা variable।  

উদাহরণ:  
```js
let globalVar = "global";

function myFunc() {
  let funcVar = "function";
  if(true){
    let blockVar = "block";
  }
  console.log(blockVar); // Error
}
```