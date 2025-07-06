  window.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("loggedInUsername");
    const userInfoDiv = document.getElementById("user-info");
    const ctaButton = document.querySelector(".cta-button");

    if (username) {
      userInfoDiv.style.display = "flex";
      document.getElementById("username-display").innerText = username;
        console.log(username);
      if (username) {
        ctaButton.style.display = "none"; // دکمه sign up پنهان می‌شود
      }
    }
  });


const SignupBtn = document.getElementsByClassName("cta-button")
function signUp(){
  window.location.href = "./signup/html/signup.html";
}

function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}
async function loadProducts() {
  const container = document.getElementById("products-container");

  try {
    const response = await fetch("https://localhost:7055/api/products"); // پورت صحیح HTTPS
    const products = await response.json();

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">$${product.price}</div>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
    container.innerHTML = "<p>محصولی یافت نشد</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);


// product-slider

const track = document.querySelector('.slider-track');
const cards = document.querySelectorAll('.product-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots-container');

const cardsPerPage = 3;
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 0;

// ایجاد دات‌ها
for (let i = 0; i < totalPages; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  const slideWidth = cards[0].offsetWidth + 20; // عرض هر کارت + فاصله
  track.style.transform = `translateX(-${slideWidth * cardsPerPage * currentPage}px)`;

  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentPage);
  });
}

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    updateSlider();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    updateSlider();
  }
});

// کلیک روی دات‌ها
document.querySelectorAll('.dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentPage = index;
    updateSlider();
  });
});


// whats-news

const slider = document.getElementById('slider');
let currentIndex = 0;

function showSlide(index) {
  // توقف تمام ویدیوها قبل از تغییر اسلاید
  const videos = slider.querySelectorAll("video");
  videos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });

  // حرکت به اسلاید جدید
  slider.style.transform = `translateX(-${index * 100}vw)`;
}
function nextSlide() {
  if (currentIndex < slider.children.length - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
}
