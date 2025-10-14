import { renderComments } from "./renderComments.js";
import { postComments } from "./api.js";
import { updateComments } from "./coments.js";

const nameInput = document.querySelector(".add-form-name");
const textInput = document.querySelector(".add-form-text");
const addButton = document.querySelector(".add-form-button");

export const initButtonComment = () => {
  addButton.addEventListener("click", () => {
    const name = nameInput.value
      .trim()
      .replaceAll("<", "&lt")
      .replaceAll(">", "&gt");
    const text = textInput.value
      .trim()
      .replaceAll("<", "&lt")
      .replaceAll(">", "&gt");

    nameInput.classList.remove("error");
    textInput.classList.remove("error");

    if (name === "") {
      nameInput.classList.add("error");
      setTimeout(() => {
        nameInput.classList.remove("error");
      }, 2000);
      return;
    }

    if (text === "") {
      textInput.classList.add("error");
      setTimeout(() => {
        textInput.classList.remove("error");
      }, 2000);
      return;
    }

    addButton.disabled = true;
    addButton.textContent = "Загрузка..";

    postComments(text, name)
      .then((data) => {
        updateComments(data);
        renderComments();
        nameInput.value = "";
        textInput.value = "";
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          alert("Нет интернет-соединения");
        } else {
          alert(error.message);
        }
      })
      .finally(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
};
