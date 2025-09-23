const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const addButton = document.querySelector('.add-form-button');

import { comments } from "./modules/coments.js"; 
import { renderComments } from "./modules/renderComments.js";

addButton.addEventListener('click', () => {
    const name = nameInput.value.trim().replaceAll("<", "&lt").replaceAll(">", "&gt");
    const text = textInput.value.trim().replaceAll("<", "&lt").replaceAll(">", "&gt");

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

    const newDate = new Date().toLocaleString();

    comments.push({
        author: name,
        date: newDate,
        text: text,
        likesCount: 0,
        likes: false
    });

    nameInput.value = '';
    textInput.value = '';

    renderComments();
});

renderComments();