const costumesList = document.getElementById("costumes-list");
const signIn = document.getElementById("sign-in");
const footerSignIn = document.getElementById("footer-sign-in");

// sign in and sign out link
window.addEventListener("load", () => {
  if (localStorage.getItem("token")) {
    signIn.innerText = "Sign Out";
    footerSignIn.innerText = "Sign Out";
    signIn.href = "/";
    signIn.href = "/";
  }
});

window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://backend-cosu.vercel.app/api/costumes-list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    const { status, data: results } = data;

    if (status === 200) {
      for (const costume of results) {
        costumesList.innerHTML += `
          <div class="costume">
          <div class="costume-image-wrapper">
              <img loading="lazy" class="costume-image" src=${
                costume.image
              } alt="costume image" loading="lazy">
            </div>
            <div class="costume-content">
              <h3 class="costume-content-title">${costume.name}</h3>
              <div class="costume-content-description">
                <p class="costume-content-size">Size <span>${
                  costume.size
                }</span></p>
                <p class="costume-content-price">${costume.price} / 3 hari</p>
                <div class="costume-content-btn-order-wrapper">
                ${
                  localStorage.getItem("token")
                    ? `<a href='https://wa.me/083169693085?text=Halo,%20saya&ingin&memesan&kostum&"${costume.name}".&Kira-kira&berapa&ya&harganya?&Terima&kasih' target="blank" rel="noopener noreferrer">
                  <button type="button" aria-label="order" id="costume-content-btn-order" class="costume-content-btn-order">Order</button>
                  </a>`
                    : `<button disabled type="button" aria-label="order" id="costume-content-btn-order" class="costume-content-btn-order">Sign In first</button>`
                }
                </div>
              </div
            </div>
          </div>
        `;
      }
    }
  } catch (err) {
    console.error(err.message);
  }
});

const header = document.getElementById("header");
const backToTopBtn = document.getElementById("back-to-top-btn");
const body = document.querySelector("body");
const switchThemeBtn = document.getElementById("switch-theme-btn");
const switchThemeIcon = document.getElementById("switch-theme-icon");
const navMenuMobileLists = document.getElementById("nav-menu-mobile-lists");
const openNavBtn = document.getElementById("open-nav-btn");

let isToggleSwitchTheme = false;
let isToggleNavMobile = false;
let isToggleSwitchThemeMobile = false;
let isLoggedIn = false;

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  if (scrollPosition > 20) {
    header.style.borderBottom = "1px solid #717C7C";
    backToTopBtn.style.display = "block";
  } else {
    header.style.borderBottom = "";
    backToTopBtn.style.display = "none";
  }
});

switchThemeBtn.addEventListener("click", () => {
  header.classList.toggle("dark-mode");
  body.classList.toggle("dark-mode");
  isToggleSwitchTheme = !isToggleSwitchTheme;
  isToggleSwitchThemeMobile = !isToggleSwitchThemeMobile;

  switchThemeIcon.src = isToggleSwitchTheme
    ? "./assets/static/sun.svg"
    : "./assets/static/moon.svg";
});

openNavBtn.addEventListener("click", () => {
  navMenuMobileLists.classList.toggle("show-nav-menu-mobile-lists");
  isToggleNavMobile = !isToggleNavMobile;
  openNavBtn.innerHTML = isToggleNavMobile
    ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24px" height="24px" ><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
});

signIn.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    alert("Logout berhasil!");
  }
});

footerSignIn.addEventListener("click", () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    alert("Logout berhasil!");
  }
});
