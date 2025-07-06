const containerlogin = document.getElementById('containerlogin');
const registerbtn = document.getElementById('register');
const loginbtn = document.getElementById('login');

registerbtn.addEventListener('click', () => {
  containerlogin.classList.add("active");
});

loginbtn.addEventListener('click', () => {
  containerlogin.classList.remove("active");
});
function generateCaptcha() {
  let captcha = Math.random().toString(36).substring(2, 7);
  document.getElementById("captcha-text").innerText = captcha;
  sessionStorage.setItem("captcha", captcha);
}
document.addEventListener("DOMContentLoaded", () => {
  generateCaptcha(); // تولید کپچا هنگام بارگذاری صفحه
});

document.getElementById("sabtnam").addEventListener("click", function () {
  const name = document.getElementById("namsabt").value.trim();
  const email = document.getElementById("emailsabt").value.trim();
  const pass = document.getElementById("passsabt").value;

  // بررسی نام کامل
  if (name === "") {
    alert("نام کامل الزامی است.");
    return;
  }

  // بررسی اعتبار ایمیل با Regex ساده
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("ایمیل معتبر وارد کنید.");
    return;
  }

  // بررسی قدرت رمز عبور (حداقل ۶ کاراکتر، شامل حرف و عدد)
  if (pass.length < 6) {
    alert("رمز عبور باید حداقل ۶ کاراکتر باشد.");
    return;
  }
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
  if (!passRegex.test(pass)) {
    alert("رمز عبور باید شامل حروف و عدد باشد.");
    return;
  }

  // داده‌های آماده برای ارسال به سرور
  const data = {
    fullName: name,
    email: email,
    password: pass
  };

  // ارسال به سرور در صورت اعتبارسنجی موفق
  fetch("https://localhost:5001/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async res => {
      let responseData;
      try {
        responseData = await res.json();
      } catch {
        alert("پاسخ نامعتبر از سرور دریافت شد.");
        return;
      }

      if (!res.ok) {
        alert(responseData.message || "خطا در ثبت‌نام.");
      } else {
        alert("ثبت‌نام با موفقیت انجام شد.");
        // فرم را پاک کن اگر خواستی
        document.getElementById("namsabt").value = "";
        document.getElementById("emailsabt").value = "";
        document.getElementById("passsabt").value = "";
      }
    })
    .catch(err => {
      alert("خطا در ارتباط با سرور.");
      console.error(err);
    });
});

let currentCaptcha = "";

function generateCaptcha() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentCaptcha = captcha;
  document.getElementById("captcha-text").innerText = captcha;
}

// اجرای اولیه کپچا
generateCaptcha();

document.getElementById("vorod").addEventListener("click", function () {
  const email = document.getElementById("emailvorod").value.trim();
  const password = document.getElementById("passvorod").value;
  const captchaInput = document.getElementById("captcha-input").value.trim();

  // اعتبارسنجی مقدماتی
  if (!email || !password) {
    alert("ایمیل و رمز عبور را وارد کنید.");
    return;
  }

  // چک کردن کپچا
  if (captchaInput !== currentCaptcha) {
    alert("کد امنیتی اشتباه است.");
    generateCaptcha();
    return;
  }

  // آماده‌سازی داده‌ها
  const data = {
    email: email,
    password: password
  };

  // ارسال به API لاگین
  fetch("https://localhost:5001/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async res => {
      let responseData;
      try {
        responseData = await res.json();
      } catch {
        alert("پاسخ نامعتبر از سرور دریافت شد.");
        return;
      }

      if (!res.ok) {
        alert(responseData.message || "ورود ناموفق.");
      } else {
        localStorage.setItem('loggedInUsername', responseData.fullName); // یا email اگه username توی پاسخ نیست
        // ✅ انتقال به صفحه دلخواه
        window.location.href = "../../kazgame.html"; // ← اینجا مسیر دلخواهتو بزار
      }
    })
    .catch(err => {
      alert("خطا در ارتباط با سرور.");
      console.error(err);
    });
});