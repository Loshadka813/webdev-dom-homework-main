import { renderComments } from "./renderComments.js";
import { postComments, name } from "./api.js";
import { updateComments } from "./comments.js";

export const initButtonComment = () => {
  const addButton = document.querySelector(".add-form-button");
  addButton.addEventListener("click", () => {
    const textInput = document.querySelector(".add-form-text");
    const text = textInput.value
      .trim()
      .replaceAll("<", "&lt")
      .replaceAll(">", "&gt");

    textInput.classList.remove("error");

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
        textInput.value = "";
      })

      .finally(() => {
        addButton.disabled = false;
        addButton.textContent = "Написать";
      });
  });
};
