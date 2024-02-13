const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const signInForm = document.getElementById("sign-in-form");
const showPasswordBtn = document.getElementById("show-password-btn");

let isShowPassword = false;

window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://backend-cosu.vercel.app/api/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await response.json();
    const { status, message } = data;

    if (status === 403) {
      alert(message);
      window.location.replace("/");
    } else {
      alert(message);
    }
  } catch (err) {
    console.error(err.message);
  }
});

// show and hide password input
showPasswordBtn.addEventListener("click", () => {
  isShowPassword = !isShowPassword;
  passwordInput.type = isShowPassword ? "text" : "password";
  showPasswordBtn.innerHTML = isShowPassword
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
});

// handle form submit
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://backend-cosu.vercel.app/api/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: usernameInput.value.toString(),
          password: passwordInput.value.toString(),
        }),
      }
    );
    const data = await response.json();

    const { status, message, data: results, token } = data;

    if (status === 200 && results.length) {
      localStorage.setItem("token", token);
      alert(message);
      window.location.replace("/");
    } else {
      alert(message);
    }
  } catch (err) {
    console.error(err.message);
  }
});
