import { toRupiah } from "../lib/helpers/index.js";

const addCostumeForm = document.getElementById("add-costume-form");
const nameInput = document.getElementById("name-input");
const sizeInput = document.getElementById("size-input");
const priceInput = document.getElementById("price-input");
const imageInput = document.getElementById("image-input");

window.addEventListener("load", async () => {
  try {
    const response = await fetch(
      "https://backend-cosu.vercel.app/api/add-costume",
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

    if (status === 200) {
      return;
    } else {
      alert(message);
      window.location.replace("/");
    }
  } catch (err) {
    console.error(err.message);
  }
});

addCostumeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://backend-cosu.vercel.app/api/add-costume",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: nameInput.value.toString(),
          size: sizeInput.value.toString(),
          price: toRupiah(Number(priceInput.value)),
          image: `./assets/static/${imageInput.files[0].name}`,
        }),
      }
    );

    const data = await response.json();
    const { status, message } = data;

    if (status === 200 || status === 201) {
      alert(message);
      window.location.replace("/");
    } else {
      alert(message);
    }
  } catch (err) {
    console.error(err.message);
  }
});
