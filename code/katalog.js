document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn");
  const navbar = document.querySelector("header");
  const themeCheckbox = document.getElementById("theme-checkbox");
  const searchInput = document.getElementById("search-input");
  const menuItems = document.querySelectorAll(".menu-item");

  btn.addEventListener("click", () => {
    document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const id = link.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in");
    });
  }, { threshold: 0.3 });
  menuItems.forEach(i => observer.observe(i));

  themeCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase().trim();

    menuItems.forEach(item => {
      const name = item.querySelector("h3").textContent.toLowerCase();
      const match = name.includes(filter);

      item.style.display = match ? "" : "none";

      if (match) {
        item.classList.add("fade-in");
      }
    });
  });

  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Judul Menu</h2>
        <span class="close">&times;</span>
      </div>
      <img src="" alt="" class="modal-image">
      <p class="modal-price"></p>
      <p class="modal-description"></p>
      <button class="order-btn">Pesan Sekarang</button>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".close");
  const img = modal.querySelector(".modal-image");
  const title = modal.querySelector(".modal-title");
  const price = modal.querySelector(".modal-price");
  const desc = modal.querySelector(".modal-description");

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      img.src = item.querySelector("img").src;
      title.textContent = item.querySelector("h3").textContent;
      price.textContent = item.querySelector("p").textContent;
      desc.textContent = item.dataset.desc;
      modal.classList.add("show");
    });
  });

  closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal.classList.remove("show");
  });

  let cart = [];
  const cartIcon = document.querySelector(".cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.querySelector(".close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  cartIcon.addEventListener("click", () => cartModal.classList.add("show"));
  closeCart.addEventListener("click", () => cartModal.classList.remove("show"));
  window.addEventListener("click", e => {
    if (e.target === cartModal) cartModal.classList.remove("show");
  });

  const orderBtn = modal.querySelector(".order-btn");
  orderBtn.addEventListener("click", () => {
    const item = {
      name: title.textContent,
      price: parseInt(price.textContent.replace(/[^\d]/g, "")),
      image: img.src
    };
    cart.push(item);
    updateCart();
    showCartNotif(`${item.name} telah ditambahkan ke keranjang!`);
    modal.classList.remove("show");
  });
  function showCartNotif(message) {
  const notif = document.getElementById("cart-notif");
  notif.textContent = message;
  notif.classList.add("show");
  setTimeout(() => {
    notif.classList.remove("show");
  }, 3000);
}
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      total += item.price;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <img src="${item.image}" width="50" height="50" style="border-radius:8px;margin-right:10px;">
          <span>${item.name}</span>
          <span>Rp ${item.price.toLocaleString()}</span>
          <button class="remove-btn" data-index="${i}" style="background:#ef5350;color:#fff;border:none;border-radius:5px;padding:4px 8px;cursor:pointer;">Hapus</button>
        </div>
      `;
      cartItems.appendChild(div);
    });
    cartTotal.textContent = `Total: Rp ${total.toLocaleString()}`;
    cartCount.textContent = cart.length;

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        updateCart();
      });
    });
  }
});

// === Responsive Navbar ===
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Tutup navbar jika link diklik (mode mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// === Checkout Notification ===
const checkoutBtn = document.getElementById("checkout-btn");
const checkoutNotif = document.getElementById("checkout-notif");

checkoutBtn.addEventListener("click", () => {
  checkoutNotif.classList.add("show");
  setTimeout(() => checkoutNotif.classList.remove("show"), 3000);
});


