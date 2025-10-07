import { renderComments } from "./renderComments.js";
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
      return;
    }

    if (text === "") {
      textInput.classList.add("error");
      return;
    }

    const newComments = { text, name };

    fetch("https://wedev-api.sky.pro/api/v1/marina-lebakina/comments", {
      method: "POST",
      body: JSON.stringify(newComments),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateComments(data.comments);
      });

    fetch("https://wedev-api.sky.pro/api/v1/marina-lebakina/comments", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        updateComments(data.comments);
        renderComments();
      });

    nameInput.value = "";
    textInput.value = "";

    // renderComments();
  });
};
